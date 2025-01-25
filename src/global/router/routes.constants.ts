export const AppRoutes = {
    AUTH: { path: "/auth", isVisible: false, title: "Auth" },
    AUTH_LOG_IN: { path: "login", isVisible: false, title: "Auth" },
    AUTH_SEND_PASSWORD_RESET: {
        path: "/auth/password-reset",
        isVisible: false,
        title: "Auth",
    },
    AUTH_SENT_PASSWORD_RESET: {
        path: "/auth/password-reset-sent/:email",
        isVisible: false,
        title: "Auth",
    },
    AUTH_PASSWORD_RESET: {
        path: "/auth/password-reset/:token",
        isVisible: false,
        title: "Auth",
    },
    MAIN: {
        path: "/",
        isVisible: false,
        title: "Main",
    },
    ABOUT: {
        path: "/about",
        isVisible: true,
        title: "About",
    },
    PRICING: {
        path: "/pricing",
        isVisible: true,
        title: "Pricing",
    },
    SUPPORT: {
        path: "/support",
        isVisible: true,
        title: "Support",
    },

    AUTHED_EXAMPLE_PAGE: {
        path: "/authed-example-page",
        isVisible: true,
        title: "",
    }
};


export type AppRoute = { path: string; isVisible: boolean, title: string };
