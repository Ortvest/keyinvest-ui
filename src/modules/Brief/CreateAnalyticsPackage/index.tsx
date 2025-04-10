import React, { useState } from 'react';

import { StockCard } from '@modules/Brief/StockPicks/layout/StockCard';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import { useSendInvestmentPackageMutation } from '@global/api/brief/brief.api';
import { Company, InvestmentPackagePayload } from '@shared/interfaces/Brief.interfaces';

interface CreateAnalyticsPackageProps {
  onClose: () => void;
}

export const CreateAnalyticsPackage = ({ onClose }: CreateAnalyticsPackageProps): React.ReactElement => {
  const { stockPicks } = useTypedSelector((state) => state.briefReducer);
  const [packageName, setPackageName] = useState('');
  const [sendInvestmentPackage] = useSendInvestmentPackageMutation();
  const { user } = useTypedSelector((state) => state.userReducer);

  const selectedStocks = stockPicks ? stockPicks.companies : [];

  const handleCreatePackage = async (): Promise<void> => {
    const payload: InvestmentPackagePayload = {
      userId: user._id,
      packageName,
      stocks: selectedStocks,
    };

    try {
      await sendInvestmentPackage(payload).unwrap();
      console.log('Investment package successfully sent.');
      onClose();
    } catch (error) {
      console.error('Failed to send investment package:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Create new analytics package</h2>
        <p className="modal-description">
          Create a new package to track stock growth over time and analyze potential returns based on your investment
          amount.
        </p>

        <label htmlFor="packageName" className="package-name-label">
          Package name
        </label>
        <input
          id="packageName"
          type="text"
          className="package-name-input"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder="Enter package name"
        />

        <div className="companies-list">
          {selectedStocks.map((stock: Company) => (
            <StockCard key={stock.ticker} stock={stock} />
          ))}
        </div>

        <button className="create-package-button" onClick={handleCreatePackage}>
          Create Package
        </button>
      </div>
    </div>
  );
};
