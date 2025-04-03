
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTradingContext } from '@/contexts/TradingContext';
import AppLayout from '@/components/AppLayout';
import StockChart from '@/components/StockChart';
import TradeForm from '@/components/TradeForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import PercentChange from '@/components/PercentChange';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { 
    stocks, 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist,
    executeTrade 
  } = useTradingContext();
  
  // Find the stock details
  const stock = stocks.find(s => s.symbol === symbol);
  
  // Check if stock is in watchlist
  const isInWatchlist = watchlist.includes(symbol || '');
  
  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(symbol || '');
      toast({
        title: "Removed from Watchlist",
        description: `${symbol} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist(symbol || '');
      toast({
        title: "Added to Watchlist",
        description: `${symbol} has been added to your watchlist.`,
      });
    }
  };
  
  // Handle the case where the stock is not found
  if (!stock) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a stock with the symbol "{symbol}".
          </p>
          <Button onClick={() => navigate('/market')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Market
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">{stock.symbol}</h1>
            <p className="text-lg text-muted-foreground">{stock.name}</p>
          </div>
          <div className="flex items-baseline mt-2 md:mt-0">
            <span className="text-2xl font-bold mr-2">${stock.price.toFixed(2)}</span>
            <PercentChange value={stock.changePercent} className="text-lg" />
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleWatchlist}
          className="mt-2"
        >
          {isInWatchlist ? (
            <>
              <Minus className="h-4 w-4 mr-1" />
              Remove from Watchlist
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add to Watchlist
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockChart stock={stock} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Company Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sector:</span>
                    <span>{stock.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap:</span>
                    <span>${(stock.marketCap / 1000000000).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume:</span>
                    <span>{(stock.volume / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Market Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Day Range:</span>
                    <span>${(stock.price * 0.98).toFixed(2)} - ${(stock.price * 1.02).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">52 Week Range:</span>
                    <span>${(stock.price * 0.7).toFixed(2)} - ${(stock.price * 1.3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Volume:</span>
                    <span>{(stock.volume * 0.85 / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <TradeForm stock={stock} onTrade={executeTrade} />
        </div>
      </div>
    </AppLayout>
  );
};

export default StockDetail;
