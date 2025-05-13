import { AnalyticsStock } from '@global/api/templates/investmentApi';

interface Props {
  selectedPackageStocks: { ticker: string; name: string; logo: string }[];
  analyticsStocks?: AnalyticsStock[];
}

export const StockList = ({ selectedPackageStocks, analyticsStocks = [] }: Props): JSX.Element => (
  <ul className="package-list">
    {selectedPackageStocks.map((stock) => {
      const cleanTicker = stock.ticker.split('.')[0];
      const analyzedStock = analyticsStocks.find((s) => s.ticker === cleanTicker);

      return (
        <li className="package-item" key={stock.ticker}>
          <div className="package-info">
            <img className="package-details-avatar" src={stock.logo} alt={stock.ticker} />
            <div className="package-name-ticker">
              <strong>{stock.name}</strong> {stock.ticker}
            </div>
          </div>

          {analyzedStock && (
            <div className="stock-change-info">
              <span className={analyzedStock.changePercent >= 0 ? 'stock-positive-change' : 'stock-negative-change'}>
                {analyzedStock.changePercent >= 0 ? '📈' : '📉'} {analyzedStock.changePercent}%
              </span>
              <div className="stoke-price-diff">
                <p className="stoke-end-price">${analyzedStock.endPrice}</p>
                <p className="stoke-start-price">${analyzedStock.startPrice}</p>
              </div>
            </div>
          )}
        </li>
      );
    })}
  </ul>
);
