import { Page, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { AuthPage } from '../pages/auth.page';
import { logger } from '../utils/logger';
import { HeaderLocators } from '../locators/header.locators';
import { GoogleLocators } from '../locators/google.locators';
import { AuthLocators } from '../locators/auth.locators';

export const AuthFlow = {
  async registerNewAccount(page: Page, data: { email: string; name: string; password: string }) {
    const home = new HomePage(page);
    const auth = new AuthPage(page);

    logger.info('Opening sign-in entrypoint');
    await home.openSignIn();

    await auth.waitForAuthUI();
    await auth.switchToRegister();
    await auth.register(data.email, data.name, data.password);
  },

  async loginWithGoogle(page: Page, creds: { email: string; password: string }) {
    const home = new HomePage(page);
    const auth = new AuthPage(page); // kept for future reuse

    logger.info('Opening sign-in entrypoint');
    await home.openSignIn();

    logger.info('Waiting for Google button');
    const googleBtn = page.locator(AuthLocators.googleBtn).first();
    await expect(googleBtn).toBeVisible({ timeout: 15000 });

    logger.info('Clicking Google button and waiting for popup');
    const [popup] = await Promise.all([
      page.context().waitForEvent('page'),
      googleBtn.click(),
    ]);

    await this.handleGoogleLogin(popup, creds);

    // Wait for the main page to update with the logged-in state
    logger.info('Waiting for authenticated header (user menu trigger)');
    await expect(page.locator(HeaderLocators.userMenuTrigger).first()).toBeVisible({ timeout: 30000 });

    logger.info('Google login completed successfully');
  },

  async handleGoogleLogin(popup: Page, creds: { email: string; password: string }) {
    // Handling account chooser and email input visibility
    logger.info('Ensuring email input is reachable (account chooser handling)');
    const emailInput = popup.locator(GoogleLocators.email).first();
    const emailVisible = await emailInput.isVisible().catch(() => false);

    if (!emailVisible) {
      logger.info('Email input not visible — trying "Use another account" card');
      const another = popup.locator(GoogleLocators.useAnotherAccount).first();
      await another.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await another.click().catch(() => {});
    }

    // Fill email
    logger.info('Filling Google email');
    await expect(emailInput).toBeVisible({ timeout: 15000 });
    await emailInput.fill(creds.email);

    // Click next email button
    logger.info('Clicking Next (email)');
    await popup.locator(GoogleLocators.nextEmail).first().click();

    // Wait for password field
    logger.info('Waiting for password field');
    const passwordInput = popup.locator(GoogleLocators.password).first();
    await expect(passwordInput).toBeVisible({ timeout: 20000 });

    // Fill password
    logger.info('Filling Google password');
    await passwordInput.fill(creds.password);

    // Click next password button
    logger.info('Clicking Next (password)');
    await popup.locator(GoogleLocators.nextPassword).first().click();

    // Handle consent screen (if present)
    logger.info('Handling consent screen if present');
    const consentBtn = popup.locator(GoogleLocators.consentContinue).first();
    if (await consentBtn.isVisible().catch(() => false)) {
      logger.info('Clicking consent Continue');
      await consentBtn.click();
    }

    // Wait for the popup to close
    logger.info('Waiting for Google popup to close');
    await popup.waitForEvent('close', { timeout: 30000 }).catch(() => {
      logger.warn('Popup did not close within 30s — continuing anyway');
    });
  }
};
