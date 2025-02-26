export const StepNames = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  CONFIRMATION: 'CONFIRMATION',
  USERNAME: 'USERNAME',
} as const;

export type StepNames = keyof typeof StepNames;
