// 代码生成时间: 2025-10-16 18:05:35
// Import necessary modules
const { browser, by, element, ExpectedConditions as EC } = require('protractor');

/**
 * Configure the browser for testing
 */
browser.waitForAngularEnabled(false);

/**
 * Base class for page objects
 */
class Page {
  constructor(url) {
    this.url = url;
  }

  /**
   * Navigate to the page
   */
  navigateTo() {
    return browser.get(this.url);
  }
}

/**
 * Specific page object for the login page
 */
class LoginPage extends Page {
  constructor() {
    super('/login');
  }

  /**
   * Enter username and password, then submit the form
   *
   * @param username - The username to enter
   * @param password - The password to enter
   * @returns Promise that resolves when the form is submitted
   */
  login(username, password) {
    const usernameInput = element(by.name('username'));
    const passwordInput = element(by.name('password'));
    const submitButton = element(by.css('button[type=