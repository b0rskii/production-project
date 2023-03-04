import { Suspense, useEffect } from 'react';
import { Routing } from 'pages';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch } from 'shared/utils/redux';
import { LocalStorageKey } from 'shared/const/localStorage';
import { userActions } from 'entities/User';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setAuthData(
      JSON.parse(localStorage.getItem(LocalStorageKey.USER)) || null,
    ));
  }, [dispatch]);

  return (
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
};
