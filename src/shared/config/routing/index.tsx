export enum RouteName {
  MAIN = 'MAIN',
  ABOUT = 'ABOUT',
  NOT_FOUNT = 'NOT_FOUNT',
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: 'about',
  [RouteName.NOT_FOUNT]: '*',
};
