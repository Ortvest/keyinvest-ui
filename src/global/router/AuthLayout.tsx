import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  const location = useLocation();
  const isAuthPage = location.pathname === AppRoutes.AUTH_LOG_IN.path;
  const isRegisterPage = location.pathname === AppRoutes.AUTH_REGISTER.path;

  if (authed) {
    return <Navigate to={AppRoutes.AUTHED_MAIN_PAGE.path} replace />;
  }

  return (
    <>
      {!isAuthPage && !isRegisterPage && <Header />}
      <Outlet />
    </>
  );
};
