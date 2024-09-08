export default class CatalogsPage {
  // Method to select the All clothing Menu
  selectAllClothingMenu() {
    return cy.get(".womens-menu > [role='menuitem']").first();
  }
  // Method to select the Category under All clothing Menu
  selectCategory() {
    let categoryItem = 'a.b-menu_item-link.m-regular';
    return cy.get(categoryItem);
  }
}
