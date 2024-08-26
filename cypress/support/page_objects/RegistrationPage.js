export default class RegistrationPage {
  verifyBoohooTitle() {
    return cy.xpath("//a[@title='Boohoo']").should("be.visible");
  }
  ClickSignInButton() {
    let signInButton = "//a[@title='Sign in']";
    return cy.xpath(signInButton).should("be.visible");
  }
  clickRegisterButton() {
    return cy
      .xpath("//a[@class='b-button m-small b-registration_benefits-button']")
      .should("be.visible");
  }

  clickRegisterWithEmailAdress() {
    let registerEmailAddress = "(//input[@id='dwfrm_registration_customer_email'])[1]";
    return cy.xpath(registerEmailAddress).should("be.visible");
  }

  clickContinueButton() {
    return cy.get('[data-ref="step1"] > .b-button').click();
  }

  clickCreateAccount() {
    return cy.get(".b-form_box > .b-button").click({ force: true });
  }
  checkRegistartionEmailBox() {
    return cy.xpath("//input[@id='dwfrm_registration_customer_emailregistationconfirm']").click();
  }
  fillRegistrationPassword() {
    return cy.xpath("//div[@data-id='dwfrm_registration_login_password']").type("Dimpu@123");
  }

  fillRegistrationConfirmPassword() {
    return cy.xpath("//input[@id='dwfrm_registration_login_passwordconfirm']").type("Dimpu@123");
  }

  fillFirstName() {
    return cy.get("#dwfrm_registration_customer_firstname");
  }

  fillLastName() {
    return cy.get("#dwfrm_registration_customer_lastname");
  }
  selectBirthDay() {
    return cy.get("#dwfrm_registration_customer_dayofbirth");
  }

  selectBirthMonth() {
    return cy.get("#dwfrm_registration_customer_monthofbirth");
  }

  selectBirthYear() {
    return cy.get("#dwfrm_registration_customer_yearOfBirth");
  }
  clickCreatAccount() {
    return cy.xpath("//button[@data-id='createAccountButton']");
  }
}
