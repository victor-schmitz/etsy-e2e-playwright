import { Page, expect } from '@playwright/test';
import { AuthLocators } from '../locators/auth.locators';
import { logger } from '../utils/logger';
import { HeaderLocators } from '../locators/header.locators';

export class AuthPage {
  constructor(private page: Page) {}

  // ---------- Helpers ----------

  private async isVisible(locatorOrXPath: string, timeout = 10_000): Promise<boolean> {
    try {
      await this.page.locator(locatorOrXPath).first().waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  private async clickIfVisible(locatorOrXPath: string, timeout = 10_000): Promise<boolean> {
    const loc = this.page.locator(locatorOrXPath).first();
    try {
      await loc.waitFor({ state: 'visible', timeout });
      await loc.click();
      return true;
    } catch {
      return false;
    }
  }

  // ---------- Flow ----------

  async waitForAuthUI() {
    logger.info('Waiting for the email field to be visible');
    const emailVisible = await this.isVisible(AuthLocators.email, 15_000);
    expect(emailVisible).toBeTruthy(); // Fail the test if email field is not visible
  }

  async switchToRegister() {
    logger.info('Switching to Register tab');

    let switched = await this.clickIfVisible(AuthLocators.registerTab, 10_000);

    if (!switched) {
      logger.info('Register tab not visible — skipping switchToRegister');
      return;
    }

    logger.info('Waiting for registration form (Name field)');
    await this.page.locator(AuthLocators.name).first().waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {});
  }

  async register(email: string, name: string, password: string) {
    const emailInput = this.page.locator(AuthLocators.email).first();
    const nameInput = this.page.locator(AuthLocators.name).first();
    const passwordInput = this.page.locator(AuthLocators.password).first();
    const continueBtn = this.page.locator(AuthLocators.continueSubmit).first();
    const userMenuTrigger = this.page.locator(HeaderLocators.userMenuTrigger).first();

    logger.info('Filling registration form', { email, name });

    // Fill email
    logger.info('Waiting for email field to be visible');
    await expect(emailInput).toBeVisible({ timeout: 15_000 });

    logger.info('Filling email');
    await emailInput.fill(email);

    // Wait for Continue button to be visible and enabled
    logger.info('Waiting for Continue button to be visible and enabled');
    await expect(continueBtn).toBeVisible({ timeout: 10_000 });
    await expect(continueBtn).toBeEnabled();

    logger.info('Clicking Continue');
    await continueBtn.click();

    // Fill name
    logger.info('Waiting for name field to be visible');
    await expect(nameInput).toBeVisible({ timeout: 15_000 });

    logger.info('Filling name');
    await nameInput.fill(name);

    // Fill password
    logger.info('Waiting for password field to be visible');
    await expect(passwordInput).toBeVisible({ timeout: 15_000 });

    logger.info('Filling password');
    await passwordInput.fill(password);

    // Wait for Register button to be visible
    logger.info('Waiting for Register button to be visible');
    await expect(continueBtn).toBeVisible({ timeout: 10_000 });

    logger.info('Clicking Register');
    await continueBtn.click();

    // Verifying authenticated session
    logger.info('Verifying authenticated session');
    try {
      await expect(userMenuTrigger).toBeVisible({ timeout: 30_000 });
      logger.info('User is logged in');
    } catch (error) {
      logger.error('Failed to find user menu trigger after 30s', { error: error.message });
      throw error;
    }
  }
}
