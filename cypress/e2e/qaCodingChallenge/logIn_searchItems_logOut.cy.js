/// <reference types="cypress-xpath" />

import HomePage from "../../support/page_objects/HomePage";

describe("login and verify the search product and logout", () => {
  const homepage = new HomePage();

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  beforeEach(() => {
    // Load the fixture data before each test
    cy.fixture("testData").as("data");
  });

  it("login and search the items and Logout", () => {
    // Visit the website and log in with valid credentials
    cy.login();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha during the pause.
    cy.pause();

    cy.get("@data").then((data) => {
      // Verify the user is successfully redirected to the account page by checking the URL
      cy.url().should("contain", data.urlacoount);

      //Search the product
      homepage.searchIteams().type(data.DressName);
      homepage.searchButton().click();

      //click on logout
      cy.logout();

      // Verify that the user is redirected back to the login page
      cy.url().should("contain", "login");
    });
  });
});
