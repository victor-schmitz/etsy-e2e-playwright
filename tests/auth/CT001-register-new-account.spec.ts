// tests/auth/CT001-register-new-account.spec.ts
import { test, expect } from '../../src/_fixtures/persistent';
import { AuthFlow } from '../../src/flows/auth.flow';
import { uniqueAlias } from '../../src/utils/email';
import data from './test-data/CT001-register-new-account.json';
import { humanWarmup, goToViaGoogle } from '../../src/_fixtures/human';
import { logger } from '../../src/utils/logger';
import { isAntiBotPresent } from '../../src/utils/guards';
import { ensureLoggedOut } from '../../src/_fixtures/session';

test.describe('@auth @register @smoke', () => {
  test('CT001 — happy path — create new account with email/password', async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    testInfo.annotations.push({ type: 'case', description: 'CT001' });
    testInfo.annotations.push({ type: 'doc', description: 'docs/test-cases/CT001-register-new-account.md' });

    const email = uniqueAlias(data.baseEmail, data.tag);

    await test.step('Warmup & navigate via Google', async () => {
      await humanWarmup(page, { moves: 5 });
      const ua = await page.evaluate(() => navigator.userAgent);
      logger.debug('User agent', { ua });
      await testInfo.attach('user-agent.txt', { body: ua, contentType: 'text/plain' });

      await goToViaGoogle(page, 'https://www.etsy.com');
      await ensureLoggedOut(page);

      if (await isAntiBotPresent(page)) {
        test.skip(true, 'Blocked by anti-bot challenge');
      }
    });

    await test.step('Register new account', async () => {
      logger.info('Registering new account', { email, name: data.name });
      await AuthFlow.registerNewAccount(page, {
        email,
        name: data.name,
        password: data.password,
      });
    });
  }); 
}); 