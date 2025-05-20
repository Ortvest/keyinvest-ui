interface Props {
  stocks: { ticker: string }[];
  investmentAmounts: Record<string, number>;
  onChange: (ticker: string, value: number) => void;
  onAnalyze: () => void;
  estimatedReturn?: number;
}

export const InvestmentForm = ({
  stocks = [],
  investmentAmounts,
  onChange,
  onAnalyze,
  estimatedReturn,
}: Props): JSX.Element => (
  <div className="package-invest-list">
    <ul className="package-invest-items">
      <h2 className="package-invest-title">Invest</h2>
      {Array.isArray(stocks) && stocks.length > 0 ? (
        stocks.map((stock) => (
          <li className="package-invest-item" key={stock.ticker}>
            <div className="package-name-ticker">{stock.ticker}</div>
            <input
              type="number"
              name="investment amount"
              placeholder="0"
              min={0}
              value={investmentAmounts[stock.ticker] || ''}
              className="investment-input"
              onChange={(e) => onChange(stock.ticker, Number(e.target.value))}
            />
          </li>
        ))
      ) : (
        <li>No stocks available</li>
      )}
    </ul>
    {estimatedReturn !== undefined && (
      <div className="package-final-result">
        <p className="package-final-text">Estimated return: </p>
        <p className="final-value"> ${estimatedReturn}</p>
      </div>
    )}
    <button className="package-analyze-button" onClick={onAnalyze}>
      <p> Analyze</p>
    </button>
  </div>
);
