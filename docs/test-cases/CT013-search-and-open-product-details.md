# CT013 — Search for a product and open product details

**User type:** Guest user (works when logged in as well)  
**Test case description:** Use site search to find a product and open its Product Detail Page (PDP).  
**Pre-conditions:**  
- User is on `https://www.etsy.com` and not blocked by cookie/region banners (dismiss if shown).  
**Requirement link:** Assessment — Test Engineering / Search & Product

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Navigate to `https://www.etsy.com`. | Home loads successfully. | Header shows global search input. |
| 2. Focus the **Search** field and type a generic query, e.g., `mug`. | Query appears; typeahead may show suggestions. | Do not rely on suggestions. |
| 3. Submit the search (press Enter or click search icon). | Search Results page (SRP) loads with a grid/list of items; results count visible. | URL contains query params. |
| 4. Click the **first organic result** (exclude ads if possible). | PDP opens for the selected item. | Ad labels may exist; prefer results without “Ad”. |
| 5. Verify PDP elements. | Title visible; price/variations (if any) visible; **Add to cart** button present. | Avoid asserting exact copy; use roles/labels. |

**Post-conditions:**  
- User is on the PDP of the selected item; no items added to cart yet.

**Notes / Risks:**  
- Results are dynamic; avoid hard-coding item titles—assert on **PDP structure** (title/price/add-to-cart).  
- Some items are **made-to-order** with required options; PDP still must render core elements.

**Traceability to automation:**  
- Spec file: `tests/cart/search-open-pdp.spec.ts`  
- Tags: `@search @pdp @smoke @ct013`  
- Page Objects used: `Header` (search), `SearchResultsPage`, `ProductPage`
