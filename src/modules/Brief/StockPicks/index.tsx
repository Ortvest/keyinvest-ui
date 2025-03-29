import React from 'react';

import { BriefHeader } from '@modules/Brief/shared/Header';
import { BriefStepComponentProps } from '@shared/interfaces/Brief.interfaces';


export const StockPicks = ({ handleSubmit, register, onSubmit }: BriefStepComponentProps): React.ReactNode => {
  return (
    <>
      <BriefHeader
        title={'Here are your stock picks'}
        subtitle={
          // eslint-disable-next-line max-len
          'Based on your goals and preferences, our AI has selected the stocks that best match your investment strategy.'
        }
      />
    </>
  );
};
