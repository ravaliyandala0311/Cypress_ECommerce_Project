export default class HomePage {
  // Method to select the product
  searchProduct(productName) {
    return cy
      .get("[aria-label='Search combobox']")
      .should('be.visible')
      .type(productName);
  }
  // Method to click on search button
  clickSearchButton() {
    return cy.get('.b-search_input-submit').should('be.visible').click();
  }
  // Method to click on viewyouracart Button
  clickViewYourCartButton() {
    return cy.get('.b-minicart_icon-qty').click({ force: true });
  }
  // Method to click of header login Icon
  clickHeaderLogInIcon() {
    return cy.get('.b-header_login-icon', { timeout: 4000 }).click();
  }
}
