import React from 'react';

import classNames from 'classnames';

import { BriefHeader } from '@modules/Brief/shared/Header';

import '../../shared/styles.css';

import { BriefStepComponentProps } from '@shared/interfaces/Brief.interfaces';

export const CompaniesNumber = ({ handleSubmit, register, onSubmit }: BriefStepComponentProps): React.ReactNode => {
  return (
    <>
      <BriefHeader
        title={'How many companies do you want to invest in?'}
        subtitle={'Select how many companies you would like to include in your investment portfolio.'}
      />

      <form className="brief-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="brief-selector">
          <div className="custom-select-wrapper">
            <select {...register('numCompanies')} defaultValue="">
              <option value="" disabled hidden>
                Select number of companies
              </option>
              <option value="1-3">1–3</option>
              <option value="4-6">4–6</option>
            </select>
          </div>
        </div>
        <button className={classNames('brief-button')} type="submit">
          Finish
        </button>
      </form>
    </>
  );
};
