
import React, { useState } from 'react';
import { useTradingContext } from '@/contexts/TradingContext';
import AppLayout from '@/components/AppLayout';
import StockList from '@/components/StockList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import TradeForm from '@/components/TradeForm';

const Trade = () => {
  const { stocks, watchlist, addToWatchlist, executeTrade } = useTradingContext();
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [symbolInput, setSymbolInput] = useState('');
  
  const handleStockClick = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
    }
  };
  
  const handleSymbolLookup = () => {
    const symbol = symbolInput.toUpperCase();
    const stock = stocks.find(s => s.symbol === symbol);
    
    if (stock) {
      setSelectedStock(stock);
    } else {
      toast({
        title: "Symbol not found",
        description: `We couldn't find a stock with the symbol "${symbol}"`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Trade</h1>
        <p className="text-muted-foreground">
          Buy and sell stocks in your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Symbol Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Enter stock symbol (e.g., AAPL)" 
                    value={symbolInput}
                    onChange={(e) => setSymbolInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleSymbolLookup()}
                    className="bg-secondary/50"
                  />
                </div>
                <Button onClick={handleSymbolLookup}>
                  Look Up
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <StockList 
            stocks={stocks} 
            watchlist={watchlist} 
            onAddToWatchlist={addToWatchlist} 
          />
        </div>
        
        <div>
          <TradeForm 
            stock={selectedStock} 
            onTrade={executeTrade}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Trade;
