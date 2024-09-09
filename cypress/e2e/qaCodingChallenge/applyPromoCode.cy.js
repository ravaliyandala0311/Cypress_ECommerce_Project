import HomePage from '../../support/page_objects/HomePage';
import ProductsPage from '../../support/page_objects/ProductsPage';
import CheckOutPage from '../../support/page_objects/CheckOutPage';

describe('Apply promo code to the cart and verify the value', () => {
  // Instantiate page objects for improved modularity and ease of maintenance
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const checkoutPage = new CheckOutPage();

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Test- Apply Promo code and verify the cart total, and check the promo code discount  ', () => {
    // Visit the website and log in with valid credentials
    cy.loginWithEmailPassword();

    // Pause is used here because sometimes the website shows an Image Captcha.
    // Image Captchas can't be automated, so manually resolve the captcha by using the pause.
    cy.pause();

    // Access fixture data for the test
    cy.fixture('testData').then((data) => {
      // Verify the user is successfully redirected to the account page by checking the URL
      cy.url().should('contain', data.urlAcoount);

      // Search for products using the search field and ensure the correct URL is loaded
      homePage.searchProduct(data.productName);
      homePage.clickSearchButton();
      cy.url().should('contain', data.productName);

      //select a product by DressName and size
      productsPage.selectDress(data.dressName);
      productsPage.seletDressSize();

      // verifing the dress size is selected or not. if dress size selected then aria-checked attribute becomes true
      productsPage.seletDressSize().should('have.attr', 'aria-checked', 'true');

      // Add the selected product to the cart
      productsPage.clickAddToCart();

      // Click on "View Your Cart" button to proceed to the cart overview page
      homePage.clickViewYourCartButton();

      // Navigate to the checkout page to review the cart and apply the promo code
      checkoutPage.clickCheckOutButton({ timeout: 3000 });

      // Apply the provided promo code
      checkoutPage.enterPromoCode(data.promoCode);
      checkoutPage.clickApplyButton();

      // Verify that the promo code application was successful by checking the success message
      checkoutPage
        .verifyPromoCodeSuccessMessage()
        .should('contain', data.successMessage);
    });

    // Initialize a variable to accumulate the total price of the products in the cart
    let sumOfProducts = 0;

    // Loop through each product's price in the cart, parse it, and accumulate the total
    checkoutPage
      .getEachProductPrice()
      .each(($e1, Index, $list) => {
        const priceValue = $e1.text();
        const numericPrice = parseFloat(priceValue.replace('£', ''));
        sumOfProducts = parseFloat(sumOfProducts) + numericPrice;
        console.log('sumOfProducts', sumOfProducts);
      })
      .then(() => {
        // Calculate the discount amount based on a discount - discount value is varying based on promocode
        let discountPercentage = 19.05434;
        let discountAmountOfperc = parseFloat(
          (sumOfProducts * discountPercentage) / 100
        );
        console.log('after sumOfProducts ', sumOfProducts);
        console.log('discount amount', discountAmountOfperc);
        checkoutPage.getDiscountPrice().then(($ele) => {
          const discontPriceText = $ele.text();
          console.log('DiscountPriceText', discontPriceText);
          expect(discontPriceText).to.contain(discountAmountOfperc);
        });
      });

    // Remove the promo code from the cart to reset the cart values
    checkoutPage.clickRemoveCodeButton();

    // Click the "Edit Cart" button to start the process of removing items from the cart
    checkoutPage.clickCartEditButton();

    // Loop through all "X" buttons to remove all products from the cart
    checkoutPage.getRemoveProductButton().each(($el, Index) => {
      // Alias the remove button for re-querying and handling actions
      cy.wrap($el).as('removeBtn');

      // Perform the click action
      cy.get('@removeBtn').click({ force: true });
    });
    cy.get('.b-cart_empty-title').should(
      'contain',
      ' Your cart is currently empty '
    );
  });
});
