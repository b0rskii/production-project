import { Suspense, useEffect } from 'react';
import { Routing } from 'pages';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { userActions } from 'entities/User';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch } from 'shared/utils/redux';
import { LocalStorageKey } from 'shared/const/localStorage';
import { NotificationsContainer } from 'shared/utils/notifications';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userLocalData = localStorage.getItem(LocalStorageKey.USER);

    if (userLocalData) {
      dispatch(userActions.setAuthData(
        JSON.parse(userLocalData),
      ));
    }

    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={getClassNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />
        <div className="page-content">
          <Sidebar />
          <Routing />
        </div>
        <NotificationsContainer />
      </Suspense>
    </div>
  );
};
