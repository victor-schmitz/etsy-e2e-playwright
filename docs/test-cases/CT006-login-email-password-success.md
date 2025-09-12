# CT006 — Login with email/password (success)

**User type:** Registered user  
**Test case description:** Authenticate using valid email and password; verify logged-in state and session persistence.  
**Pre-conditions:**  
- User is logged out.  
- A valid account exists with email/password (e.g., `LOGIN_EMAIL`, `LOGIN_PASSWORD` in env/fixtures).  
**Requirement link:** Assessment — Test Engineering / Login

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Go to `https://www.etsy.com`. | Home loads successfully. | Dismiss cookie/region banners if shown. |
| 2. Open **Sign in**. | Sign in modal/page is visible. | Modal or full page. |
| 3. Enter **Email** (valid). | Field accepts value; no format error. | |
| 4. Enter **Password** (valid). | Field accepts value; no policy error. | |
| 5. Submit (**Sign in**). | User is authenticated; page updates to logged-in state. | Loading indicator may appear. |
| 6. Verify header shows user menu (e.g., **You** / avatar). | Logged-in UI visible; no error banner. | Avoid asserting exact copy; check visibility/role. |
| 7. Refresh the page. | Logged-in state persists after reload. | Session cookie present. |
| 8. (Optional) Navigate to account area (e.g., **You** menu). | Account page loads; access permitted. | Do not require PII assertions. |

**Post-conditions:**  
- Session remains active for the user.

**Notes / Risks:**  
- CAPTCHA/2FA may appear; if so, mark as partially manual or use seeded storageState for subsequent tests.  
- Localization can change strings; assert roles/visibility instead of exact text.

**Traceability to automation:**  
- Spec file: `tests/auth/login-success.spec.ts`  
- Tags: `@auth @login @smoke @ct006`  
- Page Objects used: `Header`, `AuthModal` (or `LoginPage`)
