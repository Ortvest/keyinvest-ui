import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '@modules/Brief/shared/Sidebar';

import './styles/styles.css';

export const SystemLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (!authed) {
    //   return <Navigate to={AppRoutes.AUTH_LOG_IN.path} replace />;
  }

  return (
    <>
      <Sidebar />
      <main>
        <div className={classNames('system-layout-wrapper')}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
