import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  const location = useLocation();

  const isSignInPage = location.pathname === AppRoutes.AUTH_LOG_IN.path;

  return authed ? (
    <Navigate to={AppRoutes.MAIN.path} replace />
  ) : (
    <>
      {!isSignInPage && <Header />}
      <Outlet />
    </>
  );
};
