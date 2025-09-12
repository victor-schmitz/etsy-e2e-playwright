# CT020 — Cart visual regression (per browser baseline)

**User type:** Guest or logged-in  
**Test case description:** Capture and compare visual snapshots of the Cart to detect unintended UI changes.  
**Pre-conditions:**  
- Access to `https://www.etsy.com`.  
- Playwright configured with stable settings (recommend): `locale: en-US`, `timezoneId: UTC`, `colorScheme: light`, `reducedMotion: 'reduce'`.  
- Dynamic elements (ads/upsells/badges) should be masked or hidden for stability.  
**Requirement link:** Assessment — Test Engineering / Quality (visual)

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Use `expect(page).toHaveScreenshot()` with **masks** for dynamic regions. Keep thresholds tight (e.g., `maxDiffPixels: 0` or `0.1%`) unless fonts/antialiasing require a small margin.

---

## CT020-A — Empty cart baseline
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Ensure cart is empty (remove items if any). | Empty-state UI visible. | Dismiss cookie/geo banners. |
| 2. Normalize viewport (e.g., 1280×800). | Layout consistent. | |
| 3. Capture snapshot of the **cart content region**. | Baseline image saved for each project (browser). | Use a scoped locator (cart container) to reduce noise. |

## CT020-B — One-item cart baseline
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Add a generic item (see CT014). | Cart shows **1 line item**. | Prefer an item without personalization. |
| 2. Mask dynamic regions (price, seller avatar, recommendation carousels). | Snapshot focuses on structure/controls. | Use Playwright `masks` option. |
| 3. Capture snapshot. | Baseline image saved per browser. | Name consistently (e.g., `cart-one-item.png`). |

## CT020-C — Regression check in CI
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Run tests with existing baselines. | Screens match baselines. | |
| 2. On mismatch, report shows diff image. | Review and decide: defect vs intended change. | Update baseline only after approval. |

**Acceptance criteria:**  
- No visual diffs beyond configured threshold.  
- Known-dynamic areas are masked; failure reflects real UI changes.

**Notes / Risks:**  
- Prices/stock badges and recommendation modules are volatile—**mask** them.  
- Font rendering can differ on CI; pin OS image or allow minimal threshold.  
- Run on deterministic viewport and device profile per browser.

**Traceability to automation:**  
- Spec file: `tests/visual/cart-visual.spec.ts`  
- Tags: `@visual @cart @ct020`  
- Page Objects used: `CartPage`