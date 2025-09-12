# CT016 — Cart: remove item and verify empty state

**User type:** Guest or logged-in user  
**Test case description:** Remove an item from the cart and validate that the cart reflects the expected empty (or updated) state.  
**Pre-conditions:**  
- At least **1 item** is in the cart (from CT014).  
- Cart page: `https://www.etsy.com/cart`.  
**Requirement link:** Assessment — Test Engineering / Cart

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

---

## CT016-A — Remove single item → empty cart
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open **Cart** with exactly **1 line item**. | Cart shows 1 item with quantity, price, and **Remove** action. | If multiple, use filtering to ensure only 1 target. |
| 2. Click **Remove** (or **Delete**) for the line item. | Item disappears; success/toast may show briefly. | Wait for network/UI to settle. |
| 3. Verify **empty cart** UI. | Empty-state message/illustration visible; **cart count = 0** in header. | Assert structure/roles, not exact copy. |

## CT016-B — Remove one item from multi-item cart
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Ensure **2+ items** in cart. | Multiple line items visible. | Add extra item if needed. |
| 2. Remove the **first** line item. | Only that item is removed; remaining items persist. | |
| 3. Verify **cart count decremented** and totals updated. | Count reflects remaining items; subtotal recalculated. | Avoid asserting exact currency text; parse numbers if needed. |

**Post-conditions:**  
- CT016-A: cart is empty.  
- CT016-B: cart contains remaining items only; totals consistent.

**Notes / Risks:**  
- Some carts use an **undo** snackbar; ensure final state after snackbar timeout or click **Undo** only in negative scenarios.  
- Ads/sponsored or saved-for-later sections may appear—scope assertions to the **active line items** region.

**Traceability to automation:**  
- Spec file: `tests/cart/cart-remove.spec.ts`  
- Tags: `@cart @remove @ct016`  
- Page Objects used: `CartPage`
