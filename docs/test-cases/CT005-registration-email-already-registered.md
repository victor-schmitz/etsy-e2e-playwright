# CT005 — Registration: email already registered

**User type:** Guest user  
**Test case description:** Verify that attempting to register with an email that already exists shows an appropriate error and blocks submission.  
**Pre-conditions:**  
- User is logged out.  
- An **existing account email** is available (e.g., seeded test user).  
  - Option A: use a fixture/env var (e.g., `EXISTING_EMAIL`).  
  - Option B: create an account first (CT001) and reuse the same email here.  
**Requirement link:** Assessment — Test Engineering / Registration validations

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

## CT005-A — Duplicate email on submit
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Navigate to `https://www.etsy.com`. | Home loads. | Dismiss cookie/region banners if present. |
| 2. Open **Sign in** → go to **Register / Create account**. | Registration form is visible. | Modal or full page. |
| 3. Fill **Email** with the existing account email. | Field accepts input without client-side “format” error. | |
| 4. Fill other required fields with valid data (Name/Password). | No client-side errors. | |
| 5. Submit (**Register / Create account**). | Registration is **blocked**; an error indicates the email is already in use. | Assert visibility and association to Email (inline or form-level alert). |

## CT005-B — Case/whitespace variants still blocked
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Use the same existing email but with case/whitespace variations (e.g., `"  User@Example.com  "`). | Still treated as duplicate; same error displayed. | Email comparison should be case-insensitive and trimmed. |

**Post-conditions:**  
- No new account is created; user remains logged out.

**Notes / Risks:**  
- Exact error text may vary; assert **presence/visibility** and that submission does not proceed.  
- If CAPTCHA or additional verification appears, assert at the earliest point the server returns the duplicate error.

**Data management:**  
- Prefer a stable **seeded test user** via fixture/env (e.g., `EXISTING_EMAIL`) to avoid flakiness.  
- If using CT001 to create the email, ensure the exact same email string is reused here (no alias change).

**Traceability to automation:**  
- Spec file: `tests/auth/register-duplicate-email.spec.ts`  
- Tags: `@auth @register @validation @ct005`  
- Page Objects used: `Header`, `AuthModal` / `RegisterPage`
