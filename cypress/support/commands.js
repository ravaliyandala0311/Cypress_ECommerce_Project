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
Cypress.Commands.add("registerPage", () => {
  cy.visit("https://www.boohoo.com/");
  cy.get("#onetrust-accept-btn-handler").click();
  cy.xpath("//a[@title='Boohoo']").should("be.exist");
});

Cypress.Commands.add("loginDebug", (email, password) => {
  cy.visit(Cypress.env("booHooUrl"));
  cy.xpath(Cypress.env("signInButton")).click({ force: true });
  cy.get(Cypress.env("cookies_button")).click();
  cy.get(Cypress.env("user_id")).should("be.visible").type(email);
  cy.get(Cypress.env("user_password_id")).should("be.visible").type(password);
  cy.xpath(Cypress.env("loginButton")).should("be.visible").click();
  cy.xpath(Cypress.env("boohoo_title"), { timeout: 30000 }).should("be.visible");
});

Cypress.Commands.add("login", () => {
  cy.loginDebug(Cypress.env("user_email"), Cypress.env("user_password"));
});

Cypress.Commands.add("logout", () => {
  cy.get(Cypress.env("login_username_id")).click();
  cy.get(Cypress.env("logout_button")).click();
});
