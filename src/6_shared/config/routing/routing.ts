export const RoutePath = {
  MAIN: () => '/',
  ABOUT: () => '/about',
  PROFILE: (id: string) => `/profiles/${id}`,
  ARTICLES: () => '/articles',
  ARTICLE_DETAILS: (id: string) => `/articles/${id}`,
  CREATE_ARTICLE: () => '/articles/new',
  EDIT_ARTICLE: (id: string) => `/articles/${id}/edit`,
  NOT_FOUNT: () => '*',
};
