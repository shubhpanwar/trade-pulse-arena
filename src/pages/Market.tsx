
import React from 'react';
import { useTradingContext } from '@/contexts/TradingContext';
import AppLayout from '@/components/AppLayout';
import StockList from '@/components/StockList';
import MarketOverview from '@/components/MarketOverview';

const Market = () => {
  const { stocks, watchlist, addToWatchlist } = useTradingContext();

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Market</h1>
        <p className="text-muted-foreground">
          Explore stocks, track movements, and add to your watchlist.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MarketOverview stocks={stocks} />
        <StockList 
          stocks={stocks} 
          watchlist={watchlist} 
          onAddToWatchlist={addToWatchlist} 
        />
      </div>
    </AppLayout>
  );
};

export default Market;
