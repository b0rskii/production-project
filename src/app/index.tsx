import { Suspense } from 'react';
import { Routing } from 'pages';
import { useTheme } from 'shared/utils/theme';
import { getClassNames } from 'shared/utils/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={getClassNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="page-content">
          <Sidebar />
          <Routing />
        </div>
      </Suspense>
    </div>
  );
};
