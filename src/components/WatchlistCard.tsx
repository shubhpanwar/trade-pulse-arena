
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stock } from '@/types/trading';
import { Button } from '@/components/ui/button';
import StockPrice from './StockPrice';
import PercentChange from './PercentChange';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WatchlistCardProps {
  stocks: Stock[];
  watchlist: string[];
  onRemoveFromWatchlist: (symbol: string) => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ 
  stocks, 
  watchlist,
  onRemoveFromWatchlist
}) => {
  const navigate = useNavigate();
  
  // Filter stocks to get only those in the watchlist
  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.symbol));
  
  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };
  
  const handleRemove = (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();
    onRemoveFromWatchlist(symbol);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        {watchlistStocks.length > 0 ? (
          <div className="space-y-2">
            {watchlistStocks.map(stock => (
              <div 
                key={stock.symbol}
                className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md cursor-pointer"
                onClick={() => handleStockClick(stock.symbol)}
              >
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <StockPrice price={stock.price} previousPrice={stock.previousPrice} className="block" />
                    <PercentChange value={stock.changePercent} className="text-xs justify-end" />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 opacity-50 hover:opacity-100" 
                    onClick={(e) => handleRemove(e, stock.symbol)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            Your watchlist is empty. Add stocks to track them here.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;
