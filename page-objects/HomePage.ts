import { Browser, BrowserContext, expect, Locator, Page } from '@playwright/test'

export class HomePage {
  
  readonly page: Page;
  readonly bookAnAppointmentButton: Locator;
  readonly findABranchButton: Locator;
  readonly everydayBankingBox: Locator;
  readonly everydayBankingSelectButton: Locator;
  readonly borrowingBox: Locator;
  readonly investmentsBox: Locator;
  readonly businessSupportBox: Locator;
  readonly searchLocationTextBox: Locator;
  readonly branchBoxesCount: Locator;
  readonly noResultsAlert: Locator;
  readonly checkingAccountsButton: Locator;
  readonly selectCheckingMoreDetailsButton: Locator;
  readonly simplyRightCheckingMoreDetailsButton: Locator;
  readonly essentialCheckingMoreDetailsButton: Locator;
  readonly simplyRightCheckingOpenAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookAnAppointmentButton = page.locator('div[id="find02"]');
    this.findABranchButton = page.locator('div[id="find01"]');
    this.everydayBankingBox = page.locator('#bb-image[aria-label="Everyday Banking"]');
    this.everydayBankingSelectButton = page.locator('button[aria-label*="Everyday Banking"]');
    this.borrowingBox = page.locator('#bb-image[aria-label="Borrowing"]');
    this.investmentsBox = page.locator('#bb-image[aria-label*="Investments"]');
    this.businessSupportBox = page.locator('#bb-image[aria-label="Business Support"]');
    this.searchLocationTextBox = page.locator('input[id="search-location-input"]');
    this.branchBoxesCount = page.locator('div[class*="card__content"]');
    this.noResultsAlert = page.locator('div[class*="alert-notifier"]');
    this.checkingAccountsButton = page.locator('a[id="better-btn-02"]');
    this.selectCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="select-checking"]');
    this.simplyRightCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="simply-right-checking"]');
    this.essentialCheckingMoreDetailsButton = page.locator('a[class*="btn-round"][href*="essential-checking"]');
    this.simplyRightCheckingOpenAccountLink = page.locator('a[class*="openlink"][href*="SimplyRightChecking"]');
  }

  /**
   * Go to Webpage
  */
  async home() {
    await this.page.goto('https://www.santanderbank.com/');
  }

  /**
   * Locate the button “Book an Appoinment” in the “Find Us” section at the bottom of the page and click on it   
   * Page loads and contains 4 boxes
  */
  async clickBookAnAppointment() {
    await this.bookAnAppointmentButton.click();
    await expect(this.everydayBankingBox).toBeTruthy();
    await expect(this.borrowingBox).toBeTruthy();
    await expect(this.investmentsBox).toBeTruthy();
    await expect(this.businessSupportBox).toBeTruthy();
  }

  /**
   * Locate the button “Find a Branch” in the “Find Us” section at the bottom of the page and click on it   
   * Page should not load the 4 boxes, assertions should fail
  */
  async clickFindABranch() {
    await this.findABranchButton.click();
    await expect(this.everydayBankingBox).toBeTruthy();
    await expect(this.borrowingBox).toBeTruthy();
    await expect(this.investmentsBox).toBeTruthy();
    await expect(this.businessSupportBox).toBeTruthy();
  }

  /**
   * Click the “Select” button for “Everyday Banking”
  */
  async clickSelectButtonForEverydayBanking() {
    await this.everydayBankingSelectButton.click();
  }

  /**
   * Search for a valid location using zipcode.   
   * @param zipCode - string input
   * 4 Boxes and Hazlet city should be displayed
  */
  async searchForValidLocation(zipCode: string) {
    await this.searchLocationTextBox.type(zipCode);
    await this.page.keyboard.press('Enter');
    await expect(this.branchBoxesCount).toHaveCount(4);
    await expect(this.page.getByText('Hazlet')).toBeTruthy();
  }

  /**
   * Search for a invalid location using zipcode.   
   * @param zipCode - string input
   * No result Alert should be displayed
  */
  async searchForInvalidLocation(zipCode: string) {
    await this.searchLocationTextBox.type(zipCode);
    await this.page.keyboard.press('Enter');
    await expect(this.noResultsAlert).toBeTruthy();
  }

  /**
   * Locate the “Checking accounts” section at the middle of the web page then click on the “Get started” button 
   * Page loads and contains 3 boxes
  */
  async clickCheckingAccounts() {
    await this.checkingAccountsButton.click();
    await expect(this.selectCheckingMoreDetailsButton).toBeTruthy();
    await expect(this.simplyRightCheckingMoreDetailsButton).toBeTruthy();
    await expect(this.essentialCheckingMoreDetailsButton).toBeTruthy();
  }

 /**
   * Locate the “Checking accounts” section at the middle of the web page then click on the “Get started” button 
   * Page loads and contains 3 boxes
   * Assertion should fail due Select Checking should be displayed
  */
  async clickCheckingAccountsAndSearchSelectChecking() {
    await this.checkingAccountsButton.click();
    await expect(this.selectCheckingMoreDetailsButton).toBeFalsy();
  }

  /**
   * Click the “Open account” link for “Simply Right® Checking”
   * Validate URL contains the url that is in the assertion
  */
  async clickSimplyRightCheckingOpenAccount() {
    const [newWindow] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.simplyRightCheckingOpenAccountLink.click(),
    ]);
    await expect(newWindow.url()).toContain(
      'https://secureopen.santanderbank.com/apps/servlet/SmartForm.html?formCode=sbnadao&product=SimplyRightChecking'
    );
  }
}
