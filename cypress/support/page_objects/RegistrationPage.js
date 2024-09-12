export default class RegistrationPage {
  // Method to click of SignIn button
  clickSignInButton() {
    return cy.get('.b-header_login-icon').should('be.visible').click();
  }
  // Method to click of Register Button
  clickRegisterButton() {
    return cy
      .get('.b-button.m-small.b-registration_benefits-button')
      .should('be.visible')
      .click();
  }
  // Method to enter the emailId
  fillRegisterWithEmailAdress(emailId) {
    return cy
      .get(
        ".b-form > [data-widget='inputEmail'] > #dwfrm_registration_customer_email"
      )
      .should('be.visible')
      .type(emailId);
  }
  // Method to click on continue button
  clickContinueButton() {
    return cy
      .get('[data-ref="step1"] > .b-button')
      .should('be.visible')
      .click();
  }
  // Method to check the email confirm box
  checkRegistartionEmailConfirmBox() {
    return cy
      .get('#dwfrm_registration_customer_emailregistationconfirm')
      .click();
  }
  // Method to enter the password
  fillRegistrationPassword(password) {
    return cy.get('#dwfrm_registration_login_password').type(password);
  }
  // Method to enter the confirm password
  fillRegistrationConfirmPassword(password) {
    return cy.get('#dwfrm_registration_login_passwordconfirm').type(password);
  }
  // Method to enter the first name
  fillFirstName(firstName) {
    return cy.get('#dwfrm_registration_customer_firstname').type(firstName);
  }
  // Method to enter the last name
  fillLastName(lastName) {
    return cy.get('#dwfrm_registration_customer_lastname').type(lastName);
  }
  // Method to select the birth Day
  selectBirthDay() {
    return cy.get('#dwfrm_registration_customer_dayofbirth').select(3);
  }
  // Method to select the birth Month
  selectBirthMonth() {
    return cy
      .get('#dwfrm_registration_customer_monthofbirth')
      .select('November');
  }
  // Method to select the birth Year
  selectBirthYear() {
    return cy.get('#dwfrm_registration_customer_yearOfBirth').select(14);
  }
  // Method to click on CreateAccount Button
  clickCreatAccount() {
    return cy
      .get('.b-form_section > .b-button.m-width_full')
      .click({ force: true });
  }
  // Method to verify the error message
  getEmailIdErrorMessage() {
    return cy.get('#dwfrm_registration_customer_email-error > span');
  }
  // Method to verify the error message
  verifyEmailIdErrorMessage(expectedErrorMessage) {
    return this.getEmailIdErrorMessage().should(
      'contain',
      expectedErrorMessage
    );
  }
  // Method to click on Accept Button cookies
  clickCookiesAcceptButton() {
    return cy.get('#onetrust-accept-btn-handler').click();
  }
  // Method to perform the complete login action
  registration() {
    this.clickCookiesAcceptButton();
  }
}
