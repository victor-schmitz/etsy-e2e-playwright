import type { Page } from '@playwright/test';
import { logger } from '../utils/logger';
import { HeaderLocators } from '../locators/header.locators';
import { AuthLocators } from '../locators/auth.locators';

export async function ensureLoggedOut(page: Page) {
  logger.info('[pre-setup] Checking logged-in state');

  const userMenuTrigger = page.locator(HeaderLocators.userMenuTrigger).first();
  const isLoggedIn = await userMenuTrigger.isVisible({ timeout: 1200 }).catch(() => false);

  if (!isLoggedIn) {
    logger.info('[pre-setup] Already logged out');
    return;
  }

  logger.info('[pre-setup] Logged-in header detected — opening user menu');

  try {
    await userMenuTrigger.click();
  } catch (error) {
    logger.error('[pre-setup] Failed to click user menu', { error: error.message });
    throw error;
  }

  const logoutItem = page.locator(AuthLocators.logout).first();
  logger.info('[pre-setup] Waiting for logout item to be visible');

  try {
    await logoutItem.waitFor({ state: 'visible', timeout: 8000 });
  } catch (error) {
    logger.error('[pre-setup] Logout item not visible within timeout', { error: error.message });
    throw error;
  }

  logger.info('[pre-setup] Clicking logout');
  try {
    await logoutItem.click();
  } catch (error) {
    logger.error('[pre-setup] Failed to click logout', { error: error.message });
    throw error;
  }

  logger.info('[pre-setup] Waiting for Sign-in trigger to reappear');
  try {
    await page.locator(HeaderLocators.signIn).first().waitFor({ state: 'visible', timeout: 30_000 });
  } catch (error) {
    logger.error('[pre-setup] Sign-in trigger did not appear after logout', { error: error.message });
    throw error;
  }

  logger.info('[pre-setup] Logout completed');
}
