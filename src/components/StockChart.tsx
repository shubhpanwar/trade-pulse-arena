
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stock, TimeRange, ChartData } from '@/types/trading';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateMockChartData, timeRanges, generateIntradayData } from '@/utils/mockData';

interface StockChartProps {
  stock: Stock;
}

const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange['value']>('1D');
  
  // Generate chart data based on the selected time range
  const getChartData = (range: TimeRange['value'], symbol: string): ChartData[] => {
    switch (range) {
      case '1D':
        return generateIntradayData(stock.price * 0.97);
      case '1W':
        return generateMockChartData(7, 0.02, stock.price);
      case '1M':
        return generateMockChartData(30, 0.025, stock.price);
      case '3M':
        return generateMockChartData(90, 0.03, stock.price);
      case '1Y':
        return generateMockChartData(365, 0.04, stock.price);
      case '5Y':
        return generateMockChartData(365 * 5, 0.05, stock.price);
      default:
        return [];
    }
  };
  
  const chartData = getChartData(selectedRange, stock.symbol);
  
  // Determine if chart shows positive or negative trend
  const startPrice = chartData[0]?.price || 0;
  const endPrice = chartData[chartData.length - 1]?.price || 0;
  const isPositive = endPrice >= startPrice;
  
  // Calculate min and max values with some padding
  const priceValues = chartData.map(item => item.price);
  const minValue = Math.min(...priceValues) * 0.995;
  const maxValue = Math.max(...priceValues) * 1.005;
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border rounded-md shadow-sm text-xs">
          <p className="font-medium">{label}</p>
          <p>${payload[0].value?.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{stock.symbol} Chart</span>
          <div className="text-sm font-normal">
            ${stock.price.toFixed(2)} {' '}
            <span className={isPositive ? 'text-positive' : 'text-negative'}>
              {isPositive ? '+' : ''}{((endPrice - startPrice) / startPrice * 100).toFixed(2)}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`stockGradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{fontSize: 10}}
                tickMargin={5}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[minValue, maxValue]} 
                tick={{fontSize: 10}}
                tickMargin={5}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                fillOpacity={1}
                fill={`url(#stockGradient-${stock.symbol})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex space-x-2 justify-center">
          {timeRanges.map(range => (
            <Button
              key={range.value}
              variant="outline"
              size="sm"
              className={cn(
                "text-xs",
                selectedRange === range.value && "bg-secondary"
              )}
              onClick={() => setSelectedRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
