import { Routes, Route, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { useTheme } from 'shared/utils/theme';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import './styles/index.scss';

enum AppRoute {
  MAIN = '/',
  ABOUT = '/about',
}

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={getClassNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>ToggleTheme</button>
      <Link to={AppRoute.MAIN}>Main</Link>
      <Link to={AppRoute.ABOUT}>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainPage />} />
          <Route path={AppRoute.ABOUT} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
