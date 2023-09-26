import { Browser, BrowserContext, expect, Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly bookAnAppointmentButton: Locator
  readonly everydayBankingBox: Locator
  readonly everydayBankingSelectButton: Locator
  readonly borrowingBox: Locator
  readonly investmentsBox: Locator
  readonly businessSupportBox: Locator
  readonly searchLocationTextBox: Locator
  readonly branchBoxesCount: Locator
  readonly noResultsAlert: Locator
  readonly checkingAccountsButton: Locator
  readonly selectCheckingMoreDetailsButton: Locator
  readonly simplyRightCheckingMoreDetailsButton: Locator
  readonly essentialCheckingMoreDetailsButton: Locator
  readonly simplyRightCheckingOpenAccountLink: Locator

  constructor(page: Page) {
    this.page = page
    this.bookAnAppointmentButton = page.locator('div[id="find02"]')
    this.everydayBankingBox = page.locator('#bb-image[aria-label="Everyday Banking"]')
    this.everydayBankingSelectButton = page.locator('button[aria-label*="Everyday Banking"]')
    this.borrowingBox = page.locator('#bb-image[aria-label="Borrowing"]')
    this.investmentsBox = page.locator('#bb-image[aria-label*="Investments"]')
    this.businessSupportBox = page.locator('#bb-image[aria-label="Business Support"]')
    this.searchLocationTextBox = page.locator('input[id="search-location-input"]')
    this.branchBoxesCount = page.locator('div[class*="card__content"]')
    this.noResultsAlert = page.locator('div[class*="alert-notifier"]')
    this.checkingAccountsButton = page.locator('a[id="better-btn-02"]')
    this.selectCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="select-checking"]')
    this.simplyRightCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="simply-right-checking"]')
    this.essentialCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="essential-checking"]')
    this.simplyRightCheckingOpenAccountLink = page.locator('a[class*="openlink"][href*="SimplyRightChecking"]')
  }

  async home() {
    await this.page.goto('https://www.santanderbank.com/')
  }
  async clickBookAnAppointment() {
    await this.bookAnAppointmentButton.click()
    await expect(this.everydayBankingBox).toBeTruthy()
    await expect(this.borrowingBox).toBeTruthy()
    await expect(this.investmentsBox).toBeTruthy()
    await expect(this.businessSupportBox).toBeTruthy()
  }

  async clickSelectButtonForEverydayBanking() {
    await this.everydayBankingSelectButton.click()
  }

  async searchForValidLocation(zipCode: string) {
    await this.searchLocationTextBox.type(zipCode)
    await this.page.keyboard.press('Enter')
    await expect(this.branchBoxesCount).toHaveCount(4)
    await expect(this.page.getByText('Hazlet')).toBeTruthy()
  }

  async searchForInvalidLocation(zipCode: string) {
    await this.searchLocationTextBox.type(zipCode)
    await this.page.keyboard.press('Enter')
    await expect(this.noResultsAlert).toBeTruthy()
  }

  async clickCheckingAccounts() {
    await this.checkingAccountsButton.click()
    await expect(this.selectCheckingMoreDetailsButton).toBeTruthy()
    await expect(this.simplyRightCheckingMoreDetailsButton).toBeTruthy()
    await expect(this.essentialCheckingMoreDetailsButton).toBeTruthy()
  }

  async clickSimplyRightCheckingOpenAccount() {
    const [newWindow] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.simplyRightCheckingOpenAccountLink.click(),
    ])
    await expect(newWindow.url()).toContain(
      'https://secureopen.santanderbank.com/apps/servlet/SmartForm.html?formCode=sbnadao&product=SimplyRightChecking'
    )
  }
}
