import {AppRoute, AppRoutes} from "@global/router/routes.constants.ts";
import {useMemo} from "react";
import {Link} from "react-router-dom";

import './styles/styles.css'
import classNames from "classnames";

export const AppNavigation = () => {
    const headerRoutes: AppRoute[] = useMemo(() => Object.values(AppRoutes).filter((route: AppRoute) => route.title === AppRoutes.SUPPORT.title || route.title === AppRoutes.PRICING.title || route.title === AppRoutes.ABOUT.title), [])

    return (
        <nav className={classNames("app-navigation-wrapper")}>
            {
                headerRoutes.map((route: AppRoute) => (
                    <Link className={classNames("app-navigation-link")} to={route.path} key={route.path}>{route.title}</Link>
                ))
            }
        </nav>
    )
}