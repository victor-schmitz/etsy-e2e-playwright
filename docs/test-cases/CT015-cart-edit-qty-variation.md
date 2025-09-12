# CT015 — Cart: edit item (quantity/variation) and recalculate subtotal

**User type:** Guest or logged-in user  
**Test case description:** Update an existing cart line item by changing quantity and (if available) product variation; verify the cart reflects the expected state and subtotal is recalculated.  
**Pre-conditions:**  
- At least **1 item** is already in the cart (from CT014).  
- Cart page is reachable at `https://www.etsy.com/cart`.  
**Requirement link:** Assessment — Test Engineering / Cart

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Price/availability are dynamic. Prefer structural assertions (qty/variant shown, subtotal updates) and arithmetic using the **displayed unit price**. Do not assert exact currency text; parse numeric value.

---

## CT015-A — Change quantity and verify subtotal
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open the **Cart** page with exactly **1 line item**. | Cart shows 1 item with unit price and quantity controls. | If more items, target the first non-ad/standard line item. |
| 2. Read the **unit price** and current **qty** (e.g., 1). | Values captured for calculation. | Strip currency symbol; parse number. |
| 3. Change **Quantity** to **2** (via dropdown or stepper). | Quantity control shows **2**; a loading/progress indicator may appear briefly. | Wait for UI/network to settle. |
| 4. Verify **subtotal** for that line item. | Subtotal reflects `unitPrice × 2` (subject to site rounding rules). | If discounts applied, assert subtotal ≥ 0 and ≈ 2× within rounding; otherwise exact equals. |
| 5. (Optional) Change **Quantity** back to **1**. | Subtotal returns to `unitPrice × 1`. | Cleans up for next scenario. |

## CT015-B — Change variation (if available) and verify price/subtotal update
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. On the same line item, open the **Edit / Options / Variation** control. | Variation selector appears (e.g., size/color). | If no variations, mark **N/A** and skip this scenario. |
| 2. Select a **different valid** variation. | Line item updates; selected variant label changes. | Some variants may change the **unit price**. |
| 3. Read the **new unit price** and current **qty**. | Values captured. | |
| 4. Verify **subtotal** equals `newUnitPrice × qty`. | Subtotal updated accordingly; no stale price displayed. | Handle rounding if needed. |

## CT015-C — Quantity boundary (max stock) (optional)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Attempt to increase quantity beyond available stock (e.g., select a higher value if offered). | Either the control caps at max, or an inline message indicates limited quantity; subtotal does **not** exceed max. | Only if the UI exposes max; otherwise mark **N/A**. |

**Post-conditions:**  
- Cart reflects the last chosen quantity/variation and corresponding subtotal.  
- No duplicate items created during edits.

**Notes / Risks:**  
- Some carts show **shipping/taxes** separately; assertions focus on **line item subtotal**, not order total.  
- If a free-shipping threshold banner appears, do not rely on it for assertions.  
- If the site opens an **edit drawer/modal**, target controls within that container (scoped selectors).

**Traceability to automation:**  
- Spec file: `tests/cart/cart-edit.spec.ts`  
- Tags: `@cart @edit @subtotal @ct015`  
- Page Objects used: `CartPage` (line item, qty control, variant control)
