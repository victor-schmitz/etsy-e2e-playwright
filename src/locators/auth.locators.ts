export class AuthLocators {
  /** Register tab button */
  static registerTab =
    `//button[contains(@class, 'select-register')]`;

  /** Email field in the registration form */
  static email =
    `//form[@id='join-neu-form']//input[@type='email' and (@id='join_neu_email_field' or @name='email')]`;

  /** Name field in the registration form */
  static name =
    `//form[@id='join-neu-form']//input[@type='text' and (@id='join_neu_first_name_field' or @name='first_name')]`;

  /** Password field in the registration form */
  static password =
    `//form[@id='join-neu-form']//input[@type='password' and (@id='join_neu_password_field' or @name='password')]`;

  /** Submit button for registration form */
  static submitRegister =
    `//form[@id='join-neu-form']//button[@type='submit' and (` +
      `@name='submit_attempt' or @value='register' or @data-join-neu-button)]`;

  /** Submit button for login form */
  static submitLogin =
    `//form[@id='join-neu-form' and not(.//input[@name='first_name'])]//button[@type='submit']`;

  /** Continue button after email field (usually in the registration form) */
  static continueSubmit =
    `//form[@id='join-neu-form']//button[@type='submit' and @name='submit_attempt' and @data-join-neu-button]`;

  /** Login tab button (fallback for different UI structures) */
  static loginTab =
    `//div[contains(@class,'join-neu-overlay') or contains(@id,'join')]` +
    `//*/a[@href and contains(@href,'/signin')] | ` +
    `//div[contains(@class,'join-neu-overlay') or contains(@id,'join')]//button[@aria-controls='join-neu-form' or @data-login or @data-neu-modal]`;

  /** "Continue with Google" button in the auth modal */
  static googleBtn =
    `//form[@id='join-neu-form']//button[@data-google-button='true']`;

  /** Logout button in the user menu */
  static logout =
    `//a[@role='menuitem' and contains(@href, 'logout.php')]`;
}
