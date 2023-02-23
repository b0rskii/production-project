import { Suspense } from 'react';
import { Routing } from 'pages';
import { getClassNames } from 'shared/utils/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

export const App = () => (
  <div className={getClassNames('app', {}, [])}>
    <Suspense fallback="">
      <Navbar />
      <div className="page-content">
        <Sidebar />
        <Routing />
      </div>
    </Suspense>
  </div>
);
