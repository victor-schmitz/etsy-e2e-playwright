# CT004 — Registration: weak password policy

**User type:** Guest user  
**Test case description:** Ensure the registration form rejects weak passwords according to the site’s password policy and blocks submission.  
**Pre-conditions:**  
- User is logged out.  
- Access to `https://www.etsy.com`.  
- Registration UI may be modal or page.  
**Requirement link:** Assessment — Test Engineering / Registration validations

**Test type:** ☐ Manual ☐ Automatable ☑ Automated  
**Platform:** ☐ Mobile ☑ Web (Desktop Chrome, Desktop Firefox)

> Validate presence/visibility of a password-policy error (avoid relying on exact copy).  
> If the UI displays explicit rules (e.g., “8+ characters”), adapt the test data to violate that specific rule.

---

## Assumed rules (adjust to UI if displayed)
- Minimum length: **≥ 8** characters.  
- Must include **letters** and **numbers**.  
- Encourage **mixed case** (lower/upper) and/or a special char.  
- Reject extremely **common** or **sequential/repetitive** passwords.  
- Trim **leading/trailing spaces**; whitespace-only is invalid.

---

## CT004-A — Too short
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Open registration form. | Form visible. | |
| 2. Email: valid format; Name: if required. | — | |
| 3. Password: `Abc123` (6 chars). | Password-length error shown; submission blocked. | If policy shows a different minimum, use `min-1`. |

## CT004-B — Letters only (no digits)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `Onlyletters` | Error indicating missing numeric requirement; submission blocked. | If digits not required, site may accept—then mark as **N/A**. |

## CT004-C — Digits only (no letters)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `12345678` | Error indicating missing letter requirement; submission blocked. | Also catches “sequential” if enforced. |

## CT004-D — All lowercase (no upper)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `lowercase123` | Error for missing complexity (if required); submission blocked. | Skip if site doesn’t require case mix. |

## CT004-E — Common/compromised password
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `Password123` | Error indicating weak/common password; submission blocked. | Execute only if UI enforces common-password checks. |

## CT004-F — Same as / contains email local-part
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Email: `john.doe@example.com`; Password: `john.doe123` | Error about similarity to email (if enforced); submission blocked. | Optional; depends on policy. |

## CT004-G — Leading/trailing spaces or whitespace-only
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `"   "` | Treated as empty → required/invalid; submission blocked. | Overlaps CT002 but validates trim. |
| 2. Password: `"  StrongPass123  "` | Trimming occurs; should be evaluated without spaces. | Should pass if strong after trim. |

## CT004-H — Repetitive/sequential characters
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `aaaaaaaa` or `abcd1234` | Weak/sequential error (if enforced); submission blocked. | Optional per policy. |

## CT004-I — Positive control (valid strong password)
| Steps | Expected result | Observations |
|------|------------------|--------------|
| 1. Password: `Str0ngPass!234` | No password error; form may proceed. | Do **not** require full account creation here—just absence of policy errors. |

**Post-conditions:**  
- No account is created in weak cases; user remains logged out.  
- Positive control does not need to finalize registration (can stop before submit).

**Notes / Risks:**  
- Some rules may be **frontend-only** vs **server-side**; assert at the earliest point the UI exposes (on blur / on submit).  
- Localization can change message text; assert presence/association, not exact string.

**Traceability to automation:**  
- Spec file: `tests/auth/register-password-policy.spec.ts`  
- Tags: `@auth @register @validation @ct004a @ct004b @ct004c @ct004d @ct004e @ct004f @ct004g @ct004h @ct004i`  
- Page Objects used: `Header`, `AuthModal` / `RegisterPage`
