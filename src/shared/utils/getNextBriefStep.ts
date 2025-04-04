import { BriefStep, BriefStepLabels, BriefSteps as IBriefSteps } from '@shared/enums/Brief.enums';

const BRIEF_STEPS_ORDER: BriefStep[] = [
  IBriefSteps.WELCOME,
  IBriefSteps.PERIOD,
  IBriefSteps.INVESTMENT_GOALS,
  IBriefSteps.INTERESTED_SECTORS,
  IBriefSteps.COMPANIES_COUNT,
  IBriefSteps.STOCK_PICKS,
];

export const getNextBriefStep = (step: BriefStep): BriefStep | null => {
  const index = BRIEF_STEPS_ORDER.indexOf(step);
  return index >= 0 && index < BRIEF_STEPS_ORDER.length - 1 ? BRIEF_STEPS_ORDER[index + 1] : null;
};

export const getBriefStepIndex = (step: BriefStep): number | null => {
  const index = BRIEF_STEPS_ORDER.indexOf(step);
  return index >= 0 ? index + 1 : null;
};

export const getPreviousBriefStep = (step: BriefStep): BriefStep | null => {
  const index = BRIEF_STEPS_ORDER.indexOf(step);
  return index > 0 ? BRIEF_STEPS_ORDER[index - 1] : null;
};

export const getBriefStepLabel = (step: BriefStep): string => {
  return BriefStepLabels[step] ?? step;
};
