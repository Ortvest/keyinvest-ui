export const AuthTypes = {
  SIGNIN: 'SIGNIN',
  SIGNUP: 'SIGNUP',
  REFRESH_PASSWORD: 'REFRESH_PASSWORD',
} as const;

export type AuthProposalType = keyof typeof AuthTypes;
