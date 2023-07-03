import { Navigate } from 'react-router-dom';
import { RoutePath } from '../routing';

type RequireAuthProps = {
  isAuth: boolean;
  children: JSX.Element;
};

export const RequireAuth = ({ isAuth, children }: RequireAuthProps) => {
  if (!isAuth) {
    return (
      <Navigate to={RoutePath.MAIN()} replace />
    );
  }

  return children;
};
