import { test, expect, Page, Locator } from '@playwright/test';
import { logger } from '../utils/logger';
import { isAntiBotPresent } from '../../src/utils/guards';

const rnd = (min: number, max: number) => min + Math.random() * (max - min);
const rndi = (min: number, max: number) => Math.floor(rnd(min, max + 1));

export async function humanPause(msMin = 120, msMax = 260) {
  await new Promise(r => setTimeout(r, rndi(msMin, msMax)));
}

export async function humanWarmup(
  page: Page,
  opts: { moves?: number; pauseMin?: number; pauseMax?: number; scrolls?: number } = {}
) {
  const { moves = 5, pauseMin = 120, pauseMax = 260, scrolls = 2 } = opts;
  const vp = page.viewportSize();
  if (!vp) return;

  let x = rnd(40, vp.width - 40);
  let y = rnd(80, vp.height - 80);
  await page.mouse.move(x, y, { steps: 10 });
  
  for (let i = 0; i < moves; i++) {
    x = Math.max(2, Math.min(vp.width - 2, x + rnd(-70, 70)));
    y = Math.max(2, Math.min(vp.height - 2, y + rnd(-70, 70)));
    await page.mouse.move(x, y, { steps: 16 + rndi(6, 18) });
    await page.waitForTimeout(rndi(pauseMin, pauseMax));
  }

  for (let i = 0; i < scrolls; i++) {
    await page.mouse.wheel(0, rndi(40, 180));
    await humanPause();
  }
}

export async function humanMoveTo(page: Page, target: Locator, stepsMin = 18, stepsMax = 42) {
  const box = await target.boundingBox();
  if (!box) return;
  const x = box.x + box.width * (0.35 + Math.random() * 0.3);
  const y = box.y + box.height * (0.35 + Math.random() * 0.3);
  await page.mouse.move(x, y, { steps: rndi(stepsMin, stepsMax) });
}

export async function humanClick(page: Page, target: Locator) {
  await target.scrollIntoViewIfNeeded();
  await humanMoveTo(page, target);
  await humanPause(80, 220);
  await target.click({ trial: false });
}

export async function humanType(target: Locator, text: string, perCharMin = 30, perCharMax = 110) {
  for (const ch of text) {
    await target.type(ch, { delay: rndi(perCharMin, perCharMax) });
    if (Math.random() < 0.07) await humanPause(110, 240);
  }
}

/** Types with small errors (1-2) and corrects them with backspace */
export async function humanTypeWithCorrections(
  target: Locator,
  text: string,
  perCharMin = 30,
  perCharMax = 110
) {
  let madeError = 0;
  for (const ch of text) {
    if (madeError < 2 && Math.random() < 0.08) {
      const typo = String.fromCharCode(rndi(97, 122));
      await target.type(typo, { delay: rndi(perCharMin, perCharMax) });
      await humanPause(80, 180);
      await target.press('Backspace');
      madeError++;
    }
    await target.type(ch, { delay: rndi(perCharMin, perCharMax) });
    if (Math.random() < 0.07) await humanPause(110, 240);
  }
}

export async function settle(page: Page) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 3000 });
  } catch {}
  await humanPause(160, 420);
}

export async function goToViaGoogle(page: Page, targetUrl: string) {
  logger.info('Opening Google landing page');
  await page.goto('https://www.google.com/ncr', { waitUntil: 'domcontentloaded' });
  await humanWarmup(page, { moves: 3, scrolls: 1 });

  const consent = page.locator(
    `xpath=//form[contains(@action,'consent')]//button | //*[@id='L2AGLb'] | //*[@aria-modal='true']//button`
  );
  try {
    if (await consent.first().isVisible({ timeout: 1500 })) {
      logger.info('Accepting Google consent');
      await humanClick(page, consent.first());
      await settle(page);
    }
  } catch {}

  const queryTerm = new URL(targetUrl).hostname.replace(/^www\./, '').split('.')[0];

  const q = page.locator(`xpath=//textarea[@name='q'] | //input[@name='q']`).first();
  await q.waitFor({ state: 'visible', timeout: 10_000 });
  await humanClick(page, q);

  logger.info(`Typing query term: ${queryTerm}`);
  await humanTypeWithCorrections(q, queryTerm);

  const suggestions =
    page.locator(`xpath=//ul[@role='listbox']//*[(@role='option' or @role='presentation') and not(@aria-disabled='true')]`).first();

  if (await suggestions.isVisible({ timeout: 1200 }).catch(() => false)) {
    logger.info('Clicking a search suggestion');
    await humanClick(page, suggestions);
  } else {
    logger.info('No suggestions — clicking search button (btnK)');
    const btnK = page.locator(`xpath=//input[@name='btnK' and @type='submit']`).first();
    if (await btnK.isVisible({ timeout: 1500 }).catch(() => false)) {
      await humanClick(page, btnK);
    } else {
      await q.press('Enter');
    }
  }

  await page.waitForLoadState('domcontentloaded');
  await settle(page);

  if (await isAntiBotPresent(page)) {
    logger.warn('Blocked by anti-bot challenge — skipping test');
    test.skip(true, 'Blocked by anti-bot challenge');
  }

  const domain = new URL(targetUrl).hostname.replace(/^www\./, '');
  const result = page.locator(
    `xpath=(//a[starts-with(@href,'https://www.${domain}') or starts-with(@href,'http://${domain}') or contains(@href,'//${domain}')][not(ancestor::*[@data-text-ad])])[1]`
  );

  logger.info(`Clicking first organic result for ${domain}`);
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    humanClick(page, result)
  ]);

  await settle(page);
}
