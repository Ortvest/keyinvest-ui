import { useMemo } from 'react';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import './styles/styles.css';

import { AnalyticsStock } from '@global/api/templates/investmentApi';

interface MultiStockChartProps {
  stocks?: AnalyticsStock[];
}

export const StokeChart = ({ stocks }: MultiStockChartProps): JSX.Element => {
  const safeStocks = useMemo(() => (Array.isArray(stocks) ? stocks : []), [stocks]);

  const sortedDates = useMemo(() => {
    const datesSet = new Set<string>();
    safeStocks.forEach((stock) => {
      stock.historical?.forEach((entry) => datesSet.add(entry.date));
    });
    return Array.from(datesSet).sort();
  }, [safeStocks]);

  const chartData = useMemo(() => {
    return sortedDates.map((date) => {
      const entry: Record<string, number | string> = { date };
      safeStocks.forEach((stock) => {
        const point = stock.historical?.find((h) => h.date === date);
        if (point) entry[stock.ticker] = point.price;
      });
      return entry;
    });
  }, [safeStocks, sortedDates]);

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer minHeight={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          {safeStocks.map((stock) =>
            stock.historical?.length ? (
              <Line
                key={stock.ticker}
                type="monotone"
                dataKey={stock.ticker}
                name={`${stock.name} (${stock.ticker})`}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                dot={false}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
      {!chartData.length && <p style={{ textAlign: 'center' }}> </p>}
    </div>
  );
};
