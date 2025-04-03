import classNames from 'classnames';
import { Navigate, Outlet } from 'react-router-dom';

import { Footer } from '@modules/Auth/Footer';
import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (!authed) {
    return <Navigate to={AppRoutes.AUTH_LOG_IN.path} replace />;
  }

  return (
    <>
      <Header />
      <main>
        <div className={classNames('layout-wrapper')}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
