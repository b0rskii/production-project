import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserRole, userStore } from '@/5_entities/User';
import { RoutePath } from '@/6_shared/config/routing';
import { ForbiddenPage } from './ForbiddenPage';

type RequireAuthProps = {
  children: JSX.Element;
  isAuth: boolean;
  requiredRoles?: UserRole[];
};

export const RequireAuth = observer(
  ({ children, isAuth, requiredRoles }: RequireAuthProps) => {
    const { userRoles } = userStore;

    const hasRequiredRole = useMemo(() => {
      if (!requiredRoles) {
        return true;
      }

      return requiredRoles.some((requiredRole) =>
        userRoles?.includes(requiredRole),
      );
    }, [requiredRoles, userRoles]);

    if (!isAuth) {
      return <Navigate to={RoutePath.MAIN} replace />;
    }

    if (!hasRequiredRole) {
      return <ForbiddenPage />;
    }

    return children;
  },
);
