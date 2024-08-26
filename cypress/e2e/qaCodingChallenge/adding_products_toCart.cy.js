/// <reference types="cypress-xpath" />

import HomePage from "../../support/page_objects/HomePage";
import ProductsPage from "../../support/page_objects/ProductsPage";
import CheckOutPage from "../../support/page_objects/CheckOutPage";

describe("Add product to card and verify if on main page card section is updated properly ", () => {
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

  it("Test- Add products to the cart and verify the amount of cart  ", () => {
    // Visit the website and log in with valid credentials
    cy.login();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha during the pause.s
    cy.pause();

    cy.get("@data").then((data) => {
      // Verify the user is successfully redirected to the account page by checking the URL
      cy.url().should("contain", data.urlacoount);

      // Search for products using the search field and ensure the correct URL is loaded
      homepage.searchIteams().type(data.SearchText, "{enter}");
      homepage.searchButton().click();
      cy.url().should("contain", data.SearchText);

      // Select a specific product by name and size
      productspage.selectProduct(data.DressName);
      productspage.seletProductSize();

      // Wait for the size selection to complete due to potential delay in rendering the options
      cy.wait(4000);

      // Add the selected product to the cart
      productspage.clickAddToCart();

      // Click the "View Your Cart" button to proceed to the cart page
      homepage.clickViewYourCartButton();

      // Navigate to the checkout page to verify cart details
      checkoutpage.clickCheckOutButton();

      // Initialize a variable to accumulate the total price of the products
      let sumOfProducts = 0;

      // Loop through each product's price in the cart, parse it, and add to the sum
      checkoutpage
        .getEachProductPrice()
        .each(($e1, Index, $list) => {
          const priceValue = $e1.text();
          const numericPrice = parseFloat(priceValue.replace("£", ""));
          sumOfProducts = parseFloat(sumOfProducts) + numericPrice;
          console.log("sumOfProducts", sumOfProducts);
        })
        // After summing up the products, verify if the total order amount matches the sum of products + delivery charge
        .then(() => {
          checkoutpage.orderTotalValue().then(($totalAmount) => {
            const orderValue = $totalAmount.text();
            const numericPriceTotal = parseFloat(orderValue.replace("£", ""));
            const ukStandardDelivery = data.ukStandardDelivery;
            const TotalPlusDeliveryCharge = sumOfProducts + ukStandardDelivery;
            // Assert that the calculated total matches the displayed total amount
            expect(numericPriceTotal.toFixed(2)).to.eq(TotalPlusDeliveryCharge.toFixed(2));
          });
        });
      // Click the "Edit Cart" button to start the process of removing items from the cart
      checkoutpage.getCartEditButton().click();

      // Loop through all the "X" buttons to remove products from the cart
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
});
