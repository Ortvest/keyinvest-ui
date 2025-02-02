export const UsageScopes = {
  AUTH: 'auth',
  LANDING: 'landing',
  SYSTEM: 'system',
} as const;

export const AppRoutes = {
  AUTH: { path: '/auth', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_LOG_IN: { path: '/auth/login', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_SEND_PASSWORD_RESET: {
    path: '/auth/password-reset',
    isVisible: false,
    title: 'Auth',
    usageScope: [UsageScopes.AUTH],
  },
  AUTH_SENT_PASSWORD_RESET: {
    path: '/auth/password-reset-sent/:email',
    isVisible: false,
    title: 'Auth',
    usageScope: [UsageScopes.AUTH],
  },
  AUTH_PASSWORD_RESET: {
    path: '/auth/password-reset/:token',
    isVisible: false,
    title: 'Auth',
    usageScope: [UsageScopes.AUTH],
  },
  MAIN: {
    path: '/',
    isVisible: false,
    title: 'Main',
    usageScope: [UsageScopes.LANDING],
  },
  ABOUT: {
    path: '/about',
    isVisible: true,
    title: 'About',
    usageScope: [UsageScopes.LANDING],
  },
  PRICING: {
    path: '/pricing',
    isVisible: true,
    title: 'Pricing',
    usageScope: [UsageScopes.LANDING],
  },
  SUPPORT: {
    path: '/support',
    isVisible: true,
    title: 'Support',
    usageScope: [UsageScopes.LANDING],
  },

  AUTHED_EXAMPLE_PAGE: {
    path: '/authed-example-page',
    isVisible: true,
    title: '',
    usageScope: [UsageScopes.SYSTEM],
  },
};

export type AppRoute = { path: string; isVisible: boolean; title: string; usageScope: string[] };
