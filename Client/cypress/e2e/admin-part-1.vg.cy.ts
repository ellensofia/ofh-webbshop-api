/// <reference types="cypress" />

beforeEach(() => {
  cy.clearLocalStorage();
  cy.visit('/admin');
});

// Det finns en adminsida för produkthantering
it('should be possible to go to admin site via link', () => {
  cy.visit('/');
  cy.get('[data-cy="admin-link"]').click();
  cy.location('pathname').should('equal', '/admin');
});

it('should have a layout with a header, main and footer element', () => {
  cy.viewport('samsung-s10');
  cy.assertLayoutHasHeaderMainFooter();
  cy.ensureNoHorizontalScroll();
  cy.viewport('ipad-2');
  cy.assertLayoutHasHeaderMainFooter();
  cy.ensureNoHorizontalScroll();
  cy.viewport('macbook-15');
  cy.assertLayoutHasHeaderMainFooter();
  cy.ensureNoHorizontalScroll();
});

// Det ska gå att se alla produkter på admin sidan
it('should be possible to view all products in admin site', () => {
  cy.viewport('samsung-s10');
  cy.displaysAllProducts({ id: true });
  cy.viewport('ipad-2');
  cy.displaysAllProducts({ id: true });
  cy.viewport('macbook-15');
  cy.displaysAllProducts({ id: true });
});

// Det går att ta bort produkter via admin sidan
it('should be possible to remove products in admin site', () => {
  cy.viewport('samsung-s10');
  cy.removeProduct();
  cy.viewport('ipad-2');
  cy.removeProduct();
  cy.viewport('macbook-15');
  cy.removeProduct();
});
