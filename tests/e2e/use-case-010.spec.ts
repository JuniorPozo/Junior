import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe.parallel('Search location flows', () => {
  let homePage: HomePage;

  //Before Each Test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.home();
  });

  test('Search Valid location', async ({ page }) => {
    await homePage.clickBookAnAppointment();
    await homePage.clickSelectButtonForEverydayBanking();
    await homePage.searchForValidLocation('07733');
  });

  //This test will fail
  test('Search the 4 boxes clicking Find A Branch', async ({ page }) => {
    await homePage.clickFindABranch();
    await homePage.clickSelectButtonForEverydayBanking();
    await homePage.searchForValidLocation('07733');
  });

  test('Search Invalid location', async ({ page }) => {
    await homePage.clickBookAnAppointment();
    await homePage.clickSelectButtonForEverydayBanking();
    await homePage.searchForInvalidLocation('0000');
  });

});
