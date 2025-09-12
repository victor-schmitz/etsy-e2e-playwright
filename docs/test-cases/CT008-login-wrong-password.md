# CT008 — Login failure: wrong password

**User type:** Registered user  
**Test case description:** Attempt to log in with a valid email and an incorrect password; verify proper error handling and that the user remains logged out.  
**Pre-conditions:**  
- User is logged out.  
- A valid existing account email is available (e.g., `LOGIN_EMAIL` in env/fixtures).  
**Requirement link:** Assessment — Test Engineering / Login (negative)

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Go to `https://www.etsy.com`. | Home loads successfully. | Dismiss cookie/region banners if present. |
| 2. Open **Sign in**. | Sign-in form/modal is visible. | |
| 3. Enter **Email** with a known valid account. | Field accepts value; no format error. | |
| 4. Enter **Password** with an incorrect value. | Field accepts value. | |
| 5. Submit (**Sign in**). | Authentication fails; an inline or form-level error is displayed (e.g., “incorrect password”). User remains logged out. | Do not assert exact copy; assert visibility/association. |
| 6. Verify header still shows **Sign in** (no user menu/avatar). | Not authenticated. | Optional: assert no session cookies indicating login. |
| 7. Refresh the page. | Still logged out; error message may reset, but state remains unauthenticated. | |

**Post-conditions:**  
- No session created; user remains logged out.

**Notes / Risks:**  
- Server may throttle after multiple failed attempts; keep this to a single attempt per run.  
- CAPTCHA may appear after repeated failures; if so, mark as partially manual or isolate with fresh accounts.

**Traceability to automation:**  
- Spec file: `tests/auth/login-fail.spec.ts`  
- Tags: `@auth @login @negative @ct008`  
- Page Objects used: `Header`, `AuthModal` (or `LoginPage`)
