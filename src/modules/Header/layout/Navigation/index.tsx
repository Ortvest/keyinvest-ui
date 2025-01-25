import {AppRoute, AppRoutes, UsageScopes} from "@global/router/routes.constants.ts";
import {useMemo} from "react";
import {Link} from "react-router-dom";

import './styles/styles.css'
import classNames from "classnames";

export const Navigation = () => {

    const headerRoutes: AppRoute[] = useMemo(() => Object.values(AppRoutes).filter((route: AppRoute) => route.usageScope.includes(UsageScopes.LANDING) && route.isVisible), [])

    return (
        <nav className={classNames("navigation-wrapper")}>
            {
                headerRoutes.map((route: AppRoute) => (
                    <Link className={classNames("navigation-link")} to={route.path} key={route.path}>{route.title}</Link>
                ))
            }
        </nav>
    )
}