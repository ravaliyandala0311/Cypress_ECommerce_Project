/// <reference types="cypress-xpath" />

import RegistrationPage from "../../support/page_objects/RegistrationPage";

describe("Authentication Registartion", () => {
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    // Load the fixture data before each test
    cy.fixture("registration").as("registration");
  });

  it("Test -visit the Boohoo website and Register as new customer", () => {
    cy.log("Visiting the Boohoo website ");
    cy.registerPage();
    cy.get("@registration").then((data) => {
      cy.log("clicking the Register Button and filling all the fields");
      registrationPage.ClickSignInButton().click();
      registrationPage.clickRegisterButton().click();
      registrationPage.clickRegisterWithEmailAdress().type(data.emailId);
      registrationPage.clickCreateAccount();
      registrationPage.clickContinueButton();
      registrationPage.checkRegistartionEmailBox();
      registrationPage.fillRegistrationPassword();
      registrationPage.fillRegistrationConfirmPassword();
      registrationPage.fillFirstName().type(data.firstName);
      registrationPage.fillLastName().type(data.lastName);
      registrationPage.selectBirthDay().select(3).invoke("val").should("eq", data.birthDay);
      registrationPage
        .selectBirthMonth()
        .select("November")
        .invoke("val")
        .should("eq", data.birthMonth);
      registrationPage.selectBirthYear().select(14).invoke("val").should("eq", data.birthyear);
      cy.log("After all fields filled then clicking on the CREATE ACCOUNT button");
      registrationPage.clickCreatAccount().click({ force: true });
    });
  });
});
