import { Routes, Route, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { MainPageLazy } from './pages/MainPage/MainPage.lazy';
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy';
import { useTheme } from './theme/useTheme';
import './styles/index.scss';

enum AppRoute {
  MAIN = '/',
  ABOUT = '/about',
}

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>ToggleTheme</button>
      <Link to={AppRoute.MAIN}>Main</Link>
      <Link to={AppRoute.ABOUT}>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainPageLazy />} />
          <Route path={AppRoute.ABOUT} element={<AboutPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
