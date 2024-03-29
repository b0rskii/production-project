import { LocalStorageKey } from 'src/6_shared/const/localStorage';

Cypress.Commands.add('login', (username = 'testuser', password = '123') => {
  cy.request({
    url: 'http://localhost:8000/login',
    method: 'POST',
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(LocalStorageKey.USER, JSON.stringify(body));
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      // eslint-disable-next-line no-unused-vars
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
