import { StokeChart } from '@modules/Templates/PackageDetails/features/StokeChart';

import { AnalyticsStock } from '@global/api/templates/investmentApi';

interface Props {
  stocks: AnalyticsStock[];
  selectedRange: number | null;
  onRangeClick: (days: number) => void;
}

const ranges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'MAX', days: 1825 },
];

export const StockChartSection = ({ stocks, selectedRange, onRangeClick }: Props): JSX.Element => (
  <>
    <StokeChart stocks={stocks} />
    <div className="dates-to-invest">
      {ranges.map((range) => (
        <button
          key={range.label}
          onClick={() => onRangeClick(range.days)}
          className={`date-item-invest ${selectedRange === range.days ? 'selected' : ''}`}>
          {range.label}
        </button>
      ))}
    </div>
  </>
);
