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
    //Visiting the Boohoo website and login into the website
    cy.login();

    //Here I'm using pause because sometimes in website, it is popping up with Image Captcha.
    //Image captcha can't be do  automation. so, I am pausing the application manually resolving the Image Captcha
    cy.pause();

    cy.get("@data").then((data) => {
      cy.url().should("contain", data.urlacoount);

      //Searching the product
      homepage.searchIteams().type(data.DressName);
      homepage.searchButton().click();

      //logout
      cy.logout();

      //verifing the login url
      cy.url().should("contain", "login");
    });
  });
});
