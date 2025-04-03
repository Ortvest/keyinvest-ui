import React, { useState } from 'react';

import { InvestmentPeriod } from '@modules/Brief/Steps/InvestmentPeriod';
import { WelcomeStep } from '@modules/Brief/Steps/WelcomeStep';

import './shared/styles.css';

import { BriefStep, BriefSteps as IBriefSteps } from '@shared/enums/Brief.enums';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectBriefDataSchema } from '@shared/validation/collect-brief-data.schema';
import { BriefStepComponentProps, CollectBriefDataInputs } from '@shared/interfaces/Brief.interfaces';
import { InvestmentGoals } from '@modules/Brief/Steps/InvestmentGoals';
import { InterestedSectors } from '@modules/Brief/Steps/InterestedSectors';
import { CompaniesNumber } from '@modules/Brief/Steps/CompaniesNumber';
import { StockPicks } from '@modules/Brief/StockPicks';
import { useSendBriefDataMutation } from '@global/api/brief/brief.api';
import { getNextBriefStep } from '@shared/utils/getNextBriefStep';
import { StepHeader } from '@modules/Brief/Steps/Header';

const briefingSteps = [
  {
    step: IBriefSteps.WELCOME,
    component: (props: BriefStepComponentProps): React.ReactElement => <WelcomeStep {...props} />,
  },
  {
    step: IBriefSteps.PERIOD,
    component: (props: BriefStepComponentProps): React.ReactElement => <InvestmentPeriod {...props} />,
  },
  {
    step: IBriefSteps.INVESTMENT_GOALS,
    component: (props: BriefStepComponentProps): React.ReactElement => <InvestmentGoals {...props} />,
  },
  {
    step: IBriefSteps.INTERESTED_SECTORS,
    component: (props: BriefStepComponentProps): React.ReactElement => <InterestedSectors {...props} />,
  },
  {
    step: IBriefSteps.COMPANIES_COUNT,
    component: (props: BriefStepComponentProps): React.ReactElement => <CompaniesNumber {...props} />,
  },
  {
    step: IBriefSteps.STOCK_PICKS,
    component: (): React.ReactElement => <StockPicks />,
  },
];


export const BriefSteps = (): React.ReactNode => {
  const [currentStep, setCurrentStep] = useState<BriefStep>(IBriefSteps.WELCOME);

  const onUpdateStepHandler = (step: BriefStep): void => {
    setCurrentStep(step);
  };

  const { register, handleSubmit } = useForm<CollectBriefDataInputs>({
    resolver: yupResolver(collectBriefDataSchema),
    mode: 'onTouched',
  });

  const current = briefingSteps.find((step) => step.step === currentStep);

  const [sendBriefData] = useSendBriefDataMutation();

  const onSubmit = async (data: CollectBriefDataInputs): Promise<void> => {
    const nextStep = getNextBriefStep(currentStep);
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      console.log('Briefing finished or no next step.');
    };

    if ((nextStep as BriefStep) === IBriefSteps.STOCK_PICKS) {
      await sendBriefData(data);
    }
  };
  return <>
    <StepHeader currentStep={currentStep} setCurrentStep={setCurrentStep}/>
    {current?.component({ onUpdateStepHandler, register, onSubmit, handleSubmit })}
  </>;
};
