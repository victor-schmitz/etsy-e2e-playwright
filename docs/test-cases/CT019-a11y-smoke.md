# CT019 — Accessibility smoke (key pages)

**User type:** Guest (works when logged in as well)  
**Test case description:** Run automated a11y checks on key pages using axe-core; fail on **serious** or **critical** violations.  
**Pre-conditions:**  
- Access to `https://www.etsy.com`.  
- Ability to dismiss cookie/region banners.  
**Requirement link:** Assessment — Test Engineering / Quality

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Scope: automated checks only (axe). Manual checks (keyboard, screen reader) out of scope for this smoke.

---

## Target pages/views
- **Home** (`/`)
- **Sign in** (auth modal/page)
- **PDP** (from a generic search like `mug`)
- **Cart** (`/cart`)

---

## Criteria (pass/fail)
- **Fail** if axe reports any **serious** or **critical** violations.
- **Warn/Log** for **moderate**/**minor**; do not fail build.

---

## CT019-A — Home
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open Home; dismiss banners. | Page stable (no blocking overlays). | |
| 2. Run axe scan on `document`. | 0 serious/critical violations. | Record violations list if any. |

## CT019-B — Sign in
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open **Sign in** UI. | Modal/page visible. | Scope scan to auth container if modal. |
| 2. Run axe scan on auth container (or document). | 0 serious/critical violations. | |

## CT019-C — PDP
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Search `mug` → open first non-ad result. | PDP visible (title, price, add-to-cart). | |
| 2. Run axe scan on `document`. | 0 serious/critical violations. | |

## CT019-D — Cart
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Navigate to `/cart` (add an item first if needed). | Cart visible. | |
| 2. Run axe scan on `document`. | 0 serious/critical violations. | |

**Post-conditions:**  
- Violations (if any) are reported with node targets and rule IDs.

**Notes / Risks:**  
- Third-party widgets/ads may produce noise; if needed, **exclude** known noisy regions via `exclude` selectors.  
- Dynamic content can cause transient violations; wait for network idle before scanning.

**Traceability to automation:**  
- Spec file: `tests/a11y/a11y-smoke.spec.ts`  
- Tags: `@a11y @smoke @ct019`  
- Tools: `axe-core` (e.g., `@axe-core/playwright`)
