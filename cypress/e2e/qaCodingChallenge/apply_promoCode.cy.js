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

  it("Test- Apply Promo code and verify the amount of cart and verify the promocode saved amount  ", () => {
    //Visiting the Boohoo website and login into the website
    cy.login();

    //Here I'm using pause because sometimes in website, it is popping up with Image Captcha.
    //Image captcha can't be do  automation. so, I am pausing the application manually resolving the Image Captcha
    cy.pause();

    cy.get("@data").then((data) => {
      //visit the home page
      cy.url().should("contain", data.urlacoount);

      //search the Products by Search field
      homepage.searchIteams().type(data.SearchText, "{enter}");
      homepage.searchButton().click();
      cy.url().should("contain", data.SearchText);

      //select a product by DressName and size
      productspage.selectProduct(data.DressName);
      productspage.seletProductSize();

      //wait is used because size field is taking more time to select
      cy.wait(4000);

      //Add the product to the cart
      productspage.clickAddToCart();

      //check on view Your cart button
      homepage.clickViewYourCartButton();

      //Navigate to the cart page
      checkoutpage.clickCheckOutButton();

      //Apply Promocode
      checkoutpage.typePromoCode().type(data.promoCode);
      checkoutpage.ClickApplyButton();

      // verify the PromocodeSuccessmessage
      checkoutpage.verifyPromoCodeSuccessMessage().should("contain", data.successmessage);
    });

    // calculate the sum of products and compare with discount amount of 15percentage amount
    let sumOfProducts = 0;
    checkoutpage
      .getEachProductPrice()
      .each(($e1, Index, $list) => {
        const priceValue = $e1.text();
        const numericPrice = parseFloat(priceValue.replace("£", ""));
        sumOfProducts = parseFloat(sumOfProducts) + numericPrice;
        console.log("sumOfProducts", sumOfProducts);
      })
      .then(() => {
        let discountAmountOf15perc = parseFloat((sumOfProducts * 15) / 100);
        console.log("after sumOfProducts ", sumOfProducts);
        console.log("discount amount", discountAmountOf15perc);
        checkoutpage.getDiscountPrice().then(($ele) => {
          const discontPriceText = $ele.text();
          console.log("DiscountPriceText", discontPriceText);
          expect(discontPriceText).to.contain(discountAmountOf15perc);
        });
      });

    // Remove the Promocode from the cart
    checkoutpage.getRemoveCodeButton().click();

    // Remove the product from the cart
    checkoutpage.getCartEditButton().click();
    checkoutpage.getremoveProductButton().each(($el, Index) => {
      cy.wrap($el[Index]).click();
    });
  });
});
