export default class LogoutPage {
  // Method to click of logout Button
  clickLogoutButton() {
    return cy.get('.b-header_logged-logout').should('be.visible').click();
  }
}
