export default class ProductsPage {
  seletProductSize() {
    cy.get(
      "#variation-swatch-button-1-16 > .b-variation_swatch-value > .b-variation_swatch-value_text"
    )
      .invoke("show")
      .click({ force: true });
  }
  clickAddToCart() {
    return cy
      .xpath(
        "//div[@class='b-product_actions-inner']//button[@class='b-product_addtocard b-button m-width_full ']"
      )
      .click();
  }

  selectProduct(ProductName) {
    cy.get(".b-product_tile-title").each(($ele, index, $list) => {
      if ($ele.text().includes(ProductName)) {
        cy.get(".b-product_tile-title").eq(index).click();
      }
    });
  }
  selectSortButton() {
    return cy.xpath(" //select[@id='plp-sort-desktop']");
  }
  selectProductsPrice() {
    return cy.xpath("//span[@class='b-price-item m-new']");
  }
}
