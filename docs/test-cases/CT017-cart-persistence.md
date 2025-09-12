# CT017 — Cart persistence across reload/new session (optional)

**User type:** 
- Guest (not logged in)
- Logged-in user (session active)

**Test case description:** Verify that items added to the cart persist after page reload and (for logged-in users) across a new browser session.

**Pre-conditions:**  
- Access to `https://www.etsy.com`.  
- At least one add-to-cart flow available (see CT014).  
**Requirement link:** Assessment — Test Engineering / Cart

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Note: Guest carts typically persist **within the same browser profile** (cookies/localStorage). A brand-new browser context usually clears guest data by design. Logged-in carts should persist server-side.

---

## CT017-A — Guest: persistence after **reload** (same session)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. As **guest**, add 1 item to cart (CT014). | Cart shows 1 line item; header badge = 1. | |
| 2. **Reload** the page (on Cart or Home). | Cart still shows the same line item; badge = 1. | Same browser context. |

## CT017-B — Guest: persistence in **new tab** (same context)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. With 1 item in cart, open a **new tab** to `https://www.etsy.com/cart`. | Cart shows the same line item; badge = 1. | Same browser context shares storage. |

## CT017-C — Logged-in: persistence after **new browser context** (new session)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. **Log in** (CT006) and add 1 item to cart. | Cart shows 1 item. | |
| 2. **Close** the current context/session. | — | In Playwright, create a fresh context. |
| 3. Start a **new** browser context using the same user (e.g., `storageState`). | Session resumes authenticated. | |
| 4. Navigate to Cart. | Cart shows the previously added item. | Persistence is server-side for logged-in users. |

## CT017-D — Guest: brand-new browser context (expect **not** persisted) *(optional)*
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. As guest with 1 item in cart, **create a fresh browser context** (no cookies/localStorage). | Cart is **empty** in the new context. | Expected behavior for guest carts. |

**Post-conditions:**  
- For guest, cart persists within the same context (A/B) but not across fresh contexts (D).  
- For logged-in users, cart persists across new sessions (C).

**Notes / Risks:**  
- Promotions/upsells may alter cart UI; scope assertions to active line items and badge.  
- Currency/locale banners on fresh sessions can obscure content—dismiss before asserting.

**Traceability to automation:**  
- Spec file: `tests/cart/cart-persistence.spec.ts`  
- Tags: `@cart @persistence @ct017`  
- Page Objects used: `Header`, `CartPage`
