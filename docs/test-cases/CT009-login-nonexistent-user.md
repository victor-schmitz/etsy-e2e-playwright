# CT009 — Login failure: nonexistent user (optional)

**User type:** Unregistered user  
**Test case description:** Attempt to log in with an email address that does not exist; verify proper error handling and that the user remains logged out.  
**Pre-conditions:**  
- User is logged out.  
- Use a guaranteed-nonexistent email (e.g., `qa+<uuid>@example.com` or a random alias on your domain).  
**Requirement link:** Assessment — Test Engineering / Login (negative)

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Go to `https://www.etsy.com`. | Home loads successfully. | Dismiss cookie/region banners if present. |
| 2. Open **Sign in**. | Sign-in form/modal is visible. | |
| 3. Enter **Email**: a random, unregistered address. | Field accepts value; no format error. | Ensure randomness to avoid collisions. |
| 4. Enter **Password**: any value (valid format). | Field accepts value. | |
| 5. Submit (**Sign in**). | Authentication fails; an error is displayed indicating no account found/invalid credentials. User remains logged out. | Assert error visibility/association, not exact text. |
| 6. Verify header still shows **Sign in** (no avatar/user menu). | Not authenticated. | |
| 7. Refresh the page. | Still logged out. | |

**Post-conditions:**  
- No session created.

**Notes / Risks:**  
- Multiple rapid failures may trigger throttling/CAPTCHA—keep runs minimal.

**Traceability to automation:**  
- Spec file: `tests/auth/login-nonexistent.spec.ts`  
- Tags: `@auth @login @negative @ct009`  
- Page Objects used: `Header`, `AuthModal` (or `LoginPage`)
