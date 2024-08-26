export default class HomePage {
  searchIteams() {
    return cy.xpath("//input[@aria-owns='search-suggestions-list']").should("be.visible");
  }
  searchButton() {
    return cy.get(".b-search_input-submit").should("be.visible");
  }
  clickViewYourCartButton() {
    cy.get(".b-minicart_icon-qty").click();
  }
}
