import RegistrationPage from '../../support/page_objects/RegistrationPage';

describe('Authentication Registartion', () => {
  // Instantiate page objects for improved modularity and ease of maintenance
  const registrationPage = new RegistrationPage();

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Test -Verify user cannot register with an already registered email', () => {
    // Custom Cypress command to navigate to the registration page
    cy.registration();

    // Load registration data from fixture to enhance test flexibility and maintainability
    cy.fixture('registration').then((data) => {
      // Interact with the registration form
      registrationPage.clickSignInButton();
      registrationPage.clickRegisterButton();

      // Fill in the email address for registration
      registrationPage.fillRegisterWithEmailAdress(data.emailId);
      registrationPage.clickContinueButton();

      // Confirm that the email has been entered correctly
      registrationPage.checkRegistartionEmailConfirmBox();

      // Fill in the password for registration
      registrationPage.fillRegistrationPassword(data.password);
      registrationPage.fillRegistrationConfirmPassword(data.password);

      // Fill in personal details such as first name and last name
      registrationPage.fillFirstName(data.firstName);
      registrationPage.fillLastName(data.lastName);

      // Select date of birth and verify the selected values are correct
      registrationPage
        .selectBirthDay()
        .invoke('val')
        .should('eq', data.birthDay);
      registrationPage
        .selectBirthMonth()
        .invoke('val')
        .should('eq', data.birthMonth);
      registrationPage
        .selectBirthYear()
        .invoke('val')
        .should('eq', data.birthyear);

      cy.log(
        "After all fields are filled then next click on the 'CREATE ACCOUNT' button"
      );
      // Submit the form by clicking the "Create Account" button
      registrationPage.clickCreatAccount();

      // Pause is used here because sometimes the website shows an Image Captcha.
      // Image Captchas can't be automated, so manually resolve the captcha by using the pause.
      cy.pause();

      // Wait for the error message to be displayed, indicating an already registered email
      registrationPage.verifyEmailIdErrorMessage(data.errorMessage, {
        timeout: 4000,
      });
    });
  });
});
