import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');

  const {
    data: selectedPackage,
    isLoading,
    error,
  } = useGetSelectedPackageQuery({
    userId: user?._id || '',
    packageId: packageId!,
  });

  const handleInputChange = (ticker: string, value: number): void => {
    setInvestmentAmounts((prev) => ({
      ...prev,
      [ticker]: value,
    }));
  };

  const [enabledStocks, setEnabledStocks] = useState<Record<string, boolean>>(
    () =>
      selectedPackage?.stocks.reduce(
        (acc, stock) => {
          acc[stock.ticker] = true;
          return acc;
        },
        {} as Record<string, boolean>
      ) ?? {}
  );

  useEffect(() => {
    if (selectedPackage) {
      setEnabledStocks(
        selectedPackage.stocks.reduce(
          (acc, stock) => {
            acc[stock.ticker] = true;
            return acc;
          },
          {} as Record<string, boolean>
        )
      );
    }
  }, [selectedPackage]);

  const getTotalInvestment = (): number => {
    return Object.entries(investmentAmounts)
      .filter(([ticker]) => enabledStocks[ticker])
      .reduce((sum, [, amount]) => sum + (amount || 0), 0);
  };

  const cleanAllocations = useMemo(() => {
    if (!selectedPackage) return {};

    return selectedPackage.stocks.reduce(
      (acc, stock) => {
        const tickerKey = stock.ticker.split('.')[0];
        const isEnabled = enabledStocks[stock.ticker];

        if (!isEnabled) return acc;

        const userValue = investmentAmounts[stock.ticker];
        acc[tickerKey] = userValue ?? 100;

        return acc;
      },
      {} as Record<string, number>
    );
  }, [investmentAmounts, selectedPackage, enabledStocks]);

  const handleAnalyzeClick = async (): Promise<void> => {
    const total = getTotalInvestment();
    if (total === 0) {
      setAnalyticsResult(null);
      return;
    }

    try {
      setIsAnalyzing(true);
      const response = await analyzeInvestment({
        allocations: cleanAllocations,
        startDate,
        endDate,
        currency: 'USD',
      }).unwrap();
      setAnalyticsResult(response);
    } catch (err) {
      console.error('Error analyzing investment', err);
    } finally {
      setIsAnalyzing(false);
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

  const defaultAmounts = useMemo(() => {
    if (!selectedPackage) return {};
    return selectedPackage.stocks.reduce(
      (acc, stock) => {
        acc[stock.ticker] = 0;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [selectedPackage]);

  useEffect(() => {
    setInvestmentAmounts(defaultAmounts);
  }, [defaultAmounts]);
  const isInitialized = useRef(false);
  useEffect(() => {
    const fetchDefaultAnalytics = async (): Promise<void> => {
      if (!selectedPackage || isInitialized.current || analyticsResult) return;
      isInitialized.current = true;

      try {
        setIsAnalyzing(true);
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 365);

        const formattedStart = start.toISOString().split('T')[0];
        const formattedEnd = end.toISOString().split('T')[0];

        const defaultAllocations = selectedPackage.stocks.reduce(
          (acc, stock) => {
            acc[stock.ticker.split('.')[0]] = 0;
            return acc;
          },
          {} as Record<string, number>
        );

        const response = await analyzeInvestment({
          allocations: defaultAllocations,
          startDate: formattedStart,
          endDate: formattedEnd,
          currency: 'USD',
        }).unwrap();

        setAnalyticsResult(response);
        setStartDate(formattedStart);
        setEndDate(formattedEnd);
        setSelectedRange(365);
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchDefaultAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage, analyticsResult]);

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
            isLoading={isAnalyzing}
            enabledStocks={enabledStocks}
            setEnabledStocks={setEnabledStocks}
          />
        </article>
      </section>
    </>
  );
};
