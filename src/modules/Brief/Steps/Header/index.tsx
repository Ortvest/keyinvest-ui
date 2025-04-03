import React from 'react';
import classNames from 'classnames';

import './styles/styles.css';
import { BriefStep } from '@shared/enums/Brief.enums';

import IconArrowLeft from '@shared/assets/icons/arrow-left.svg'
import { getBriefStepIndex, getBriefStepLabel, getPreviousBriefStep } from '@shared/utils/getNextBriefStep';
interface StepHeaderProps {
  currentStep: BriefStep
  setCurrentStep: (step: BriefStep) => void
}
export const StepHeader = ({ currentStep, setCurrentStep }: StepHeaderProps): React.ReactElement => {

  const currentStepIndex = getBriefStepIndex(currentStep);

  const onBackStepAction= (): void  => {
    const previousStep = getPreviousBriefStep(currentStep);
    setCurrentStep(previousStep as BriefStep);
  }

  return (
    <header className={classNames('step-header')}>
      <div>
        <button onClick={onBackStepAction}>
          <img src={IconArrowLeft} alt="icon arrow left" />
        </button>
      </div>
      <div>
        <p>{getBriefStepLabel(currentStep)}</p>
      </div>
      <div>
        <span>{currentStepIndex}/6</span>
      </div>
    </header>
  );
}