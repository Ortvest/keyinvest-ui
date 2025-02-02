import classNames from 'classnames';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

const Layout = (): JSX.Element => {
  const location = useLocation();
  const isSignInPage = location.pathname === AppRoutes.AUTH_LOG_IN.path;

  return (
    <main>
      {!isSignInPage && <Header />}
      <div className={classNames('layout-wrapper')}>
        <Outlet />
      </div>
    </main>
  );
};

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  return authed ? <Layout /> : <Navigate to={AppRoutes.AUTH_LOG_IN.path} replace />;
};
