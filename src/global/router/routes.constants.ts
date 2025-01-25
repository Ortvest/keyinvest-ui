export const AppRoutes = {
    AUTH: { path: "/auth", isVisible: false, title: "Auth" },
    AUTH_LOG_IN: { path: "login",  isVisible: false, title: "Auth" },
    AUTH_SEND_PASSWORD_RESET: {
        path: "/auth/password-reset",
        isVisible: false,
    },
    AUTH_SENT_PASSWORD_RESET: {
        path: "/auth/password-reset-sent/:email",
        isVisible: false,
    },
    AUTH_PASSWORD_RESET: {
        path: "/auth/password-reset/:token",
        isVisible: false,
    },
    MAIN: {
        path: "/",
        isVisible: false,
    },
};

export type AppRoute = { path: string; isVisible: boolean, title: string };
