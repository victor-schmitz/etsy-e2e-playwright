# CT011 — Login with Google (success)

**User type:** Registered user (Google OAuth)  
**Test case description:** Sign in using the “Continue with Google” option; verify logged-in state.  
**Pre-conditions:**  
- User is logged out.  
- A test Google account is available (env: `GOOGLE_EMAIL`, `GOOGLE_PASSWORD`).  
- Prefer **2FA disabled** for this account (or handled out-of-band).  
- Test may require **headed** mode and slower actions due to anti-bot.  
**Requirement link:** Assessment — Test Engineering / OAuth

**Test type:** ☐ Manual ☐ Automatable ☑ Automated (may be flaky due to OAuth defenses)  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Go to `https://www.etsy.com`. | Home loads. | Dismiss cookie/region banners if present. |
| 2. Open **Sign in**. | Sign-in UI visible. | Modal or full page. |
| 3. Click **Continue with Google**. | A new window/tab (OAuth popup) opens to accounts.google.com. | Wait for popup page. |
| 4. In the Google popup, enter **Email** and click **Next**. | Email accepted; password screen shown. | |
| 5. Enter **Password** and click **Next**. | Authentication succeeds; popup closes or redirects back to Etsy. | Handle consent screen if shown. |
| 6. Back on Etsy, wait for UI to reflect login. | Header shows user menu (e.g., **You** / avatar). No error banner. | |
| 7. Refresh the page. | Logged-in state persists. | Session cookie present. |

**Post-conditions:**  
- Session is active for the Google-linked account.

**Notes / Risks:**  
- Google may trigger **2FA/CAPTCHA/recovery checks**; if encountered, mark as partially manual or use pre-recorded `storageState`.  
- Localization may alter button labels; use role/name-based selectors.

**Traceability to automation:**  
- Spec file: `tests/auth/login-google.spec.ts`  
- Tags: `@auth @login @oauth @ct011`  
- Page Objects used: `Header`, `GoogleOAuthPopup` (OAuth handler)
