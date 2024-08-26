/// <reference types="cypress-xpath" />

import CatalogsPage from "../../support/page_objects/CatalogsPage";
import ProductsPage from "../../support/page_objects/ProductsPage";

describe("Browsing the catalog", () => {
  const catalogsPage = new CatalogsPage();
  const productsPage = new ProductsPage();

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    // Load the fixture data before each test
    cy.fixture("browseCatalog").as("data");
  });

  it("Test - verifying the products listings and Filtering, sorting and Navigating to the product ", () => {
    // Visit the website and log in with valid credentials
    cy.login();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha during the pause.
    cy.pause();

    cy.get("@data").then((data) => {
      //Navigate to the product catalog
      catalogsPage.selectAllClothingMenu().trigger("mouseover");

      //Navigate  to the tall clothing section
      catalogsPage.selectCategory(data.productName).click({ force: true });
      cy.url().should("include", "tall-clothing");

      //sorting the products fron Low to High price
      productsPage
        .selectSortButton()
        .select(data.priceLowToHigh)
        .should("have.value", data.pricelowtoHigh_attr);

      cy.wait(4000);

      // Validate that the products are displayed in sorted order
      // Note: There is a known bug on the website where the products are not sorted as expected
      let previousPrice = 0;

      productsPage.selectProductsPrice().each(($price, index, $list) => {
        const priceText = $price.text().replace("£", "").trim();
        const currentPrice = parseFloat(priceText);
        // For the first product, compare to initial previous price (0)
        if (index === 0) {
          expect(currentPrice).to.be.gte(previousPrice);
          previousPrice = currentPrice;
        } else {
          // Ensure that the current price is greater than or equal to the previous price
          expect(currentPrice).to.be.gte(previousPrice);
          //Update previous price to current price for next iteration
          previousPrice = currentPrice;
        }
      });
    });
  });
});
