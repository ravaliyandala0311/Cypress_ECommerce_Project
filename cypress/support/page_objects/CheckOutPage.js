export default class CheckOutPage {
  // Method to click on Check Out Button
  clickCheckOutButton() {
    return cy
      .get("[href='https://www.boohoo.com/checkout-login']")
      .click({ force: true });
  }
  // Method to enter the promocode
  enterPromoCode(promoCode) {
    return cy.get('#dwfrm_coupon_couponCode').type(promoCode);
  }
  // Method to click on ApplyButton
  clickApplyButton() {
    return cy.get("[data-id='submitButton']").click();
  }
  // Method to verify promocode Successmessage
  verifyPromoCodeSuccessMessage() {
    return cy.get('.b-coupon-status');
  }
  // Method to get the total value
  orderTotalValue() {
    return cy.get('.m-total > .b-summary_table-value').should('be.visible');
  }
  // Method to get each product price
  getEachProductPrice() {
    return cy
      .get('.b-minicart_product-price_total > .b-price > .b-price-item')
      .should('be.visible');
  }
  // Method to get discount price
  getDiscountPrice() {
    return cy.get('.b-coupon-footer > :nth-child(1)').should('be.visible');
  }
  // Method to click on removePromocode Button
  clickRemoveCodeButton() {
    return cy
      .get('.b-coupon-actions > .b-coupon-button')
      .should('be.visible')
      .click();
  }
  // Method to click on Edit Button
  clickCartEditButton() {
    return cy
      .get("[aria-label='Edit products in shopping cart']")
      .should('be.visible')
      .click();
  }
  // Method to remove the products from cart
  getRemoveProductButton() {
    return cy.get('.b-cart_product-remove').should('be.visible');
  }
}
