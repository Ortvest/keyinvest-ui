import React from 'react';

import classNames from 'classnames';

import { BriefHeader } from '@modules/Brief/shared/Header';

import '../../shared/styles.css';

import { BriefStepComponentProps } from '@shared/interfaces/Brief.interfaces';

export const InvestmentPeriod = ({ handleSubmit, register, onSubmit }: BriefStepComponentProps): React.ReactNode => {
  return (
    <>
      <BriefHeader
        title={'How long are you planning to invest?'}
        subtitle={`The investment period helps us select stocks that align with your strategy 
		  — whether you’re looking for quick gains or long-term growth.`}
      />

      <form className="brief-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="brief-selector">
          <div className="custom-select-wrapper">
            <select {...register('period')} id="period" defaultValue="">
              <option value="" disabled hidden>
                Select your investment period
              </option>
              <option value="less-than-1">Less than 1 year</option>
              <option value="1-3">1–3 years</option>
              <option value="3-5">3–5 years</option>
              <option value="5-10">5–10 years</option>
              <option value="10-plus">More than 10 years</option>
            </select>
          </div>
        </div>

        <button className={classNames('brief-button')} type="submit">
          Next
        </button>
      </form>
    </>
  );
};
