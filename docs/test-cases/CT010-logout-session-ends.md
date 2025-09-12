# CT010 — Logout ends the session

**User type:** Registered user (logged in)  
**Test case description:** Sign out from the account and verify the session is terminated across reload/navigation.  
**Pre-conditions:**  
- User starts **authenticated** (via prior login or `storageState`).  
**Requirement link:** Assessment — Test Engineering / Logout

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Navigate to `https://www.etsy.com`. | Home loads in **logged-in** state (avatar/**You** menu visible). | |
| 2. Open the account menu (avatar/**You**). | Dropdown with account actions is visible. | |
| 3. Click **Sign out / Log out**. | User is signed out; redirected to a logged-out view or home. | Copy may vary by locale. |
| 4. Verify header shows **Sign in** (no avatar/user menu). | Logged-out UI visible; no account-only links accessible. | |
| 5. Refresh the page. | Still logged out. | Session cookies cleared/invalidated. |
| 6. (Optional) Try to open an account page (e.g., orders/profile). | Access is blocked or redirected to sign-in. | Do not assert exact copy. |

**Post-conditions:**  
- Session is terminated; user remains logged out across reloads.

**Notes / Risks:**  
- If the site uses async sign-out, wait for navigation/network idle after click.  
- Some cookies may persist for prefs; assertion focuses on **auth state**, not all cookies.

**Traceability to automation:**  
- Spec file: `tests/auth/logout.spec.ts`  
- Tags: `@auth @logout @smoke @ct010`  
- Page Objects used: `Header` (account menu)
