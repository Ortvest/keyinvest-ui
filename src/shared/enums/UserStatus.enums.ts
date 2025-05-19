export const UserStatus = {
  Confirmed: 'confirmed',
  ToConfirm: 'to-confirm',
} as const;

export const UserStatusLabel = {
  [UserStatus.Confirmed]: 'VERIFIED',
  [UserStatus.ToConfirm]: 'UNVERIFIED',
} as const;

export const UserStatusClass = {
  [UserStatus.Confirmed]: 'verified-badge',
  [UserStatus.ToConfirm]: 'unverified-badge',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
