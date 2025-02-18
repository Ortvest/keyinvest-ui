export const AuthTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  REFRESH_PASSWORD: 'REFRESH_PASSWORD',
} as const;

export type AuthProposalType = keyof typeof AuthTypes;
