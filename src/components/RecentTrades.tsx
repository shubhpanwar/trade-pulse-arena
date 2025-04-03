
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trade } from '@/types/trading';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecentTradesProps {
  trades: Trade[];
}

const RecentTrades: React.FC<RecentTradesProps> = ({ trades }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trades.length > 0 ? (
            trades.map(trade => (
              <div key={trade.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{trade.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(trade.timestamp, 'MMM d, h:mm a')}
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "font-medium",
                    trade.type === 'buy' ? 'text-positive' : 'text-negative'
                  )}>
                    {trade.type === 'buy' ? '+' : '-'}{trade.quantity} @ ${trade.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${trade.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No recent trades
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTrades;
