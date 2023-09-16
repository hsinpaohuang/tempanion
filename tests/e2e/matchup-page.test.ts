import { test, expect, type Page } from '@playwright/test';

async function search(page: Page, text: string) {
  const input = page.getByPlaceholder('Search by name or type');
  await input.click();
  await input.fill(text);
  await page.waitForURL(`/matchup?search=${text}`);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/matchup');
  await page.waitForFunction('window.isMounted');
});

test('Lists temtems', async ({ page }) => {
  await page.waitForSelector('.tem-card', { state: 'attached' });

  await expect(page.locator('.tem-card')).toHaveCount(12);
});

test('search', async ({ page }) => {
  await search(page, 'Anatan');

  const temCard = page.locator('.tem-card');
  await expect(temCard).toHaveCount(1);
  expect(temCard).toContainText('Anatan');
  expect(page.url()).toContain('search=Anatan');
});

test('Shows Mudrid with correct info', async ({ page }) => {
  await search(page, 'Mudrid');

  const mudrid = page.locator('.tem-card', { hasText: 'Mudrid' });

  await expect(mudrid).toHaveScreenshot('mudrid.png');
});
