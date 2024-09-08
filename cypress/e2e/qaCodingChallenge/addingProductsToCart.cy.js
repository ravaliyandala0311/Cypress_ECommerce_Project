import HomePage from '../../support/page_objects/HomePage';
import ProductsPage from '../../support/page_objects/ProductsPage';
import CheckOutPage from '../../support/page_objects/CheckOutPage';

describe('Add product to cart and verify products added to cart is updated properly ', () => {
  // Instantiate page objects for better modularity and readability
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const checkoutPage = new CheckOutPage();

  Cypress.on(
    'uncaught:exception',
    (err, runnable) => false // Prevents Cypress from failing the test on uncaught exceptions
  );

  it('Test - Add products to the cart and verify the cart total', () => {
    // Visit the website and log in with valid credentials
    cy.loginWithEmailPassword();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha by using the pause.
    cy.pause();

    // Use fixture data
    cy.fixture('testData').then((data) => {
      // Verify if the user is redirected correctly to the account page
      verifyUserRedirectedToAccountPage(data);
      // Search for the desired product and select it with the correct size
      searchAndSelectProduct(data);
      // Add the product to the cart and proceed to the checkout page
      verifyProductSelectionAndAddToCart();
      // Validate the cart total by summing up the product prices and adding the delivery charge
      verifyCartTotalAmount(data);
      // Finally, remove all items from the cart to clean up after the test
      removeAllProductsFromCart();
    });
  });

  function verifyUserRedirectedToAccountPage(data) {
    // Verify the user is redirected to the account page
    cy.url().should('contain', data.urlAcoount);
  }

  function searchAndSelectProduct(data) {
    // Search for products and ensure correct URL
    homePage.searchProduct(data.productName);
    homePage.clickSearchButton();
    cy.url().should('contain', data.productName);

    // Select product and size
    productsPage.selectDress(data.dressName);
    productsPage.seletDressSize().should('have.attr', 'aria-checked', 'true');
  }

  function verifyProductSelectionAndAddToCart() {
    // Add product to cart
    productsPage.clickAddToCart();

    // View cart and proceed to checkout
    homePage.clickViewYourCartButton();
    checkoutPage.clickCheckOutButton({ timeout: 3000 });
  }

  function verifyCartTotalAmount(data) {
    let sumOfProducts = 0;

    // Sum up each product's price
    checkoutPage
      .getEachProductPrice()
      .each(($e1) => {
        const priceValue = $e1.text();
        const numericPrice = parseFloat(priceValue.replace('£', ''));
        sumOfProducts += numericPrice;
        console.log('sumOfProducts', sumOfProducts);
      })
      .then(() => {
        verifyOrderTotalWithDelivery(sumOfProducts, data);
      });
  }
  // Function to validate that the total price matches the sum of product prices plus delivery charges
  function verifyOrderTotalWithDelivery(sumOfProducts, data) {
    checkoutPage.orderTotalValue().then(($totalAmount) => {
      const orderValue = $totalAmount.text();
      const numericPriceTotal = parseFloat(orderValue.replace('£', ''));
      const TotalPlusDeliveryCharge = sumOfProducts + data.ukStandardDelivery;

      // Assert that the total matches the sum of products + delivery charge
      expect(numericPriceTotal.toFixed(2)).to.eq(
        TotalPlusDeliveryCharge.toFixed(2)
      );
    });
  }
  // Function to remove all products from the cart after the test
  function removeAllProductsFromCart() {
    // Click "Edit Cart" and remove all products
    checkoutPage.clickCartEditButton();
    checkoutPage.getRemoveProductButton().each(($el) => {
      cy.wrap($el).click({ force: true, timeout: 4000 });
    });
  }
});
