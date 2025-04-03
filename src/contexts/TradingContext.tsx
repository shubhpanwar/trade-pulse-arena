
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Stock, 
  Trade, 
  PortfolioPosition, 
  WatchlistItem 
} from '@/types/trading';
import { 
  mockStocks, 
  mockPortfolio, 
  mockWatchlist, 
  mockOrders, 
  generateMockTrades 
} from '@/utils/mockData';
import { useStockUpdates } from '@/hooks/useStockUpdates';
import { toast } from '@/hooks/use-toast';

interface TradingContextType {
  stocks: Stock[];
  portfolio: PortfolioPosition[];
  watchlist: string[];
  trades: Trade[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  executeTrade: (symbol: string, price: number, quantity: number, type: 'buy' | 'sell') => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};

interface TradingProviderProps {
  children: ReactNode;
}

export const TradingProvider: React.FC<TradingProviderProps> = ({ children }) => {
  // Use the stock updates hook to get live stock data
  const stocks = useStockUpdates();
  
  // State for portfolio, watchlist, and trades
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>(mockPortfolio);
  const [watchlist, setWatchlist] = useState<string[]>(mockWatchlist);
  const [trades, setTrades] = useState<Trade[]>(generateMockTrades(5));
  
  // Update portfolio values when stock prices change
  useEffect(() => {
    setPortfolio(prevPortfolio => 
      prevPortfolio.map(position => {
        const stock = stocks.find(s => s.symbol === position.symbol);
        if (!stock) return position;
        
        const currentPrice = stock.price;
        const totalValue = position.shares * currentPrice;
        const totalGain = totalValue - (position.shares * position.averagePrice);
        const totalGainPercent = (totalGain / (position.shares * position.averagePrice)) * 100;
        const dayChange = position.shares * (currentPrice - stock.previousPrice);
        const dayChangePercent = stock.changePercent;
        
        return {
          ...position,
          currentPrice,
          totalValue,
          totalGain,
          totalGainPercent,
          dayChange,
          dayChangePercent
        };
      })
    );
  }, [stocks]);
  
  // Add a stock to the watchlist
  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist(prev => [...prev, symbol]);
    }
  };
  
  // Remove a stock from the watchlist
  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  };
  
  // Execute a trade (buy or sell)
  const executeTrade = (symbol: string, price: number, quantity: number, type: 'buy' | 'sell') => {
    // Create a new trade record
    const newTrade: Trade = {
      id: `trade-${Date.now()}`,
      symbol,
      price,
      quantity,
      type,
      timestamp: new Date(),
      total: price * quantity
    };
    
    // Add to trades history
    setTrades(prev => [newTrade, ...prev]);
    
    // Update portfolio
    const existingPosition = portfolio.find(p => p.symbol === symbol);
    const stock = stocks.find(s => s.symbol === symbol);
    
    if (!stock) return;
    
    if (type === 'buy') {
      if (existingPosition) {
        // Update existing position
        setPortfolio(prev => 
          prev.map(p => {
            if (p.symbol !== symbol) return p;
            
            const newShares = p.shares + quantity;
            const newTotalCost = (p.shares * p.averagePrice) + (quantity * price);
            const newAveragePrice = newTotalCost / newShares;
            
            return {
              ...p,
              shares: newShares,
              averagePrice: newAveragePrice,
              totalValue: newShares * stock.price,
              totalGain: (stock.price - newAveragePrice) * newShares,
              totalGainPercent: ((stock.price - newAveragePrice) / newAveragePrice) * 100
            };
          })
        );
      } else {
        // Add new position
        setPortfolio(prev => [
          ...prev,
          {
            symbol,
            name: stock.name,
            shares: quantity,
            averagePrice: price,
            currentPrice: stock.price,
            totalValue: quantity * stock.price,
            totalGain: (stock.price - price) * quantity,
            totalGainPercent: ((stock.price - price) / price) * 100,
            dayChange: quantity * (stock.price - stock.previousPrice),
            dayChangePercent: stock.changePercent
          }
        ]);
      }
    } else if (type === 'sell') {
      if (!existingPosition) {
        toast({
          title: "Trade error",
          description: `You don't own any shares of ${symbol} to sell.`,
          variant: "destructive",
        });
        return;
      }
      
      if (existingPosition.shares < quantity) {
        toast({
          title: "Trade error",
          description: `You only have ${existingPosition.shares} shares of ${symbol} to sell.`,
          variant: "destructive",
        });
        return;
      }
      
      if (existingPosition.shares === quantity) {
        // Remove position entirely
        setPortfolio(prev => prev.filter(p => p.symbol !== symbol));
      } else {
        // Update position with reduced shares
        setPortfolio(prev => 
          prev.map(p => {
            if (p.symbol !== symbol) return p;
            
            const newShares = p.shares - quantity;
            
            return {
              ...p,
              shares: newShares,
              totalValue: newShares * stock.price,
              totalGain: (stock.price - p.averagePrice) * newShares,
              totalGainPercent: ((stock.price - p.averagePrice) / p.averagePrice) * 100
            };
          })
        );
      }
    }
  };
  
  const value = {
    stocks,
    portfolio,
    watchlist,
    trades,
    addToWatchlist,
    removeFromWatchlist,
    executeTrade
  };
  
  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
};
