export class HeaderLocators {
  /** Header container (scope) */
  static header = `//*[@role='banner'] | //header[@role='banner']`;

  /** "Sign in" button in the header (stable class) */
  static signIn =
    `(${HeaderLocators.header})//button[contains(@class, 'signin-header-action')]`;

  /** User menu trigger (prioritize data-attrs, no text) */
  static userMenuTrigger =
    `(${HeaderLocators.header})//button[@data-wt-menu-trigger and @data-selector='you-menu-tooltip']`;

  /** User avatar inside the trigger */
  static userAvatarImg =
    `(${HeaderLocators.header})//button[@data-wt-menu-trigger]//img[contains(@class, 'gnav-user-avatar')]`;

  /** Cart (shopping cart) in the header: by href partial or data-attribute counter */
  static cart =
    `(${HeaderLocators.header})//a[contains(@href, 'cart')] | ` +
    `(${HeaderLocators.header})//*[@data-cart-count]`;

  /**
   * Menus/containers related to the user (no dependency on "You")
   * Prefer data-attributes and known IDs.
   */
  static userMenu =
    `(${HeaderLocators.header})//*[@data-user-menu] | ` +
    `(${HeaderLocators.header})//*[@data-test-id='user-profile-icon'] | ` +
    `(${HeaderLocators.header})//div[@id='gnav-header-inner']//button[@data-wt-menu-trigger]`;
}
