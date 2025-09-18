export class AntiBotLocators {
  // recaptcha/iframe/overlays
  static any =
    `//iframe[contains(@src,'captcha') or contains(@src,'recaptcha')] | ` +
    `//*[@data-captcha] | ` +
    `//*[contains(@id,'captcha')]`;
}
