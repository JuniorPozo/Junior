import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe.parallel('Checking Accounts flows', () => {
  let homePage: HomePage;

  //Before Each Test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.home();
  });

  test('Select Open Account for Simply Right Checking', async ({ page }) => {
    await homePage.clickCheckingAccounts();
    await homePage.clickSimplyRightCheckingOpenAccount();
  });

  //This test will fail
  test('Search Student Value Checking Box', async ({ page }) => {
    await homePage.clickCheckingAccountsAndSearchSelectChecking();
  });

});
