import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  return authed ? <Navigate to={AppRoutes.MAIN.path} replace /> : <Outlet />;
};
