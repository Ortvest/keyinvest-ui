import { useMemo } from 'react';

import { AnalyticsStock } from '@global/api/templates/investmentApi';
import { ResponsiveLine } from '@nivo/line';

interface MultiStockChartProps {
  stocks?: AnalyticsStock[];
}

export const StockChartNivo = ({ stocks }: MultiStockChartProps): JSX.Element => {
  const safeStocks = useMemo(() => (Array.isArray(stocks) ? stocks : []), [stocks]);

  const chartData = useMemo(() => {
    return safeStocks
      .filter((stock) => stock.historical?.length)
      .map((stock) => {
        const sorted = [...(stock.historical ?? [])].sort((a, b) => a.date.localeCompare(b.date));

        return {
          id: `${stock.ticker}`,
          data: sorted.map((entry) => ({
            x: entry.date,
            y: entry.price,
          })),
        };
      });
  }, [safeStocks]);

  return (
    <div
      style={{
        height: '450px',
        background: '#ffffff',
        padding: '10px',
        borderRadius: '16px',
      }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 60, bottom: 80, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -50,
          legendPosition: 'middle',
          format: (value) => `$${value}`,
        }}
        enablePoints={false}
        enableGridX={false}
        colors={{ scheme: 'category10' }}
        pointSize={4}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateY: 80,
            itemsSpacing: 10,
            itemDirection: 'left-to-right',
            itemWidth: 70,
            itemHeight: 20,
            itemTextColor: '#333',
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
};
