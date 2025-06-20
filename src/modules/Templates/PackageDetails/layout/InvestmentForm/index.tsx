import { useEffect, useState } from 'react';

import EyeOn from '@shared/assets/icons/eye-open.png';
import EyeOff from '@shared/assets/icons/EyeClosed.svg';

interface Props {
  stocks: { ticker: string }[];
  investmentAmounts: Record<string, number>;
  onChange: (ticker: string, value: number) => void;
  onAnalyze: () => void;
  estimatedReturn?: number;
  isLoading?: boolean;
  enabledStocks: Record<string, boolean>;
  setEnabledStocks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const InvestmentForm = ({
  stocks = [],
  investmentAmounts,
  onChange,
  onAnalyze,
  estimatedReturn,
  isLoading,
  enabledStocks,
  setEnabledStocks,
}: Props): JSX.Element => {
  const [showDifference, setShowDifference] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = (): void => {
    setShowDifference(false);
    onAnalyze();
  };

  const toggleStock = (ticker: string): void => {
    setEnabledStocks((prev) => ({
      ...prev,
      [ticker]: !prev[ticker],
    }));
  };

  const totalInvested = Object.entries(investmentAmounts).reduce((acc, [ticker, value]) => {
    if (enabledStocks[ticker]) {
      return acc + (isNaN(value) ? 0 : value);
    }
    return acc;
  }, 0);

  const difference = estimatedReturn !== undefined ? estimatedReturn - totalInvested : undefined;

  useEffect(() => {
    if (isLoading) {
      setShowDifference(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && estimatedReturn !== undefined && hasAnalyzed) {
      setShowDifference(true);
    }
  }, [isLoading, estimatedReturn, hasAnalyzed]);

  return (
    <div className="package-invest-list">
      <ul className="package-invest-items">
        <h2 className="package-invest-title">Invest</h2>
        {stocks.length > 0 ? (
          stocks.map((stock) => {
            const isEnabled = enabledStocks[stock.ticker];
            return (
              <li className={`package-invest-item ${!isEnabled ? 'disabled' : ''}`} key={stock.ticker}>
                <div className="package-name-ticker">{stock.ticker}</div>
                <div className="package-input-button">
                  <input
                    type="number"
                    name="investment amount"
                    placeholder="0"
                    min={0}
                    value={investmentAmounts[stock.ticker] || ''}
                    className="investment-input"
                    onChange={(e) => onChange(stock.ticker, Number(e.target.value))}
                    disabled={!isEnabled}
                  />
                  <button
                    type="button"
                    onClick={() => toggleStock(stock.ticker)}
                    className="toggle-visibility-button"
                    title={isEnabled ? 'Disable' : 'Enable'}>
                    {isEnabled ? <img src={EyeOn} alt="eye open" /> : <img src={EyeOff} alt="eye closed" />}
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li>No stocks available</li>
        )}
      </ul>

      {totalInvested > 0 && (
        <div className="package-final-result">
          <p className="package-final-text">Total invested: </p>
          <p className="final-value"> ${totalInvested}</p>
        </div>
      )}

      {estimatedReturn !== undefined && (
        <div className="package-final-result">
          <p className="package-final-text">Estimated return: </p>
          <p className="final-value">
            ${estimatedReturn.toFixed(2)}
            {showDifference && difference !== undefined && difference !== 0 && (
              <span className={difference > 0 ? 'difference-positive' : 'difference-negative'}>
                ({difference > 0 ? '+' : ''}
                {difference.toFixed(2)})
              </span>
            )}
          </p>
        </div>
      )}

      <button
        className="package-analyze-button"
        onClick={() => {
          setHasAnalyzed(true);
          handleAnalyze();
        }}
        disabled={isLoading}>
        {isLoading ? <span className="loader" /> : <p>Analyze</p>}
      </button>
    </div>
  );
};
