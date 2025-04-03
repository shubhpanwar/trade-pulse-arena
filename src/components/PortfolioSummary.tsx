
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioPosition } from '@/types/trading';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';
import PercentChange from './PercentChange';

interface PortfolioSummaryProps {
  positions: PortfolioPosition[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ positions }) => {
  // Calculate total portfolio value
  const totalValue = positions.reduce((sum, position) => sum + position.totalValue, 0);
  
  // Calculate total gain/loss
  const totalGain = positions.reduce((sum, position) => sum + position.totalGain, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;
  
  // Calculate daily gain/loss
  const totalDayChange = positions.reduce((sum, position) => sum + position.dayChange, 0);
  const totalDayChangePercent = positions.reduce(
    (sum, position) => sum + (position.dayChangePercent * position.totalValue), 
    0
  ) / totalValue;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="h-5 w-5 mr-1" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-2xl font-bold mb-1">${totalValue.toFixed(2)}</div>
        
        <div className="flex items-center space-x-3 mb-4 text-sm">
          <div className="flex items-center">
            <span className="text-muted-foreground mr-1">Today:</span>
            <PercentChange value={totalDayChangePercent} /> 
            <span className="ml-1">(${totalDayChange.toFixed(2)})</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center">
            <span className="text-muted-foreground mr-1">Total:</span>
            <PercentChange value={totalGainPercent} />
            <span className="ml-1">(${totalGain.toFixed(2)})</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {positions.map(position => (
            <div key={position.symbol} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{position.symbol}</div>
                <div className="text-xs text-muted-foreground">{position.shares} shares</div>
              </div>
              <div className="text-right">
                <div>${position.totalValue.toFixed(2)}</div>
                <PercentChange value={position.dayChangePercent} className="text-xs justify-end" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
