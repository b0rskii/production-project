import { memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { userSelectors } from 'entities/User';
import { RequireAuth, RoutePath } from 'shared/config/routing';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';
import { ProfilePage } from './ProfilePage';
import { ArticlesPage } from './ArticlesPage';
import { ArticleDetailsPage } from './ArticleDetailsPage';
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
    path: `${RoutePath.PROFILES}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  {
    path: RoutePath.ARTICLES,
    element: <ArticlesPage />,
    authOnly: true,
  },
  {
    path: `${RoutePath.ARTICLE_DETAILS}:id`,
    element: <ArticleDetailsPage />,
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
