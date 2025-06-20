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
  const [loading, setLoading] = useState(false);

  const isStockPicksLoading = !stockPicks || !stockPicks.companies.length;

  const openModal = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 1500);
  };

  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <BriefHeader
        title={'Here are your stock picks'}
        subtitle={`Based on your goals and preferences, 
			our AI has selected the stocks that best match your investment strategy.`}
      />
      <div className={classNames('brief-stocks-list')}>
        {isStockPicksLoading ? (
          <div className="brief-loader">
            <div className="brief-spinner" />
          </div>
        ) : (
          stockPicks.companies.map((stock: Company) => <StockCard key={stock.ticker} stock={stock} />)
        )}
      </div>
      <div>
        <CreatePortfolioButton onClick={openModal} loading={loading || isStockPicksLoading} />
      </div>

      {isModalOpen && <CreateAnalyticsPackage onClose={closeModal} />}
    </>
  );
};
