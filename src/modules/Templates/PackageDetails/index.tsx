import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { InvestmentForm } from '@modules/Templates/PackageDetails/layout/InvestmentForm';
import { PackageHeader } from '@modules/Templates/PackageDetails/layout/PackageHeader';
import { StockChartSection } from '@modules/Templates/PackageDetails/layout/StockChartSection';
import { StockList } from '@modules/Templates/PackageDetails/layout/StockList';
import { Header } from '@modules/Templates/shared/Header';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles/styles.css';

import {
  AnalyticsResponse,
  useAnalyzeInvestmentMutation,
  useGetSelectedPackageQuery,
} from '@global/api/templates/investmentApi';

export const PackageDetails = (): JSX.Element => {
  const { id: packageId } = useParams();
  const { user } = useTypedSelector((state) => state.userReducer);
  const [investmentAmounts, setInvestmentAmounts] = useState<Record<string, number>>({});
  const [analyzeInvestment] = useAnalyzeInvestmentMutation();
  const [analyticsResult, setAnalyticsResult] = useState<AnalyticsResponse | null>(null);

  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');

  const {
    data: selectedPackage,
    isLoading,
    error,
  } = useGetSelectedPackageQuery({
    userId: user._id,
    packageId: packageId!,
  });

  const handleInputChange = (ticker: string, value: number): void => {
    setInvestmentAmounts((prev) => ({
      ...prev,
      [ticker]: value,
    }));
  };

  const handleAnalyzeClick = async (): Promise<void> => {
    const cleanAllocations = Object.entries(investmentAmounts).reduce(
      (acc, [ticker, value]) => {
        const cleanTicker = ticker.split('.')[0];
        if (value > 0) {
          acc[cleanTicker] = value;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    if (Object.keys(cleanAllocations).length === 0) {
      alert('Please enter valid investment amounts.');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select a date range.');
      return;
    }

    try {
      const response = await analyzeInvestment({
        allocations: cleanAllocations,
        startDate,
        endDate,
        currency: 'USD',
      }).unwrap();
      setAnalyticsResult(response);
    } catch (err) {
      console.error('Error analyzing investment', err);
    }
  };
  const handleRangeClick = (days: number): void => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const formattedStart = start.toISOString().split('T')[0];
    const formattedEnd = end.toISOString().split('T')[0];

    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    setSelectedRange(days);
  };

  useEffect(() => {
    if (selectedPackage) {
      const defaultAmounts = selectedPackage.stocks.reduce(
        (acc, stock) => {
          acc[stock.ticker] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
      setInvestmentAmounts(defaultAmounts);
    }
  }, [selectedPackage]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !selectedPackage) return <p>Error loading package</p>;

  return (
    <>
      <Header
        title={selectedPackage.packageName}
        description="Track the performance of this 
		stock package and analyze potential returns over your selected period."
      />
      <section className="package-section-wrapper">
        <article className="chart-stocks-info">
          <PackageHeader
            name={selectedPackage.packageName}
            stockCount={selectedPackage.stocks.length}
            totalChangePercent={analyticsResult?.meta.totalChangePercent}
          />
          <StockChartSection
            stocks={analyticsResult?.stocks || []}
            selectedRange={selectedRange}
            onRangeClick={handleRangeClick}
          />
          <StockList selectedPackageStocks={selectedPackage.stocks} analyticsStocks={analyticsResult?.stocks} />
        </article>
        <article className="package-invest-wrapper">
          <InvestmentForm
            stocks={selectedPackage.stocks}
            investmentAmounts={investmentAmounts}
            onChange={handleInputChange}
            onAnalyze={handleAnalyzeClick}
            estimatedReturn={analyticsResult?.meta.finalBudget}
          />
        </article>
      </section>
    </>
  );
};
