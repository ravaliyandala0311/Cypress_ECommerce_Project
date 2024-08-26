/// <reference types="cypress-xpath" />

import RegistrationPage from "../../support/page_objects/RegistrationPage";

describe("Authentication Registartion", () => {
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    // Load the fixture data before each test
    cy.fixture("registration").as("registration");
  });

  it("Test -Verify user cannot register with an already registered email", () => {
    //visit the Boohoo website
    cy.log("Visiting the Boohoo website ");

    // Navigate to register page
    cy.registerPage();

    cy.get("@registration").then((data) => {
      //clicking the Register Button and filling all the fields
      cy.log("clicking the Register Button and filling all the fields");
      registrationPage.getSignInButton().click();
      registrationPage.getRegisterButton().click();
      registrationPage.getRegisterWithEmailAdress().type(data.emailId);
      registrationPage.getCreateAccount().click({ force: true });
      registrationPage.getContinueButton().click();
      registrationPage.checkRegistartionEmailBox();
      registrationPage.fillRegistrationPassword().type(data.password);
      registrationPage.fillRegistrationConfirmPassword().type(data.password);
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

      //click on create Account button
      registrationPage.clickCreatAccount().click({ force: true });
      // Pause is used here because sometimes the website shows an Image Captcha.
      // Image Captchas can't be automated, so manually resolve the captcha during the pause.
      cy.pause();

      cy.wait(4000);

      // verify the Alert message when creating with already existing email id
      registrationPage
        .verifyAlertMessage()
        .find("span")
        .should(
          "contain",
          "Looks like you already have an account with us. Please try logging in or use a different email address"
        );
    });
  });
});
