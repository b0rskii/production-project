import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { RoutePath } from 'shared/config/routing';
import { PageLoader } from 'widgets/PageLoader';
import { userSelectors } from 'entities/User';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';
import { ProfilePage } from './ProfilePage';
import { NotFoundPage } from './NotFoundPage';

type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export const routes: AppRouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
  {
    path: RoutePath.ABOUT,
    element: <AboutPage />,
  },
  {
    path: RoutePath.PROFILE,
    element: <ProfilePage />,
    authOnly: true,
  },
  {
    path: RoutePath.NOT_FOUNT,
    element: <NotFoundPage />,
  },
];

export const Routing = memo(() => {
  const isAuth = useSelector(userSelectors.getUserAuthData);

  const filtredRoutes = useMemo(() => routes.filter((route) => {
    if (!isAuth && route.authOnly) {
      return false;
    }

    return true;
  }), [isAuth]);

  return (
    <div className="page-wrapper">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {filtredRoutes.map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
});
