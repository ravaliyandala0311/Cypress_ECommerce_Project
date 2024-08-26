export default class RegistrationPage {
  verifyBoohooTitle() {
    return cy.xpath("//a[@title='Boohoo']").should("be.visible");
  }
  getSignInButton() {
    let signInButton = "//a[@title='Sign in']";
    return cy.xpath(signInButton).should("be.visible");
  }
  getRegisterButton() {
    return cy
      .xpath("//a[@class='b-button m-small b-registration_benefits-button']")
      .should("be.visible");
  }

  getRegisterWithEmailAdress() {
    let registerEmailAddress = "(//input[@id='dwfrm_registration_customer_email'])[1]";
    return cy.xpath(registerEmailAddress).should("be.visible");
  }

  getContinueButton() {
    return cy.get('[data-ref="step1"] > .b-button');
  }

  getCreateAccount() {
    return cy.get(".b-form_box > .b-button");
  }
  checkRegistartionEmailBox() {
    return cy.xpath("//input[@id='dwfrm_registration_customer_emailregistationconfirm']").click();
  }
  fillRegistrationPassword() {
    return cy.xpath("//div[@data-id='dwfrm_registration_login_password']");
  }

  fillRegistrationConfirmPassword() {
    return cy.xpath("//input[@id='dwfrm_registration_login_passwordconfirm']");
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
    return cy.get(":nth-child(9) > .b-button");
  }

  verifyAlertMessage() {
    return cy.xpath(
      "//div[@class='b-form_section m-required m-invalid']//div[@id='dwfrm_registration_customer_email-error']"
    );
  }
}
