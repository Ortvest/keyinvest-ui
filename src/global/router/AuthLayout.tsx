import { Navigate, Outlet } from "react-router-dom";

import {AppRoutes} from "./routes.constants.ts";

import './styles/styles.css'

export const AuthLayout = ({ authed }: { authed: boolean }) => {


    return authed ? <Navigate to={AppRoutes.MAIN.path} replace /> : <Outlet />;
};