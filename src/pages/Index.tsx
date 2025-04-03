
import React from 'react';
import { useTradingContext } from '@/contexts/TradingContext';
import AppLayout from '@/components/AppLayout';
import MarketOverview from '@/components/MarketOverview';
import PortfolioSummary from '@/components/PortfolioSummary';
import WatchlistCard from '@/components/WatchlistCard';
import RecentTrades from '@/components/RecentTrades';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { 
    stocks, 
    portfolio, 
    watchlist, 
    trades,
    removeFromWatchlist
  } = useTradingContext();

  const handleRemoveFromWatchlist = (symbol: string) => {
    removeFromWatchlist(symbol);
    toast({
      title: "Removed from Watchlist",
      description: `${symbol} has been removed from your watchlist.`,
    });
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your trading dashboard. Monitor markets, portfolio, and watchlist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview stocks={stocks} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTrades trades={trades} />
            <WatchlistCard 
              stocks={stocks} 
              watchlist={watchlist}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          </div>
        </div>
        <div>
          <PortfolioSummary positions={portfolio} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
