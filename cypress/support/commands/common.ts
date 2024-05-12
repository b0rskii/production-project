import { User } from 'src/5_entities/User';
import { LocalStorageKey } from 'src/6_shared/const/localStorage';
import { getTestIdSelector } from '../helpers';

export const login = (username = 'testuser', password = '123') => {
  return cy
    .request({
      url: 'http://localhost:8000/login',
      method: 'POST',
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(LocalStorageKey.USER, JSON.stringify(body));
      return body;
    });
};

export const getByTestId = (testId: string) => {
  return cy.get(getTestIdSelector(testId));
};

declare global {
  namespace Cypress {
    interface Chainable {
      // eslint-disable-next-line no-unused-vars
      login(username?: string, password?: string): Chainable<User>;
      // eslint-disable-next-line no-unused-vars
      getByTestId(testId: string): ReturnType<typeof cy.get>;
    }
  }
}
