export enum RouteName {
  MAIN = 'MAIN',
  ABOUT = 'ABOUT',
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: 'about',
};
