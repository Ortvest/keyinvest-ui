import React, { useState } from 'react';

import { BriefCard, BriefStepComponentProps } from '@shared/interfaces/Brief.interfaces';
import { BriefHeader } from '@modules/Brief/shared/Header';


export const InterestedSectors = ({ handleSubmit, register, onSubmit }: BriefStepComponentProps): React.ReactNode => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interestedSectors, _] = useState<BriefCard[]>([
    {
      value: 'Healthcare',
    },
    {
      value: 'Financials',
    },
    {
      value: 'Technology',
    },
    {
      value: 'Industrials',
    },
    {
      value: 'Consumer Discretionary',
    },
    {
      value: 'Materials',
    },
    {
      value: 'Real Estate',
    },
    {
      value: 'Communication Services',
    },
    {
      value: 'Energy',
    },
    {
      value: 'Utilities',
    },
    {
      value: 'Consumer Staples',
    },
  ]);

  return (
    <div className={'brief-step-container'}>
      <BriefHeader
        title={'Which sectors are you interested in?'}
        subtitle={
          // eslint-disable-next-line max-len
          'Choose the industries you want to focus on — this helps our AI recommend stocks that match your preferences.'
        }
      />

      <form className="brief-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="brief-cards-list">
          {interestedSectors.map((goal: BriefCard) => (
            <label key={goal.value} className="brief-goal-card">
              <input id={'sectors'} type="checkbox" value={goal.value} {...register('sectors')} />
              {goal.value}
            </label>
          ))}
        </div>

        <button className="brief-button" type="submit">
          Next
        </button>
      </form>

    </div>
  )
}