# CT012 — Login with Google: user cancels/denies

**User type:** Guest user  
**Test case description:** When the user cancels Google OAuth or denies consent, Etsy should not authenticate the user and should show an appropriate error/return to sign-in.  
**Pre-conditions:**  
- User is logged out.  
- “Continue with Google” is available on the sign-in UI.  
**Requirement link:** Assessment — Test Engineering / OAuth (negative)

**Test type:** ☐ Manual ☐ Automatable ☑ Automated (may be flaky due to OAuth defenses)  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

---

## CT012-A — User closes the Google popup
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open Etsy → **Sign in** → click **Continue with Google**. | Google OAuth popup opens. | Wait for the new page event. |
| 2. Immediately close the popup window. | Control returns to Etsy; user remains **not** authenticated. | |
| 3. Verify header still shows **Sign in** (no avatar). | Logged-out state preserved; optional inline error/notice. | Do not assert exact text. |

## CT012-B — User cancels on Google screen
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. In the popup, click **Cancel** / back / close on the account chooser or consent screen. | OAuth flow aborts and returns to Etsy. | Label may vary by locale. |
| 2. Back on Etsy, verify state. | User remains logged out; sign-in UI still available; optional error banner shown. | |

## CT012-C — Consent denied (if screen appears)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. At Google consent, choose **Deny** (if option exists). | Etsy receives an error callback; authentication does **not** proceed. | Some flows hide explicit “deny”; treat as cancel. |
| 2. Verify Etsy state. | Still logged out; optional error/notice displayed. | |

**Post-conditions:**  
- No session is created; user remains logged out.

**Notes / Risks:**  
- Popup handling varies; selectors may differ by locale.  
- Anti-bot/2FA may appear—mark partially manual if blocks automation.

**Traceability to automation:**  
- Spec file: `tests/auth/login-google-negative.spec.ts`  
- Tags: `@auth @login @oauth @negative @ct012`  
- Page Objects used: `Header`, `GoogleOAuthPopup`
