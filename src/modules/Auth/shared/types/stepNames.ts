export const StepNames = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  CONFIRMATION: 'CONFIRMATION',
  USERNAME: 'USERNAME',
  VERIFICATION: 'VERIFICATION',
} as const;

export type StepNames = keyof typeof StepNames;
