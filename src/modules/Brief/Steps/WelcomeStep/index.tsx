import React from 'react';

import classNames from 'classnames';

import { AppRoutes } from '@global/router/routes.constants';

import { BriefHeader } from '@modules/Brief/shared/Header';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { BriefStep, BriefSteps } from '@shared/enums/Brief.enums';

interface WelcomeStepProps {
  onUpdateStepHandler: (step: BriefStep) => void;
}

export const WelcomeStep = ({ onUpdateStepHandler }: WelcomeStepProps): React.ReactNode => {
  const user = useTypedSelector((state) => state.userReducer.user);

  if (!user || user.status === 'to-confirm') {
    return (
      <>
        <BriefHeader title="Before you start the briefing, you must confirm your phone number" subtitle="" />
        <button
          className={classNames('brief-button')}
          onClick={() => window.location.assign(AppRoutes.PERSONAL_INFO.path)}>
          Confirm phone number
        </button>
      </>
    );
  }

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
