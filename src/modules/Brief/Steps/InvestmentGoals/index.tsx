import React, { useState } from 'react';

import { BriefHeader } from '@modules/Brief/shared/Header';

import '../../shared/styles.css';

import { BriefCard, BriefStepComponentProps } from '@shared/interfaces/Brief.interfaces';

export const InvestmentGoals = ({ handleSubmit, register, onSubmit }: BriefStepComponentProps): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [investmentGoals, _setInvestmentGoals] = useState<BriefCard[]>([
    {
      value: 'Capital Growth',
    },
    {
      value: 'Stable Income',
    },
    {
      value: 'Diversification',
    },
    {
      value: 'Good Dividends',
    },
  ]);

  return (
    <div className={'brief-step-container'}>
      <BriefHeader
        title={'What is your main investment goals?'}
        subtitle={
          // eslint-disable-next-line max-len
          'Understanding your goal helps us tailor stock recommendations — whether you’re aiming for growth, steady income, or diversifying your portfolio.'
        }
      />

      <form className="brief-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="brief-cards-list">
          {investmentGoals.map((goal: BriefCard) => (
            <label key={goal.value} className="brief-goal-card">
              <input id={'goals'} type="checkbox" value={goal.value} {...register('goals')} />
              {goal.value}
            </label>
          ))}
        </div>

        <button className="brief-button" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};
