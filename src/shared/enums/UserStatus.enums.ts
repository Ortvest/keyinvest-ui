export const UserStatus = {
  Confirmed: 'confirmed',
  Unconfirmed: 'unconfirmed',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
