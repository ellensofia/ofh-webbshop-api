/// <reference types="cypress" />
import { CartItem, Product, products } from '../../data';

// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface DisplayOpt {
      element?: JQuery<Element>;
      description?: boolean;
      buyButton?: boolean;
      id?: boolean;
      product?: Omit<ProductOpt, 'clear' | 'defaults'>;
    }

    interface ProductOpt {
      title?: string;
      description?: string;
      price?: string;
      image?: string;
      defaults?: boolean;
      clear?: boolean;
    }

    interface CustomerOpt {
      name?: string;
      address?: string;
      zipcode?: string;
      city?: string;
      email?: string;
      phone?: string;
      defaults?: boolean;
      clear?: boolean;
    }

    interface Chainable {
      assertLayoutHasHeaderMainFooter(): Chainable<void>;
      addCustomerDetails(options?: CustomerOpt): Chainable<void>;
      shouldDisplayCustomerDetails(): Chainable<void>;
      checkOrderDetails(): Chainable<void>;
      goToProductDetails(index: number): Chainable<void>;
      ensureNoHorizontalScroll(): Chainable<void>;
      displaysProduct(idOrTitle: string, options?: DisplayOpt): Chainable<void>;
      displaysCartItem(element: JQuery<Element>, index: number): Chainable<void>;
      shouldDisplayCartPrice(): Chainable<void>;
      displaysAllProducts(options?: DisplayOpt): Chainable<void>;
      changeQuantity(direction: 'increase' | 'decrease', to: number): Chainable<void>;
      dencreaseQuantity(to: number): Chainable<void>;
      addProductToCart(firstOrLast: 'first' | 'last'): Chainable<void>;
      assertProductWasAdded(
        firstOrLast: 'first' | 'last',
        headerCount: number,
        productCount: number
      ): Chainable<void>;
      addOrEditProduct(options?: ProductOpt): Chainable<void>;
      getForm(dataId: string): Chainable;
      getInput(formId: string, dataId: string): Chainable;
      shouldDisplayError(errorId: string, formId: string): Chainable;
      shouldNotDisplayError(errorId: string, formId: string): Chainable;
      removeProduct(): Chainable<void>;
      // editProduct(): Chainable<void>
    }
  }
}

Cypress.Commands.add('changeQuantity', (direction, to) => {
  cy.get('[data-cy="cart-item"]').each(($element, index) => {
    cy.wrap($element).find(`[data-cy="${direction}-quantity-button"]`).click();
    if (to === 0) {
      cy.wrap($element).should('not.exist');
      return;
    }

    cy.wrap($element).find('[data-cy="product-quantity"]').should('contain.value', to);
    cy.wrap($element)
      .find('[data-cy="product-price"]')
      .invoke('text')
      .then((text) => {
        const cartItem = getCartItems()[index];
        expect(text).to.match(validPriceFormats(cartItem.price * cartItem.quantity));
      });
  });
});

Cypress.Commands.add('shouldDisplayCartPrice', () => {
  const totalPrice = getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  cy.get('[data-cy="total-price"]').contains(validPriceFormats(totalPrice));
});

Cypress.Commands.add('assertLayoutHasHeaderMainFooter', () => {
  cy.get('header').should('exist').should('be.visible');
  cy.get('main').should('exist').should('be.visible');
  cy.get('footer').should('exist').should('be.visible');
});

Cypress.Commands.add('goToProductDetails', (index) => {
  cy.get('[data-cy="product"]')
    .eq(index)
    .then(($card) => {
      const products = getAllProducts();
      const product = products[index];
      cy.wrap($card).click();
      cy.location('pathname').should('match', new RegExp(`^/(product|produkt)/${product.id}`));
    });
});

Cypress.Commands.add('displaysAllProducts', (options) => {
  const products = getAllProducts();
  cy.get('[data-cy="product"]')
    .should('have.lengthOf', products.length)
    .each(($card, index) => {
      if (index % 2) return; // Skip every other product for quicker tests
      // todo: tillåter inte sortering/filtrering, ok?
      const product = products[index];
      cy.displaysProduct(product.id, { ...options, element: $card });
    });
});

Cypress.Commands.add('displaysCartItem', ($element, index) => {
  const cartItem = getCartItems()[index];

  cy.wrap($element)
    .find('img')
    .should('exist')
    .should('be.visible')
    .should('have.attr', 'src', cartItem.image);
  cy.wrap($element)
    .find('[data-cy="product-title"]')
    .should('exist')
    .should('be.visible')
    .should('have.text', cartItem.title);
  cy.wrap($element)
    .find('[data-cy="product-price"]')
    .should('exist')
    .should('be.visible')
    .invoke('text')
    .should('match', validPriceFormats(cartItem.price * cartItem.quantity));
  cy.wrap($element)
    .find('[data-cy="product-quantity"]')
    .should('exist')
    .should('be.visible')
    .should('have.value', cartItem.quantity);
});

Cypress.Commands.add('displaysProduct', (idOrTitle, options) => {
  const savedProduct = getAllProducts().find((p) => p.id === idOrTitle || p.title === idOrTitle);
  if (!savedProduct) throw new Error(`Product with id or title: ${idOrTitle} does not exist...`);

  const product = { ...savedProduct, ...(options && options.product) };

  cy.get('main').then(($main) => {
    const $element = (options && options.element) || $main;
    cy.wrap($element)
      .find('img')
      .should('exist')
      // .should('be.visible')
      .should('have.attr', 'src', product.image);
    cy.wrap($element)
      .find('[data-cy="product-title"]')
      .should('exist')
      .should('be.visible')
      .should('have.text', product.title);
    cy.wrap($element)
      .find('[data-cy="product-price"]')
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('match', validPriceFormats(Number(product.price)));

    if (!options) return;

    if (options.buyButton) {
      cy.wrap($element).find('[data-cy="product-buy-button"]').should('exist').should('be.visible');
    }
    if (options.description) {
      cy.wrap($element)
        .find('[data-cy="product-description"]')
        .should('exist')
        .should('be.visible')
        .should('have.text', product.description);
    }
    if (options.id) {
      cy.wrap($element)
        .find('[data-cy="product-id"]')
        .should('exist')
        .should('be.visible')
        .should('have.text', product.id);
    }
  });
});

Cypress.Commands.add('ensureNoHorizontalScroll', () => {
  cy.window().scrollTo('right', { ensureScrollable: false }).its('scrollX').should('equal', 0);

  cy.get('body')
    .should('not.have.css', 'overflow', 'hidden')
    .should('not.have.css', 'overflow-x', 'hidden');
  cy.get('header')
    .should('not.have.css', 'overflow', 'hidden')
    .should('not.have.css', 'overflow-x', 'hidden');
  cy.get('main')
    .should('not.have.css', 'overflow', 'hidden')
    .should('not.have.css', 'overflow-x', 'hidden');
  cy.get('footer')
    .should('not.have.css', 'overflow', 'hidden')
    .should('not.have.css', 'overflow-x', 'hidden');
});

Cypress.Commands.add('assertProductWasAdded', (firstOrLast, headerCount, productCount) => {
  cy.get('[data-cy="cart-items-count-badge"]')
    .contains(headerCount)
    .then(() => {
      const text = /(har lagts till)|(has been added)/i;
      cy.get('[data-cy="added-to-cart-toast"]').invoke('text').should('match', text);

      const products = getAllProducts();
      const product = firstOrLast === 'first' ? products[0] : products[products.length - 1];
      const cartProducts = getCartItems();
      const cartProduct = cartProducts[productCount - 1];

      expect(cartProducts.length).to.equal(productCount);
      expect(cartProduct.title).to.equal(product.title);
      expect(cartProduct.price).to.equal(product.price);
    });
});

Cypress.Commands.add('addProductToCart', (firstOrLast) => {
  if (firstOrLast === 'first') {
    cy.get('[data-cy="product-buy-button"]').first().click();
  } else {
    cy.get('[data-cy="product-buy-button"]').last().click();
  }
});

function formatPrice(price: number, separator: string) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function validPriceFormats(price: number) {
  return new RegExp(`(${formatPrice(price, ',')}|${formatPrice(price, ' ')}|${price})`);
}

function getAllProducts(): Product[] {
  const lsProducts = localStorage.getItem('products');
  if (!lsProducts) return products;
  return JSON.parse(lsProducts);
}

function getCartItems(): CartItem[] {
  const lsProducts = localStorage.getItem('cart');
  if (!lsProducts) return [];
  return JSON.parse(lsProducts);
}

Cypress.Commands.add('addOrEditProduct', (options) => {
  if (!options) {
    cy.getForm('product-form').get('[type="submit"]').click();
    return;
  }

  const imgUrl = 'http://127.0.0.1:5173/cypress/support/plugga-logo.png';
  const title = options.title || (options.defaults ? 'Cypress' : '');
  const desc = options.description || (options.defaults ? 'Test...' : '');
  const price = options.price || (options.defaults ? '1000' : '');
  const image = options.image || (options.defaults ? imgUrl : '');
  const clear = options.clear;

  if (title || typeof options.title === 'string') {
    clear && cy.getInput('product-form', 'product-title').clear();
    title && cy.getInput('product-form', 'product-title').type(title);
  }
  if (desc || typeof options.description === 'string') {
    clear && cy.getInput('product-form', 'product-description').clear();
    desc && cy.getInput('product-form', 'product-description').type(desc);
  }
  if (price || typeof options.price === 'string') {
    clear && cy.getInput('product-form', 'product-price').clear();
    price && cy.getInput('product-form', 'product-price').type(price);
  }
  if (image || typeof options.image === 'string') {
    clear && cy.getInput('product-form', 'product-image').clear();
    image && cy.getInput('product-form', 'product-image').type(image);
  }
  cy.getForm('product-form').get('[type="submit"]').click();
});

Cypress.Commands.add('getForm', (dataId) => {
  return cy.get(`form[data-cy="${dataId}"]`);
});
Cypress.Commands.add('getInput', (formId: string, dataId) => {
  return cy.getForm(formId).find(`input[data-cy="${dataId}"]`);
});

Cypress.Commands.add('shouldDisplayError', (errorId, formId) => {
  return cy.getForm(formId).get(`[data-cy="${errorId}"]`).should('be.visible');
});
Cypress.Commands.add('shouldNotDisplayError', (errorId, formId) => {
  return cy.getForm(formId).get(`[data-cy="${errorId}"]`).should('not.exist');
});

Cypress.Commands.add('addCustomerDetails', (options) => {
  const name = options ? options.name || (options.defaults ? 'Tristan Fluffnos' : '') : '';
  const address = options ? options.address || (options.defaults ? 'Marsvinsgatan 2' : '') : '';
  const zipcode = options ? options.zipcode || (options.defaults ? '12345' : '') : '';
  const city = options ? options.city || (options.defaults ? 'Göteborg' : '') : '';
  const email = options ? options.email || (options.defaults ? 'tristan@marsvin.nu' : '') : '';
  const phone = options ? options.phone || (options.defaults ? '0702334455' : '') : '';
  const clear = options && options.clear;

  if (name) {
    clear
      ? cy.getInput('customer-form', 'customer-name').clear().type(name)
      : cy.getInput('customer-form', 'customer-name').type(name);
  }
  if (address) {
    clear
      ? cy.getInput('customer-form', 'customer-address').clear().type(address)
      : cy.getInput('customer-form', 'customer-address').type(address);
  }
  if (zipcode) {
    clear
      ? cy.getInput('customer-form', 'customer-zipcode').clear().type(zipcode)
      : cy.getInput('customer-form', 'customer-zipcode').type(zipcode);
  }
  if (city) {
    clear
      ? cy.getInput('customer-form', 'customer-city').clear().type(city)
      : cy.getInput('customer-form', 'customer-city').type(city);
  }
  if (email) {
    clear
      ? cy.getInput('customer-form', 'customer-email').clear().type(email)
      : cy.getInput('customer-form', 'customer-email').type(email);
  }
  if (phone) {
    clear
      ? cy.getInput('customer-form', 'customer-phone').clear().type(phone)
      : cy.getInput('customer-form', 'customer-phone').type(phone);
  }
  cy.getForm('customer-form').find('[type="submit"]').click();
});

Cypress.Commands.add('shouldDisplayCustomerDetails', () => {});

Cypress.Commands.add('checkOrderDetails', () => {
  const products = getAllProducts();
  const firstProduct = products[0];
  const lastProduct = products[products.length - 1];
  const totalPrice = [firstProduct, lastProduct].reduce((sum, item) => sum + item.price, 0);
  const cartItems = getCartItems();
  expect(cartItems).to.be.an('array').that.is.empty;

  cy.contains(firstProduct.title);
  cy.contains(lastProduct.title);
  cy.contains(validPriceFormats(firstProduct.price));
  cy.contains(validPriceFormats(lastProduct.price));
  cy.contains(validPriceFormats(totalPrice));

  cy.contains('Tristan Fluffnos');
  cy.contains('Marsvinsgatan 2');
  cy.contains('tristan@marsvin.nu');
  cy.contains('0702334455');
});

Cypress.Commands.add('removeProduct', () => {
  cy.getAllLocalStorage().then((lsBeforeRemove) => {
    cy.get('[data-cy="admin-remove-product"]').first().click();
    cy.get('[data-cy="confirm-delete-button"]').click();
    cy.getAllLocalStorage().then((lsAfterRemove) => {
      expect(lsBeforeRemove == lsAfterRemove).to.be.false;
    });
    cy.displaysAllProducts({ id: true });
  });
});

export { };

