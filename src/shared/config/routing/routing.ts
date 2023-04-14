export enum RouteName {
  MAIN = 'MAIN',
  ABOUT = 'ABOUT',
  PROFILE = 'PROFILE',
  ARTICLES = 'ARTICLES',
  ARTICLE_DETAILS = 'ARTICLE_DETAILS',
  NOT_FOUNT = 'NOT_FOUNT',
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
  [RouteName.PROFILE]: '/profile',
  [RouteName.ARTICLES]: '/articles',
  [RouteName.ARTICLE_DETAILS]: '/articles/',
  [RouteName.NOT_FOUNT]: '*',
};
