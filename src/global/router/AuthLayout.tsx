import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === AppRoutes.AUTH_LOG_IN.path ||
    location.pathname.startsWith(AppRoutes.AUTH_SEND_PASSWORD_RESET.path) ||
    location.pathname.startsWith(AppRoutes.AUTH_SENT_PASSWORD_RESET.path) ||
    location.pathname.startsWith(AppRoutes.AUTH_PASSWORD_RESET.path);

  if (authed) {
    return <Navigate to={AppRoutes.AUTHED_MAIN_PAGE.path} replace />;
  }

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
    </>
  );
};
