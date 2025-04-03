
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stock } from '@/types/trading';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateIntradayData } from '@/utils/mockData';

interface MarketOverviewProps {
  stocks: Stock[];
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ stocks }) => {
  // Count stocks with positive and negative changes
  const positiveCount = stocks.filter(stock => stock.changePercent > 0).length;
  const negativeCount = stocks.filter(stock => stock.changePercent < 0).length;
  
  // Calculate average change percentage
  const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;
  
  // Find biggest movers
  const sortedByChange = [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  const topMovers = sortedByChange.slice(0, 3);
  
  // Generate some mock chart data
  const marketData = generateIntradayData(100, 0.001);
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border rounded-md shadow-sm text-xs">
          <p className="font-medium">{payload[0].payload.time}</p>
          <p>Index: {payload[0].value?.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Market Overview</span>
          <div className="flex space-x-4 text-sm font-normal">
            <div className="flex items-center">
              <ArrowUp className="h-4 w-4 mr-1 text-positive" />
              <span>{positiveCount} stocks ↑</span>
            </div>
            <div className="flex items-center">
              <ArrowDown className="h-4 w-4 mr-1 text-negative" />
              <span>{negativeCount} stocks ↓</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[180px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={marketData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{fontSize: 10}}
                tickMargin={5}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={['dataMin - 1', 'dataMax + 1']} 
                hide 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#marketGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Market sentiment</div>
            <div className="flex items-center space-x-1">
              {avgChange > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-positive" />
                  <span className={cn(
                    "font-medium",
                    avgChange > 0 ? "text-positive" : "text-negative"
                  )}>
                    Bullish {avgChange.toFixed(2)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-negative" />
                  <span className={cn(
                    "font-medium",
                    avgChange > 0 ? "text-positive" : "text-negative"
                  )}>
                    Bearish {avgChange.toFixed(2)}%
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 col-span-1 md:col-span-2">
            <div className="text-xs text-muted-foreground mb-1">Top movers</div>
            <div className="grid grid-cols-3 gap-2">
              {topMovers.map(stock => (
                <div key={stock.symbol} className="flex flex-col">
                  <div className="font-medium">{stock.symbol}</div>
                  <div className={cn(
                    "text-sm",
                    stock.changePercent > 0 ? "text-positive" : "text-negative"
                  )}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
