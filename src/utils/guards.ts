import type { Page } from '@playwright/test';
import { AntiBotLocators } from '../locators/anti-bot.locators';
import { logger } from './logger';

export async function isAntiBotPresent(page: Page, timeout = 1500): Promise<boolean> {
  const gate = page.locator(`xpath=${AntiBotLocators.any}`).first();
  try {
    await gate.waitFor({ state: 'visible', timeout });
    logger.warn('Anti-bot challenge detected');
    return true;
  } catch {
    return false;
  }
}
