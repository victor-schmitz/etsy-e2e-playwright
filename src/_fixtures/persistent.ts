import path from 'path';
import { test as base, chromium, firefox, expect, BrowserContext, Page } from '@playwright/test';

export const test = base.extend<{
  context: BrowserContext;
  page: Page;
}>({
  context: async ({ browserName }, use) => {
    const userDataDir = path.resolve(__dirname, `../../.user-profile-${browserName}`);

    const commonOptions = {
      headless: false,
      viewport: { width: 1366, height: 768 },
    };

    let context: BrowserContext;

    if (browserName === 'chromium') {
      context = await chromium.launchPersistentContext(userDataDir, {
        ...commonOptions,
        channel: 'chrome',
        ignoreDefaultArgs: ['--enable-automation'],
        args: ['--disable-blink-features=AutomationControlled'],
      });
    } else if (browserName === 'firefox') {
      context = await firefox.launchPersistentContext(userDataDir, {
        ...commonOptions,
      });
    } else {
      throw new Error(`Unsupported browser: ${browserName}`);
    }

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});

export { expect };
