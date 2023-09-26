import { test, expect } from '@playwright/test'
import { Browser, BrowserContext } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Checking Accounts flows', () => {
  let homePage: HomePage

  //Before Each Test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.home()
  })

  test('Select Open Account for Simply Right Checking', async ({ page, browser }) => {
    await homePage.clickCheckingAccounts()
    await homePage.clickSimplyRightCheckingOpenAccount()
  })
})
