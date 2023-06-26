import { Suspense } from 'react';
import { Routing } from '2_pages';
import { Navbar } from '3_widgets/Navbar';
import { Sidebar } from '3_widgets/Sidebar';
import { useInitUserData } from '5_entities/User';
import { getClassNames } from '6_shared/utils/classNames';
import { NotificationsContainer } from '6_shared/utils/notifications';

export const App = () => {
  useInitUserData();

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
