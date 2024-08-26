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
    //Visiting the Boohoo website and login into the website
    cy.login();

    //Here I'm using pause because sometimes in website, it is popping up with Image Captcha.
    //Image captcha can't be do  automation. so, I am pausing the application manually resolving the Image Captcha
    cy.pause();

    cy.get("@data").then((data) => {
      //Navigate to the product catalog
      catalogsPage.selectAllClothingMenu().trigger("mouseover");

      //Navigate  to the tall clothing section
      catalogsPage.selectCategory(data.productName).click({ force: true });
      cy.url().should("include", "tall-clothing");

      //sorting the products fron Low to High
      productsPage
        .selectSortButton()
        .select(data.priceLowToHigh)
        .should("have.value", data.pricelowtoHigh_attr);

      cy.wait(4000);

      //Validate the products are displaying in sort order
      // but in website I found a error , products are not displayed as expected
      let previousPrice = 0;
      productsPage.selectProductsPrice().each(($price, index, $list) => {
        const priceText = $price.text().replace("£", "").trim();
        const currentPrice = parseFloat(priceText);
        if (index === 0) {
          expect(currentPrice).to.be.gte(previousPrice);
          previousPrice = currentPrice;
        } else {
          expect(currentPrice).to.be.gte(previousPrice);
          previousPrice = currentPrice;
        }
      });
    });
  });
});
