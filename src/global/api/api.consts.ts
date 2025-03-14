export const API_ENDPOINTS = {
  SEND_PASSWORD_RESET: 'auth/send-password-reset',
  PASSWORD_RESET: 'auth/password-reset',
  AUTH_SIGN_IN: '/auth/signIn',
  AUTH_SIGN_UP: '/auth/signUp',
  AUTH_GOOGLE: '/auth/signUp/google',
  SEND_VERIFICATION_CODE: '/auth/send-verification',
  VERIFY_CODE: '/auth/verify-code',
} as const;
