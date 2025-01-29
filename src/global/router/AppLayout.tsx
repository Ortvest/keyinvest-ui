import classNames from 'classnames';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = (): JSX.Element => (
  <main>
    <div className={classNames('layout-wrapper')}>
      <Outlet />
    </div>
  </main>
);

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  return authed ? <Layout /> : <Navigate to={'/auth/login'} replace />;
};
