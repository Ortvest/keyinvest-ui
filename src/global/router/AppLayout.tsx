import { Navigate, Outlet } from "react-router-dom";

import classNames from 'classnames';

import './styles/styles.css'

const Layout = () => (
    <main>
        <div className={classNames("layout-wrapper")}>
            <Outlet />
        </div>
    </main>
);

export const AppLayout = ({ authed }: { authed: boolean }) => {

    return authed ? <Layout /> : <Navigate to={'/auth/login'} replace/>
};