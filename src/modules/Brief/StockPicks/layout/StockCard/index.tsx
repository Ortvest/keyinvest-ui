import React from 'react';

import classNames from 'classnames';

import '@modules/Brief/StockPicks/layout/styles/styles.css';

import { Company } from '@shared/interfaces/Brief.interfaces';

interface StockCardProps {
  stock: Company;
}
export const StockCard = ({ stock }: StockCardProps): React.ReactNode => {
  return (
    <section className={classNames('stock-card')}>
      <div>
        <img className={classNames('stock-card-logo')} src={stock.logo} alt={stock.name} />
      </div>
      <div>
        <h3 className={classNames('stock-card-ticker')}>{stock.ticker}</h3>
        <p className={classNames('stock-card-name')}>{stock.name}</p>
      </div>
    </section>
  );
};
