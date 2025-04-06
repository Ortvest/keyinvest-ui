export const UsageScopes = {
  AUTH: 'auth',
  LANDING: 'landing',
  SYSTEM: 'system',
} as const;

export const AppRoutes = {
  AUTH: { path: '/auth', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_LOG_IN: { path: '/auth/login', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_REGISTER: { path: '/auth/register', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
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
  SYSTEM: {
    path: '/system',
    isVisible: false,
    title: 'System',
    usageScope: [UsageScopes.LANDING],
  },

  AUTHED_MAIN_PAGE: {
    path: '/:user-id',
    isVisible: true,
    title: '',
    usageScope: [UsageScopes.SYSTEM],
  },
  BRIEF: {
    path: '/system/briefing',
    isVisible: true,
    title: 'Briefing',
    usageScope: [UsageScopes.SYSTEM],
  },
  TEMPLATES: {
    path: '/system/templates',
    isVisible: true,
    title: 'Templates',
    usageScope: [UsageScopes.SYSTEM],
  },
  NOTIFICATIONS: {
    path: '/system/notifications',
    isVisible: true,
    title: 'Notifications',
    usageScope: [UsageScopes.SYSTEM],
  },
  AI_ASSISTANT: {
    path: '/system/ai-assistant',
    isVisible: true,
    title: 'Ai-assistant',
    usageScope: [UsageScopes.SYSTEM],
  },
};

export type AppRoute = { path: string; isVisible: boolean; title: string; usageScope: string[] };
