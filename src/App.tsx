import { Routes, Route, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { MainPageLazy } from './pages/MainPage/MainPage.lazy';
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy';
import './index.scss';

function App() {
  return (
    <div className='app'>
      <Link to='/'>Main</Link>
      <Link to='/about'>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<MainPageLazy />} />
          <Route path='/about' element={<AboutPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
