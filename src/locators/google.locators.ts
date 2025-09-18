export class GoogleLocators {
  /** Card "Use another account" (account chooser). The class may vary — fallback to AI-generated XPath if it fails. */
  static useAnotherAccount =
    `//li[contains(@class, 'aZvCDf') and contains(@class, 'mIVEJc')]`;

  /** Email field */
  static email =
    `//input[@type='email' and @id='identifierId' and @name='identifier']`;

  /** Next button for email */
  static nextEmail =
    `//div[@id='identifierNext']//button[not(@disabled)] | //div[@id='identifierNext']//button[@role='button' and not(@disabled)]`;

  /** Password field */
  static password =
    `//input[@type='password' and @name='Passwd']`;

  /** Next button for password */
  static nextPassword =
    `//div[@id='passwordNext']//button[not(@disabled)] | //div[@id='passwordNext']//button[@role='button' and not(@disabled)]`;

  /** Consent/Continue button (consent screen) — without using text */
  static consentContinue =
    `//button[@jsname='LgbsSe' and descendant::span[@jsname='V67aGc']]`;
}
