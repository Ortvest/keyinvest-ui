import { useMemo } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constants';

import './styles/styles.css';

export const Navigation = (): JSX.Element => {
  const headerRoutes: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.LANDING) && route.isVisible
      ),
    []
  );

  return (
    <nav className={classNames('navigation-wrapper')}>
      {headerRoutes.map((route: AppRoute) => (
        <Link className={classNames('navigation-link')} to={route.path} key={route.path}>
          {route.title}
        </Link>
      ))}
    </nav>
  );
};
