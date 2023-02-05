import { RouteProps } from 'react-router-dom';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

export enum RouteName {
  MAIN = 'MAIN',
  ABOUT = 'ABOUT',
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: 'about',
};

export const routesConfig: RouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPage />
  },
  {
    path: RoutePath.ABOUT,
    element: <AboutPage />
  },
];
