export const BriefSteps = {
  WELCOME: 'WELCOME',
  PERIOD: 'PERIOD',
  INVESTMENT_GOALS: 'INVESTMENT_GOALS',
  INTERESTED_SECTORS: 'INTERESTED_SECTORS',
  COMPANIES_COUNT: 'COMPANIES_COUNT',
  STOCK_PICKS: 'STOCK_PICKS',
} as const;

export type BriefStep = (typeof BriefSteps)[keyof typeof BriefSteps];