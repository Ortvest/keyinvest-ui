export const AuthTypes = {
  signin: 'signin',
  signup: 'signup',
  'refresh-password': 'refresh-password',
} as const;

export type AuthProposalType = keyof typeof AuthTypes;
