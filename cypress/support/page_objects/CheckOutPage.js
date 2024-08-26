export default class CheckOutPage {
  clickCheckOutButton() {
    cy.xpath("//a[normalize-space()='Checkout']").click();
  }

  typePromoCode() {
    return cy.xpath("//input[@id='dwfrm_coupon_couponCode']").should("be.visible");
  }

  ClickApplyButton() {
    cy.xpath("//button[@type='submit'][normalize-space()='Apply']").click();
  }
  verifyPromoCodeSuccessMessage() {
    return cy.xpath("//span[@class='b-coupon-status m-applied']");
  }

  orderTotalValue() {
    return cy.xpath("//td[@class='b-summary_table-value m-top_align']").should("be.visible");
  }
  getEachProductPrice() {
    return cy.xpath("//div[@class='b-price-item m-new']").should("be.visible");
  }
  getDiscountPrice() {
    return cy.xpath("//div[@data-ref='couponSummary']/p[1]").should("be.visible");
  }
  getRemoveCodeButton() {
    return cy.xpath("//button[normalize-space()='Remove code']").should("be.visible");
  }
  getCartEditButton() {
    return cy.xpath("//a[normalize-space()='Edit']").should("be.visible");
  }
  getremoveProductButton() {
    return cy.xpath("(//button[@class='b-cart_product-remove'])").should("be.visible");
  }
}
