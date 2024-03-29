import { RoutePath } from 'src/6_shared/config/routing';
import { getTestIdSelector } from '../support/helpers';

describe('Роутинг', () => {
  it('Должна открыться Главная', () => {
    cy.visit(RoutePath.MAIN);
    cy.get(getTestIdSelector('MainPage')).should('exist');
  });

  it('При попытке перейти на несуществующий роут должен произойти редирект на страницу 404', () => {
    cy.visit('/greghrthrtghrthtr');
    cy.get(getTestIdSelector('NotFoundPage')).should('exist');
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('При попытке зайти на auth only страницу она должна отобразиться', () => {
      cy.visit(RoutePath.CREATE_ARTICLE);
      cy.get(getTestIdSelector('ArticleEditPage')).should('exist');
    });
  });

  describe('Пользователь не авторизован', () => {
    it('При попытке зайти на auth only страницу должен произойти редирект на Главную', () => {
      cy.visit(RoutePath.ARTICLES);
      cy.get(getTestIdSelector('MainPage')).should('exist');
    });
  });
});
