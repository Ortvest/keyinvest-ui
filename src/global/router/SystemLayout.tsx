import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import './styles/styles.css'

export const SystemLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  // if (!authed) {
  //   return <Navigate to={AppRoutes.AUTH_LOG_IN.path} replace />;
  // }

  return (
    <>
      <main>
        <div className={classNames('system-layout-wrapper')}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
