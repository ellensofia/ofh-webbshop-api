/// <reference types="cypress" />

beforeEach(() => {
  cy.clearLocalStorage();
  cy.visit('/');
});

it('should be possible to go to the checkout page by clicking on the cart icon', () => {
  cy.viewport('samsung-s10');
  cy.get('[data-cy="cart-link"]').click();
  cy.location('pathname').should('match', new RegExp(`^/(checkout|kassa)$`));
  cy.go('back');
  cy.viewport('ipad-2');
  cy.get('[data-cy="cart-link"]').click();
  cy.location('pathname').should('match', new RegExp(`^/(checkout|kassa)$`));
  cy.go('back');
  cy.viewport('macbook-15');
  cy.get('[data-cy="cart-link"]').click();
  cy.location('pathname').should('match', new RegExp(`^/(checkout|kassa)$`));
  cy.go('back');
});

it('should have a layout with a header, main and footer element', () => {
  cy.get('[data-cy="cart-link"]').click();
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

it('should be possible to view added products in the cart', () => {
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').first().click();
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').eq(2).click().click();
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').last().click();

  cy.get('[data-cy="cart-link"]').click();

  cy.get('[data-cy="cart-item"]').should('have.length', 3);
  cy.viewport('samsung-s10');
  cy.get('[data-cy="cart-item"]').each(($item, index) => cy.displaysCartItem($item, index));
  cy.ensureNoHorizontalScroll();
  cy.viewport('ipad-2');
  cy.get('[data-cy="cart-item"]').each(($item, index) => cy.displaysCartItem($item, index));
  cy.ensureNoHorizontalScroll();
  cy.viewport('macbook-15');
  cy.get('[data-cy="cart-item"]').each(($item, index) => cy.displaysCartItem($item, index));
  cy.ensureNoHorizontalScroll();
});

it('should be possible to view the total price of the cart', () => {
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').first().click().click();
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').eq(3).click();
  cy.get('[data-cy="cart-link"]').click();

  cy.viewport('samsung-s10');
  cy.shouldDisplayCartPrice();
  cy.viewport('ipad-2');
  cy.shouldDisplayCartPrice();
  cy.viewport('macbook-15');
  cy.shouldDisplayCartPrice();
});

it('should be possible change product quantity in the cart', () => {
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').first().click();
  cy.get('[data-cy="product"]').find('[data-cy="product-buy-button"]').eq(4).click();
  cy.get('[data-cy="cart-link"]').click();

  cy.viewport('samsung-s10');
  cy.changeQuantity('increase', 2);
  cy.viewport('ipad-2');
  cy.changeQuantity('decrease', 1);
  cy.viewport('macbook-15');
  cy.changeQuantity('decrease', 0); // todo: fixa så det fungerar
});
