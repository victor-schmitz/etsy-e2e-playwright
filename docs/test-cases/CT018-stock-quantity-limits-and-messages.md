# CT018 — Stock/quantity limits and availability messages (optional)

**User type:** Guest or logged-in user  
**Test case description:** Ensure the UI prevents selecting quantities beyond available stock and displays appropriate availability/out-of-stock messages.  
**Pre-conditions:**  
- Access to `https://www.etsy.com`.  
- Listings may expose limits via PDP or during cart edit.  
**Requirement link:** Assessment — Test Engineering / Cart & PDP validations

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Dynamic inventory varies per listing. Prefer generic assertions on **disabled options**, **inline availability text**, and **blocked submission** rather than specific numbers.

---

## CT018-A — PDP: max quantity capped
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open a PDP with a **Quantity** control. | Quantity selector visible. | Use CT013 to reach PDP. |
| 2. Open the quantity dropdown (or incrementer). | Values shown up to a **maximum**. | |
| 3. Attempt to select a value **beyond max** (if UI allows typing/increment). | Control caps at max **or** shows an inline message; **Add to cart** remains valid only up to max. | If typing is allowed, validation should snap or show error. |

## CT018-B — PDP: out-of-stock variation is disabled
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. For a product with variations, open the **Options/Variation** selector(s). | Variation list visible. | |
| 2. Identify an **out-of-stock** option (label like “Sold out”). | Option appears **disabled** or marked unavailable. | |
| 3. Attempt to select it. | Selection is blocked; **Add to cart** does not enable due to OOS. | Assert disabled state/aria attributes. |

## CT018-C — Cart edit: exceeding stock shows message
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. With item in cart (CT014), open **Edit/Quantity**. | Controls visible. | |
| 2. Increase quantity **above available** (if allowed). | Inline **availability** message shown (e.g., “Only X left”); quantity auto-capped; subtotal does not exceed max. | Do not assert exact copy; check presence of message region. |

## CT018-D — OOS item cannot be added
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. On PDP, choose a combination that is **Out of stock**. | **Add to cart** is **disabled**; message indicates unavailability. | If personalization is required, pick another listing. |

**Post-conditions:**  
- Cart reflects quantities within allowed limits; no OOS variants added.

**Notes / Risks:**  
- Inventory is volatile; if a listing doesn’t expose these states, select another listing for automation.  
- Localization may change copy; assert **disabled state**, **presence of availability region**, and **blocked submission**.

**Traceability to automation:**  
- Spec file: `tests/cart/stock-limits.spec.ts`  
- Tags: `@cart @pdp @limits @ct018`  
- Page Objects used: `ProductPage`, `CartPage`
