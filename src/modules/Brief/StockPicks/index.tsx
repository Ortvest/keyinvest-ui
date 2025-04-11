import React, { useState } from 'react';

import classNames from 'classnames';

import { CreateAnalyticsPackage } from '@modules/Brief/CreateAnalyticsPackage';
import { BriefHeader } from '@modules/Brief/shared/Header';
import { CreatePortfolioButton } from '@modules/Brief/StockPicks/features/CreatePortfolioButton';
import { StockCard } from '@modules/Brief/StockPicks/layout/StockCard';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import { Company } from '@shared/interfaces/Brief.interfaces';

export const StockPicks = (): React.ReactNode => {
  const { stockPicks } = useTypedSelector((state) => state.briefReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <BriefHeader
        title={'Here are your stock picks'}
        subtitle={
          'Based on your goals and preferences, our AI has selected the stocks that best match your investment strategy.'
        }
      />
      <div className={classNames('brief-stocks-list')}>
        {stockPicks
          ? stockPicks.companies.map((stock: Company) => <StockCard key={stock.ticker} stock={stock} />)
          : null}
      </div>
      <div>
        <CreatePortfolioButton onClick={openModal} />
      </div>

      {isModalOpen && <CreateAnalyticsPackage onClose={closeModal} />}
    </>
  );
};
