import { Page, expect } from '@playwright/test';
import { HomeLocators } from '../locators/home.locators';
import { HeaderLocators } from '../locators/header.locators';
import { AuthLocators } from '../locators/auth.locators';
import { logger } from '../utils/logger';

export class HomePage {
  constructor(private page: Page) {}

  // ---------- Helpers ----------

  private async isVisible(xpath: string, timeout = 10_000): Promise<boolean> {
    try {
      await this.page.locator(xpath).first().waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  private async clickIfVisible(xpath: string, timeout = 10_000): Promise<boolean> {
    const locator = this.page.locator(xpath).first();
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click();
      return true;
    } catch {
      return false;
    }
  }

  // ---------- Flow ----------

  async goto() {
    logger.info('Navigating to Home');
    await this.page.goto('/');
    await expect(this.page.locator(HomeLocators.header)).toBeVisible({ timeout: 15_000 });
  }

  async openSignIn() {
    logger.info('Opening Sign in');

    // Attempt to click "Sign in" button from header
    let clicked = await this.clickIfVisible(HeaderLocators.signIn, 10_000);

    // Fallback: Other "Sign in" triggers in header/home
    if (!clicked) {
      clicked = await this.clickIfVisible(HomeLocators.signInBtn, 6_000);
    }

    if (!clicked) {
      logger.warn('Sign-in trigger not found/clickable');
      return;
    }

    // Wait for authentication UI to appear (email field)
    await this.page.locator(AuthLocators.email).first()
      .waitFor({ state: 'visible', timeout: 15_000 })
      .catch(() => logger.warn('Authentication UI did not appear after clicking sign-in'));
  }

  async expectLoggedIn() {
    // Prefer user menu or avatar trigger to avoid text-based selectors
    const isLoggedIn =
      (await this.isVisible(HeaderLocators.userMenuTrigger, 8_000)) ||
      (await this.isVisible(HeaderLocators.userAvatarImg, 8_000)) ||
      (await this.isVisible(HeaderLocators.userMenu, 8_000));

    expect(isLoggedIn).toBeTruthy();
  }
}
