import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
