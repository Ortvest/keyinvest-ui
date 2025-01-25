import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./AppLayout";
import { AuthLayout } from "./AuthLayout";
import { AppRoutes } from "./routes.constants";

export const router = (authed: boolean) =>
    createBrowserRouter([
        {
            path: AppRoutes.AUTH.path,
            element: <AuthLayout authed={authed} />,
            children: [
                {
                    path: AppRoutes.AUTH_LOG_IN.path,
                    element: null,
                },
                {
                    path: AppRoutes.AUTH_SEND_PASSWORD_RESET.path,
                    element: null,
                },
                {
                    path: AppRoutes.AUTH_SENT_PASSWORD_RESET.path,
                    element: null,
                },
                {
                    path: AppRoutes.AUTH_PASSWORD_RESET.path,
                    element: null,
                },
            ],
        },
        {
            path: "/",
            element: <AppLayout authed={authed} />,
            children: [
                {
                    path: AppRoutes.MAIN.path,
                    element: null,
                },
            ],
        },
        {
            path: "*",
            element: null, // login page
        },
    ]);
