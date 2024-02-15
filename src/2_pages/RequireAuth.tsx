import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ForbiddenPage } from './ForbiddenPage';
import { UserRole, userSelectors } from '@/5_entities/User';
import { RoutePath } from '@/6_shared/config/routing';

type RequireAuthProps = {
  children: JSX.Element;
  isAuth: boolean;
  requiredRoles?: UserRole[];
};

export const RequireAuth = ({ children, isAuth, requiredRoles }: RequireAuthProps) => {
  const userRoles = useSelector(userSelectors.getUserRoles);

  const hasRequiredRole = useMemo(() => {
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((requiredRole) => userRoles?.includes(requiredRole));
  }, [requiredRoles, userRoles]);

  if (!isAuth) {
    return (
      <Navigate to={RoutePath.MAIN} replace />
    );
  }

  if (!hasRequiredRole) {
    return (
      <ForbiddenPage />
    );
  }

  return children;
};
