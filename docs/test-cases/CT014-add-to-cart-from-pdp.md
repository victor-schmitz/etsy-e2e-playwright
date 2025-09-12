# CT014 — Add a product to the cart (from PDP)

**User type:** Guest user (works when logged in as well)  
**Test case description:** From a Product Detail Page (PDP), add an item to the cart and verify cart state.  
**Pre-conditions:**  
- User is on `https://www.etsy.com`.  
- A PDP is reachable via search (e.g., query `mug`).  
**Requirement link:** Assessment — Test Engineering / Cart

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Avoid hard-coding product titles. Prefer structural assertions (presence of Add to cart, price, variant selectors).

---

## CT014-A — Add default SKU (no required options)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Search for a generic term (e.g., `mug`) and open the **first non-ad** result. | PDP loads with title, price, and **Add to cart** enabled. | Skip sponsored/“Ad” results if possible. |
| 2. Click **Add to cart**. | Cart updates: either navigates to Cart page **or** shows confirmation/drawer. | Accept both flows. |
| 3. Open the **Cart** (if not auto-opened). | Cart shows **1 line item** with correct title/price snapshot. | Do not assert exact text; assert presence. |
| 4. Verify cart count/badge in header. | Count ≥ 1 (typically **1**). | Badge/aria-label may vary. |

## CT014-B — Add item with **required options**
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. From SRP, pick a listing that shows required options on PDP (e.g., size/color). | PDP shows one or more required selectors (dropdowns/buttons). | |
| 2. Select the **first available** option for each required selector. | **Add to cart** becomes enabled. | If an option is out of stock, pick the next available. |
| 3. Click **Add to cart**. | Item added; cart shows the chosen variants. | Variant labels visible on the line item. |

## CT014-C — Add with quantity > 1 (if PDP exposes quantity)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. On PDP, set **Quantity = 2**. | Quantity control reflects `2`. | If control absent, mark scenario **N/A**. |
| 2. Click **Add to cart** and open Cart. | Cart shows the item with **Qty = 2**. | Subtotal should reflect 2× unit price (rounded as site does). |

**Post-conditions:**  
- Cart contains the added item(s) with selected variants and quantities.

**Notes / Risks:**  
- Some listings are made-to-order and require personalization; if a free-text personalization is mandatory, prefer another listing for automation.  
- Prices/availability are dynamic; assert structure (line item exists, qty, variant labels), not exact amounts.

**Traceability to automation:**  
- Spec file: `tests/cart/add-from-pdp.spec.ts`  
- Tags: `@cart @pdp @ct014`  
- Page Objects used: `Header` (Cart link), `SearchResultsPage`, `ProductPage`, `CartPage`
