import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UserRole, userSelectors } from '5_entities/User';
import { RoutePath } from '../routing';

type RequireAuthProps = {
  children: JSX.Element;
  isAuth: boolean;
  requiredRoles?: UserRole[];
};

export const RequireAuth = ({ children, isAuth, requiredRoles }: RequireAuthProps) => {
  const userRoles = useSelector(userSelectors.getUserRoles);

  const hasRequireRole = useMemo(() => {
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((requiredRole) => userRoles?.includes(requiredRole));
  }, [requiredRoles, userRoles]);

  if (!isAuth || !hasRequireRole) {
    return (
      <Navigate to={RoutePath.MAIN()} replace />
    );
  }

  return children;
};
