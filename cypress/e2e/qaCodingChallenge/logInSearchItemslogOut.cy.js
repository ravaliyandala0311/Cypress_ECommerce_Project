import HomePage from '../../support/page_objects/HomePage';
import LogoutPage from '../../support/page_objects/LogoutPage';

describe('login ', () => {
  const homePage = new HomePage();
  const logoutPage = new LogoutPage();

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('login and search the items and Logout', () => {
    // Visit the website and log in with valid credentials
    cy.loginWithEmailPassword();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha during the pause.
    cy.pause();

    cy.fixture('testData').then((data) => {
      // Verify the user is successfully redirected to the account page by checking the URL
      cy.url().should('contain', data.urlAcoount);

      //Search the product
      homePage.searchProduct(data.productName);
      homePage.clickSearchButton();

      homePage.clickHeaderLogInIcon();

      //click on logout
      logoutPage.clickLogoutButton();

      // Verify that the user is redirected back to the login page
      cy.url().should('contain', data.login);
    });
  });
});
