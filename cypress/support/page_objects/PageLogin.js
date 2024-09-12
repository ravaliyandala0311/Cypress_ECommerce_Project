import { recurse } from 'cypress-recurse';
export default class PageLogin {
  // Method to click on Accept Button cookies
  clickCookiesAcceptButton() {
    return cy.get('#onetrust-accept-btn-handler').should('be.visible').click();
  }

  // Method to  click on Login Button
  clickLoginButton() {
    return cy.get('.m-width_full.m-small').should('be.visible').click();
  }

  // Method to click on SignIn Button
  clickSignInButton() {
    return cy.get('.b-header_login-icon').should('be.visible').click();
  }

  //Constructor
  constructor() {
    this.emailInput = '#dwfrm_login_email';
    this.passwordInput = '#dwfrm_login_password';
    this.loginButton = '.b-button.m-width_full.m-small';
  }

  // Method to visit login page
  visit() {
    const baseUrl = Cypress.env('baseUrl');
    cy.visit(`${baseUrl}`);
  }
  // Method to enter the email
  // Here I used Recurse for EmailId enter because it is behaving as Flake when Typing the text. so I'm using cypress-recurse
  enterEmail(email) {
    recurse(
      () => cy.get(this.emailInput).clear().type(email),
      ($input) => $input.val() === email,
      {
        delay: 1000,
        timeout: 5000,
      }
    );
  }

  // Method to enter the password
  enterPassword(password) {
    return cy.get(this.passwordInput).should('be.visible').type(password);
  }

  // Method to click login button
  clickLogin() {
    return cy.get(this.loginButton).should('be.enabled').click();
  }

  // Method to perform the complete login action
  loginWithEmailPassword(email, password) {
    this.clickCookiesAcceptButton();
    this.clickSignInButton();
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLogin();
  }
}
