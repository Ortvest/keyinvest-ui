export const BriefSteps = {
  WELCOME: 'WELCOME',
  PERIOD: 'PERIOD',
  INVESTMENT_GOALS: 'INVESTMENT_GOALS',
  INTERESTED_SECTORS: 'INTERESTED_SECTORS',
  COMPANIES_COUNT: 'COMPANIES_COUNT',
  STOCK_PICKS: 'STOCK_PICKS',
} as const;

export const BriefStepLabels: {
  [BriefSteps.WELCOME]: string;
  [BriefSteps.COMPANIES_COUNT]: string;
  [BriefSteps.INVESTMENT_GOALS]: string;
  [BriefSteps.PERIOD]: string;
  [BriefSteps.INTERESTED_SECTORS]: string
  [BriefSteps.STOCK_PICKS]: string
} = {
  [BriefSteps.WELCOME]: 'Welcome',
  [BriefSteps.PERIOD]: 'Investment period',
  [BriefSteps.INVESTMENT_GOALS]: 'Your investment goals',
  [BriefSteps.INTERESTED_SECTORS]: 'Interested sectors',
  [BriefSteps.COMPANIES_COUNT]: 'Number of companies',
  [BriefSteps.STOCK_PICKS]: 'Your stock picks',
};


export type BriefStep = (typeof BriefSteps)[keyof typeof BriefSteps];