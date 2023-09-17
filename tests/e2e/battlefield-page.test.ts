import { type Page, expect, test } from '@playwright/test';

async function search(page: Page, temtem: string) {
  const modal = page.locator('.search-temtem-modal');
  const input = modal.locator('input');
  await input.click();
  await input.fill(temtem);
  await page.locator('.option-content', { hasText: temtem }).click();

  return modal;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/battlefield');
  await page.waitForFunction('window.isMounted');
});

test.describe('Enemies', () => {
  test('Replace temtem', async ({ page }) => {
    const enemy1 = page.locator('.enemy1');
    await enemy1.locator('.change-temtem').click();
    const modal = await search(page, 'Nessla');
    await modal.getByText('CONFIRM').click();

    await expect(enemy1.locator('.profile')).toHaveScreenshot('nessla.png');
  });

  test('Replace temtem from recently selected', async ({ page }) => {
    const enemy1 = page.locator('.enemy1');
    const changeButton = enemy1.locator('.change-temtem');
    await changeButton.click();
    let modal = await search(page, 'Turoc');
    await modal.getByText('CONFIRM').click();
    await changeButton.click();
    modal = await search(page, 'Maoala');
    await modal.getByText('CONFIRM').click();
    await changeButton.click();
    await page.waitForSelector('.search-temtem-modal');
    modal = page.locator('.search-temtem-modal');
    await modal.locator('button', { hasText: 'Turoc' }).click();
    await modal.getByText('CONFIRM').click();

    await expect(enemy1.locator('.profile')).toHaveScreenshot('turoc.png');
  });

  test('Show correct type matchup', async ({ page }) => {
    const enemy1 = page.locator('.enemy1');
    await enemy1.locator('.change-temtem').click();
    const searchModal = await search(page, 'Mudrid');
    await searchModal.getByText('CONFIRM').click();
    await enemy1.locator('.temtem-type .q-icon').click();

    await expect(page.locator('.matchup-modal')).toHaveScreenshot(
      'mudrid.png',
      { maxDiffPixelRatio: 0.05 },
    );
  });
});

test.describe('Friendlies', () => {
  test('Replace temtem', async ({ page }) => {
    const friendly1 = page.locator('.friendly1');
    await friendly1.locator('.change-temtem').click();
    const modal = await search(page, 'Oree');
    await modal.getByText('CONFIRM').click();

    await expect(friendly1.locator('.profile')).toHaveScreenshot('oree.png');
  });

  test('Replace temtem from team', async ({ page }) => {
    const friendly1 = page.locator('.friendly1');
    const changeButton = friendly1.locator('.change-temtem');
    await changeButton.click();
    let modal = await search(page, 'Nidrasil');
    await modal.getByText('Add to Team').click();
    modal = await search(page, 'Maoala');
    await modal.getByText('CONFIRM').click();
    await changeButton.click();
    await page.waitForSelector('.search-temtem-modal');
    modal = page.locator('.search-temtem-modal');
    await modal.getByText('Nidrasil').click();
    await modal.getByText('CONFIRM').click();

    await expect(friendly1.locator('.profile')).toHaveScreenshot(
      'nidrasil.png',
    );
  });

  test('Remove temtem from team', async ({ page }) => {
    const friendly1 = page.locator('.friendly1');
    await friendly1.locator('.change-temtem').click();
    const modal = await search(page, 'Nidrasil');
    await modal.getByText('Add to Team').click();
    await modal.locator('.remove-temtem').click();

    await expect(
      modal.locator('.team-list', { hasText: 'Nidrasil' }),
    ).toHaveCount(0);
  });

  test('Show correct type matchup', async ({ page }) => {
    const friendly1 = page.locator('.friendly1');
    await friendly1.locator('.change-temtem').click();
    const searchModal = await search(page, 'Innki');
    await searchModal.getByText('CONFIRM').click();
    await friendly1.locator('.temtem-type .q-icon').click();

    await expect(page.locator('.matchup-modal')).toHaveScreenshot('innki.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
