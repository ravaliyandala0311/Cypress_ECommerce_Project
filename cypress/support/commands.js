import PageLogin from './page_objects/PageLogin';
import RegistrationPage from './page_objects/RegistrationPage';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('loginWithEmailPassword', () => {
  const username = Cypress.env('userEmail');
  const password = Cypress.env('userPassword');

  const loginPage = new PageLogin(); // Create an instance of the LoginPage

  // Visit the login page
  loginPage.visit();

  // Perform login using the page object methods
  loginPage.loginWithEmailPassword(username, password);
});

Cypress.Commands.add('registration', () => {
  const registrationPage = new RegistrationPage(); // Create an instance of the registrationPage
  const loginPage = new PageLogin(); // Create an instance of the LoginPage
  // Visit the login page
  loginPage.visit();

  // Perform login using the page object methods
  registrationPage.registration();
});
