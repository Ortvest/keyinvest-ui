export const PasswordResetTypes = {
  SEND_RESET: 'send-reset',
  EMAIL_SENT: 'email-sent',
} as const;

export type PasswordResetType = (typeof PasswordResetTypes)[keyof typeof PasswordResetTypes];
