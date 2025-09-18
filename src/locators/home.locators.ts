export class HomeLocators {
  static header = 'header';
  static cookieBanner = '[data-cookie-banner], [id*="cookie"], [data-testid*="cookie"]';
  static regionBanner = '[data-region], [data-testid*="region"], [id*="gdpr"]';
  
  /** Sign In button in the header */
  static signInBtn = 'header a[href*="signin"], header button[data-signin]';
  
  /** Avatar menu button or image */
  static avatarMenu = 'button[aria-label*="You"], [data-user-menu], img[alt*="avatar"]';
}
