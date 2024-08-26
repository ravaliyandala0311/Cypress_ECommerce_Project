export default class CatalogsPage {
  selectAllClothingMenu() {
    return cy.xpath("//a[contains(text(),'ALL CLOTHING')]").should("be.visible");
  }
  selectCategory(categoryName) {
    let categoryItem = `//a[@class='b-menu_item-link m-regular'][normalize-space()='${categoryName}']`;
    return cy.xpath(categoryItem);
  }
}
