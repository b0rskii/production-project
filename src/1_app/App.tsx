import { Suspense, useEffect } from 'react';
import { Routing } from '2_pages';
import { Navbar } from '3_widgets/Navbar';
import { Sidebar } from '3_widgets/Sidebar';
import { userActions } from '5_entities/User';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch } from '6_shared/utils/redux';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { NotificationsContainer } from '6_shared/utils/notifications';

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
