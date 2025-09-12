# CT002 — Registration: required fields validation

**User type:** Guest user  
**Test case description:** Validate that all required fields in the registration form enforce input and show clear error messages.  
**Pre-conditions:**  
- User is logged out.  
- Access to `https://www.etsy.com`.  
- Registration UI may be modal or page.  
**Requirement link:** Assessment — Test Engineering / Registration validations

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

## Required fields (assumed)
- **Email** — required  
- **Password** — required  
- **Name / First name** — may be required depending on UI; validate if present

---

## Scenario A — Submit empty form
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Go to `https://www.etsy.com`. | Home loads. | Dismiss cookie/region banners if shown. |
| 2. Open **Sign in** → switch to **Register / Create account**. | Registration form is visible. | |
| 3. Without filling any field, click **Register / Create account**. | Inline errors appear for each required field (e.g., “Email is required”, “Password is required”, and Name if applicable). Submit is blocked. | Exact wording may vary; assert presence + association to the field (aria-describedby). |

## Scenario B — Email missing
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open registration form. | Form visible. | |
| 2. Leave **Email** blank; fill **Password** with a valid strong value; fill **Name** if required. | Only the **Email** field shows a “required” error. | No error for other fields. |
| 3. Attempt to submit. | Submission is blocked; focus or error summary references **Email**. | |

## Scenario C — Password missing
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open registration form. | Form visible. | |
| 2. Fill **Email** with a valid format; leave **Password** blank; fill **Name** if required. | Only the **Password** field shows a “required” error. | |
| 3. Attempt to submit. | Submission is blocked; error is clearly visible and announced (a11y). | |

## Scenario D — Name/First name missing (if field is present & required)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open registration form. | Form visible. | |
| 2. Fill **Email** (valid) and **Password** (valid); leave **Name/First name** blank. | Only **Name/First name** shows a “required” error. | Skip if not required in current UI. |
| 3. Attempt to submit. | Submission is blocked. | |

## Edge cases
- **Whitespace-only** input (“ ”) in required fields → treated as empty; error shown.  
- **Real-time validation**: on field blur, the required error appears (if supported).

**Post-conditions:**  
- No account is created.  
- User remains logged out.

**Notes / Risks:**  
- UI copy may change; assert presence/visibility of “required” error rather than exact text.  
- If CAPTCHA appears, test the validation at client side before CAPTCHA step.

**Traceability to automation:**  
- Spec file: `tests/auth/register.spec.ts` (validation block)  
- Tags: `@auth @register @validation`  
- Page Objects used: `Header`, `AuthModal` / `RegisterPage`
