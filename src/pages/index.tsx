import { Suspense } from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { RoutePath } from 'shared/config/routing';
import { AboutPage } from './AboutPage';
import { MainPage } from './MainPage';

export const routes: RouteProps[] = [
  {
    path: RoutePath.MAIN,
    element: <MainPage />
  },
  {
    path: RoutePath.ABOUT,
    element: <AboutPage />
  }
];

export const Routing = () => {
  return (
    <div className='page-wrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({path, element}) => (
            <Route path={path} element={element} key={path} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};
