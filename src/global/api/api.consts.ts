export const API_ENDPOINTS = {
  SEND_PASSWORD_RESET: 'auth/send-password-reset',
  PASSWORD_RESET: 'auth/password-reset',
  AUTH_SIGN_IN: '/auth/signIn',
  AUTH_SIGN_UP: '/auth/signUp',
  AUTH_GOOGLE: '/auth/signUp/google',
  ME: '/auth/me',
  SEND_VERIFICATION_CODE: '/auth/send-verification/email',
  VERIFY_CODE: '/auth/verify-code/email',
  COLLECT_BRIEF_DATA: 'investment/recommendations',
  INVESTMENT_PACKAGE: 'investment/investment-package',
  INVITE_SEND: 'invite/group/test',
  PACKAGES: 'investment/packages',
} as const;
