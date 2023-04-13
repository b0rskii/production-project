import { memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { RequireAuth, RoutePath } from 'shared/config/routing';
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
  const isAuthChecked = useSelector(userSelectors.getIsInited);
  const isAuth = useSelector(userSelectors.getUserAuthData);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <Routes>
      {routes.map((route) => {
        const element = (
          <div className="page-wrapper">
            <Suspense fallback={<PageLoader />}>
              {route.element}
            </Suspense>
          </div>
        );

        return (
          <Route
            path={route.path}
            element={
              route.authOnly
                ? <RequireAuth isAuth={Boolean(isAuth)}>{element}</RequireAuth>
                : element
            }
            key={route.path}
          />
        );
      })}
    </Routes>
  );
});
