import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@modules/Auth/Footer';
import { Header } from '@modules/Header';

import { AppRoutes, UsageScopes } from './routes.constants';

const isUsageScope = (scope: string[]): boolean => {
  return scope.includes(UsageScopes.AUTH);
};

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  const location = useLocation();

  const currentRoute = Object.values(AppRoutes).find((route) => location.pathname.startsWith(route.path));

  const isAuthPage = currentRoute && isUsageScope(currentRoute.usageScope);

  if (authed) {
    return <Navigate to={AppRoutes.AUTHED_MAIN_PAGE.path} replace />;
  }

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
};
