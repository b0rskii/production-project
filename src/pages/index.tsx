import { Suspense } from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { RoutePath } from 'shared/config/routing';
import { PageLoader } from 'widgets/PageLoader';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';
import { NotFoundPage } from './NotFoundPage';

export const routes: RouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
  {
    path: RoutePath.ABOUT,
    element: <AboutPage />,
  },
  {
    path: RoutePath.NOT_FOUNT,
    element: <NotFoundPage />,
  },
];

export const Routing = () => (
  <div className="page-wrapper">
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))}
      </Routes>
    </Suspense>
  </div>
);
