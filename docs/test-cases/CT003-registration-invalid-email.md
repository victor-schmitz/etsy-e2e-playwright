# CT003 — Registration: invalid email format

**User type:** Guest user  
**Test case description:** Ensure the registration form rejects invalid email formats with clear validation errors and blocks submission.  
**Pre-conditions:**  
- User is logged out.  
- Access to `https://www.etsy.com`.  
- Registration UI may be modal or page.  
**Requirement link:** Assessment — Test Engineering / Registration validations

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Assert presence/visibility of an email validation error (do not rely on exact copy). If real-time validation exists, assert on blur; otherwise, assert after submit.

---

## CT003-A — Missing `@`
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open registration form. | Form visible. | |
| 2. Type `userexample.com` in **Email**; fill valid **Password** and other required fields. | Email field shows invalid format error. | Error on blur or on submit. |
| 3. Click **Register / Create account**. | Submission blocked; error remains visible and associated to Email. | |

## CT003-B — Missing domain TLD
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `user@example` | Invalid email error shown. | |
| 2. Submit. | Submission blocked. | |

## CT003-C — Spaces in local or domain part
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `user name@example.com` or `user@ example.com` | Invalid email error shown. | Trim should not make it valid. |

## CT003-D — Consecutive dots / leading/trailing dots
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `user..name@example.com` or `.user@example.com` or `user.@example.com` | Invalid email error shown. | |

## CT003-E — Illegal characters
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `user()@example.com` or `user<>@example.com` | Invalid email error shown. | Characters not allowed by HTML5/email spec. |

## CT003-F — Empty after trim
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `"   "` (spaces only) | Treated as empty → required/invalid error shown. | Overlaps CT002; keep here to verify trim + format. |

**Post-conditions:**  
- No account is created; user remains logged out.

**Notes / Risks:**  
- Browser-level validation (HTML5) may display native messages; ensure automation targets the field’s invalid state (e.g., `:invalid`, aria errors) or app’s inline error element.  
- Localization may change message text; assert visibility/association, not exact string.

**Traceability to automation:**  
- Spec file: `tests/auth/register-email-format.spec.ts`  
- Tags: `@auth @register @validation @ct003a @ct003b @ct003c @ct003d @ct003e @ct003f`  
- Page Objects used: `Header`, `AuthModal` / `RegisterPage`
