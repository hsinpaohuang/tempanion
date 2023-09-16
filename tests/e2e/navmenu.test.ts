import { test, expect, type Page } from '@playwright/test';

async function hoverMenu(page: Page) {
  const navMenu = page.locator('.nav-menu');
  await navMenu.hover();

  return navMenu;
}

test('Redirect to Matchup Page by default', async ({ page, baseURL }) => {
  await page.goto('/');
  await page.waitForURL('/matchup');

  expect(page.url()).toEqual(`${baseURL}/matchup`);
});

test('Navigates to Matchup Page', async ({ page, baseURL }) => {
  await page.goto('/battlefield');

  const navMenu = await hoverMenu(page);
  await navMenu.getByText('Matchup').click();
  await page.waitForURL('/matchup');

  expect(page.url()).toEqual(`${baseURL}/matchup`);
});

test('Navigates to Battlefield Page', async ({ page, baseURL }) => {
  await page.goto('/matchup');

  const navMenu = await hoverMenu(page);
  await navMenu.getByText('Battlefield').click();
  await page.waitForURL('/battlefield');

  expect(page.url()).toEqual(`${baseURL}/battlefield`);
});
