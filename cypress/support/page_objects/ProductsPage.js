export default class ProductsPage {
  // Method to select the dress size
  seletDressSize() {
    return cy
      .get('#variation-swatch-button-1-24')
      .invoke('show')
      .click({ force: true });
  }
  // Method to click on AddToCart
  clickAddToCart() {
    return cy.get('.b-product_actions-inner > .b-product_addtocard').click();
  }
  // Method to select the dress
  selectDress(DressName) {
    return cy.get('.b-product_tile-title').each(($ele, index, $list) => {
      if ($ele.text().includes(DressName)) {
        cy.get('.b-product_tile-title').eq(index).click();
      }
    });
  }
  // Method to select the sort button
  selectSortButton() {
    return cy.get('#plp-sort-desktop');
  }
  // Method to select the products Price
  selectProductsPrice() {
    return cy.get('.b-price  > .m-new');
  }
}
