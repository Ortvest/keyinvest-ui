export const StepNames = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  CONFIRMATION: 'CONFIRMATION',
} as const;

export type StepNames = keyof typeof StepNames;
