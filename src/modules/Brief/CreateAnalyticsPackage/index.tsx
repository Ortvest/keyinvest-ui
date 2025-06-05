import { useForm } from 'react-hook-form';

import { StockCard } from '@modules/Brief/StockPicks/layout/StockCard';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import { useSendInvestmentPackageMutation } from '@global/api/brief/brief.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company, InvestmentPackagePayload } from '@shared/interfaces/Brief.interfaces';
import { createInvestmentPackageSchema } from '@shared/validation/create-invest-package.schema';

interface CreateAnalyticsPackageProps {
  onClose: () => void;
}

interface CreatePackageFormInputs {
  packageName: string;
}

export const CreateAnalyticsPackage = ({ onClose }: CreateAnalyticsPackageProps): React.ReactElement => {
  const { stockPicks } = useTypedSelector((state) => state.briefReducer);
  const [sendInvestmentPackage] = useSendInvestmentPackageMutation();
  const { user } = useTypedSelector((state) => state.userReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePackageFormInputs>({
    resolver: yupResolver(createInvestmentPackageSchema),
    mode: 'onTouched',
  });

  const selectedStocks = stockPicks ? stockPicks.companies : [];

  const handleCreatePackage = async (data: CreatePackageFormInputs): Promise<void> => {
    const payload: InvestmentPackagePayload = {
      userId: user?._id || '',
      packageName: data.packageName,
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

        <form onSubmit={handleSubmit(handleCreatePackage)}>
          <label htmlFor="packageName" className="package-name-label">
            Package name
          </label>
          <input
            id="packageName"
            type="text"
            className={`package-name-input ${errors.packageName ? 'input-error' : ''}`}
            placeholder="Enter package name"
            {...register('packageName')}
          />
          {errors.packageName && <div className="input-error-message">{errors.packageName.message}</div>}

          <div className="companies-list">
            {selectedStocks.map((stock: Company) => (
              <StockCard key={stock.ticker} stock={stock} />
            ))}
          </div>

          <button type="submit" className="create-package-button">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};
