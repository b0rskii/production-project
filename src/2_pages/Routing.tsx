import { Suspense } from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageLoader } from '@/3_widgets/PageLoader';
import { UserRole, userStore } from '@/5_entities/User';
import { RoutePath } from '@/6_shared/config/routing';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';
import { ProfilePage } from './ProfilePage';
import { ArticlesPage } from './ArticlesPage';
import { ArticleDetailsPage } from './ArticleDetailsPage';
import { ArticleEditPage } from './ArticleEditPage';
import { AdminPanelPage } from './AdminPanelPage';
import { NotFoundPage } from './NotFoundPage';
import { RequireAuth } from './RequireAuth';

type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
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
    path: RoutePath.PROFILE(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  {
    path: RoutePath.ARTICLES,
    element: <ArticlesPage />,
    authOnly: true,
  },
  {
    path: RoutePath.ARTICLE_DETAILS(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  {
    path: RoutePath.EDIT_ARTICLE(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  {
    path: RoutePath.CREATE_ARTICLE,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  {
    path: RoutePath.ADMIN_PANEL,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: ['ADMIN', 'MANAGER'],
  },
  {
    path: RoutePath.NOT_FOUNT,
    element: <NotFoundPage />,
  },
];

export const Routing = observer(() => {
  const { authData, isInited } = userStore;

  if (!isInited) {
    return null;
  }

  return (
    <Routes>
      {routes.map((route) => {
        const element = (
          <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
          <Route
            path={route.path}
            element={
              route.authOnly ? (
                <RequireAuth
                  isAuth={Boolean(authData)}
                  requiredRoles={route.roles}
                >
                  {element}
                </RequireAuth>
              ) : (
                element
              )
            }
            key={route.path}
          />
        );
      })}
    </Routes>
  );
});
