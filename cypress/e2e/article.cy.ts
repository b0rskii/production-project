import { RoutePath } from 'src/6_shared/config/routing';
import { DefaultArticle } from '../support/commands/article';

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.createArticle();
    cy.visit(RoutePath.ARTICLE_DETAILS('testArticle'));
  });

  afterEach(() => {
    cy.deleteArticle();
  });

  it('Страница статьи должна отобразиться', () => {
    cy.getByTestId('ArticleDetailsHeading.Title')
      .should('exist')
      .should('have.text', DefaultArticle.title);
    cy.getByTestId('ArticleDetailsHeading.Text')
      .should('exist')
      .should('have.text', DefaultArticle.subtitle);
  });

  it('Пользователь скролит вниз страницы и появляет блок с комментариями', () => {
    cy.getByTestId('ArticleAddCommentForm').should('not.exist');
    cy.getByTestId('ArticleCommentsBlock').scrollIntoView();
    cy.getByTestId('ArticleAddCommentForm').should('exist');
  });
});
