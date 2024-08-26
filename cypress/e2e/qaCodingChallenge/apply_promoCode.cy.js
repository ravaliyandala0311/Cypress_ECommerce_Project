/// <reference types="cypress-xpath" />

import HomePage from "../../support/page_objects/HomePage";
import ProductsPage from "../../support/page_objects/ProductsPage";
import CheckOutPage from "../../support/page_objects/CheckOutPage";

describe("Apply promo code to the cart and verify the value", () => {
  const homepage = new HomePage();
  const productspage = new ProductsPage();
  const checkoutpage = new CheckOutPage();
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    // Load the fixture data before each test
    cy.fixture("testData").as("data");
  });

  it("Test- Apply Promo code and verify the cart total, and check the promo code discount  ", () => {
    // Visit the website and log in with valid credentials
    cy.login();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha during the pause.
    cy.pause();

    // Access fixture data for the test
    cy.get("@data").then((data) => {
      // Verify the user is successfully redirected to the account page by checking the URL
      cy.url().should("contain", data.urlacoount);

      // Select a specific product by name and size
      homepage.searchIteams().type(data.SearchText, "{enter}");
      homepage.searchButton().click();
      cy.url().should("contain", data.SearchText);

      //select a product by DressName and size
      productspage.selectProduct(data.DressName);
      productspage.seletProductSize();

      // Wait for size selection to complete, as it may take time for the UI to render
      cy.wait(4000);

      // Add the selected product to the cart
      productspage.clickAddToCart();

      // Click on "View Your Cart" button to proceed to the cart overview page
      homepage.clickViewYourCartButton();

      // Navigate to the checkout page to review the cart and apply the promo code
      checkoutpage.clickCheckOutButton();

      // Apply the provided promo code
      checkoutpage.typePromoCode().type(data.promoCode);
      checkoutpage.ClickApplyButton();

      // Verify that the promo code application was successful by checking the success message
      checkoutpage.verifyPromoCodeSuccessMessage().should("contain", data.successmessage);
    });

    // Initialize a variable to accumulate the total price of the products in the cart
    let sumOfProducts = 0;

    // Loop through each product's price in the cart, parse it, and accumulate the total
    checkoutpage
      .getEachProductPrice()
      .each(($e1, Index, $list) => {
        const priceValue = $e1.text();
        const numericPrice = parseFloat(priceValue.replace("£", ""));
        sumOfProducts = parseFloat(sumOfProducts) + numericPrice;
        console.log("sumOfProducts", sumOfProducts);
      })
      .then(() => {
        // Calculate the discount amount based on a 20% discount - Is discount value is varying
        let discountAmountOfperc = parseFloat((sumOfProducts * 20) / 100);
        console.log("after sumOfProducts ", sumOfProducts);
        console.log("discount amount", discountAmountOfperc);
        checkoutpage.getDiscountPrice().then(($ele) => {
          const discontPriceText = $ele.text();
          console.log("DiscountPriceText", discontPriceText);
          expect(discontPriceText).to.contain(discountAmountOfperc);
        });
      });

    // Remove the promo code from the cart to reset the cart values
    checkoutpage.getRemoveCodeButton().click();

    // Click the "Edit Cart" button to start the process of removing items from the cart
    checkoutpage.getCartEditButton().click();

    // Loop through all "X" buttons to remove all products from the cart
    checkoutpage.getremoveProductButton().each(($el, Index) => {
      // Alias the remove button for re-querying and handling actions
      cy.wrap($el).as("removeBtn");

      // Perform the click action
      cy.get("@removeBtn").click({ force: true });

      //  wait to ensure the UI has updated before continuing
      cy.wait(1000);
    });
  });
});
