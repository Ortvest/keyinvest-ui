export const InviteStatuses = {
  Beginner: 'I`m just starting out',
  Intermediate: 'I have some experience',
  Confident: 'I`m a confident investor',
  Expert: 'I`m an investment expert',
} as const;

export type InviteStatus = (typeof InviteStatuses)[keyof typeof InviteStatuses];
