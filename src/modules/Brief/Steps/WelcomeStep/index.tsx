import React from 'react';

import classNames from 'classnames';

import { BriefHeader } from '@modules/Brief/shared/Header';

import { BriefStep, BriefSteps } from '@shared/enums/Brief.enums';

interface WelcomeStepProps {
  onUpdateStepHandler: (step: BriefStep) => void;
}
export const WelcomeStep = ({ onUpdateStepHandler }: WelcomeStepProps): React.ReactNode => {
  return (
    <>
      <BriefHeader
        title={'Welcome to your first briefing'}
        subtitle={
          'Our AI is ready to help you invest smarter. Share your goals — and get stock picks that match your needs.'
        }
      />
      <button className={classNames('brief-button')} onClick={() => onUpdateStepHandler(BriefSteps.PERIOD)}>
        Let’s start
      </button>
    </>
  );
};
