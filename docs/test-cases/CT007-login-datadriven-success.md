# CT007 — Data-driven login (3 users, success)

**User type:** Registered users (3 distinct)  
**Test case description:** Authenticate successfully using a data set of three users; verify logged-in state for each.  
**Pre-conditions:**  
- Users exist (either credential-based or pre-seeded `storageState` files).  
- Fixture file available (e.g., `fixtures/users.json`).  
**Requirement link:** Assessment — Test Engineering / Login (data-driven)

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

---

## Data set
Example `fixtures/users.json` (text only here to avoid nested code blocks):
[
  { "name": "user1", "email": "u1@example.com", "password": "****", "storageState": "user1.json" },
  { "name": "user2", "email": "u2@example.com", "password": "****", "storageState": "user2.json" },
  { "name": "user3", "email": "u3@example.com", "password": "****", "storageState": "user3.json" }
]

---

## Strategy A — Using `storageState` (preferred for stability/perf)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| A1. For each user in the fixture, launch with corresponding `storageState`. | Session starts authenticated. | No UI login needed. |
| A2. Navigate to `https://www.etsy.com/`. | Home loads in logged-in state. | |
| A3. Verify header shows user menu (e.g., **You** / avatar). | Logged-in UI visible; no error banner. | |

## Strategy B — Using credentials (slower, subject to CAPTCHA)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| B1. For each user in the fixture, open **Sign in**. | Sign in form visible. | Modal or page. |
| B2. Enter **Email** and **Password** from data set. | Inputs accepted; no inline errors. | |
| B3. Submit (**Sign in**). | User is authenticated. | Handle loading. |
| B4. Verify header shows user menu. | Logged-in UI visible; persists on reload. | |

**Post-conditions:**  
- All three users are authenticated (A) or have valid sessions created (B).

**Notes / Risks:**  
- Prefer **Strategy A** to avoid CAPTCHA/anti-bot throttling.  
- Run tests **in parallel** but avoid reusing the same account simultaneously.  
- Localized copy may vary; assert roles/visibility, not exact strings.

**Traceability to automation:**  
- Spec file: `tests/auth/login-datadriven.spec.ts`  
- Tags: `@auth @login @datadriven @ct007`  
- Page Objects used: `Header`, `AuthModal` (only for Strategy B)
