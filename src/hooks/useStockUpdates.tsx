
import { useState, useEffect } from 'react';
import { Stock } from '@/types/trading';
import { mockStocks } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

// Function that simulates WebSocket market data updates
export const useStockUpdates = (initialStocks: Stock[] = mockStocks, updateInterval: number = 3000) => {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const { toast } = useToast();

  useEffect(() => {
    // Function to generate random price movements
    const updateStocks = () => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const previousPrice = stock.price;
          const maxChange = previousPrice * 0.01; // Max 1% change each update
          const change = (Math.random() - 0.5) * maxChange * 2;
          const newPrice = parseFloat((previousPrice + change).toFixed(2));
          const newChangePercent = parseFloat((((newPrice - stock.previousPrice) / stock.previousPrice) * 100).toFixed(2));
          
          // Occasionally show a toast notification for significant price changes
          if (Math.abs(newChangePercent - stock.changePercent) > 0.5 && Math.random() > 0.7) {
            const isIncrease = newChangePercent > stock.changePercent;
            toast({
              title: `${stock.symbol} ${isIncrease ? '↑' : '↓'}`,
              description: `${isIncrease ? 'Up' : 'Down'} to $${newPrice.toFixed(2)} (${newChangePercent > 0 ? '+' : ''}${newChangePercent}%)`,
              variant: isIncrease ? 'default' : 'destructive',
            });
          }

          return {
            ...stock,
            previousPrice: previousPrice, // Track previous price for animation purposes
            price: newPrice,
            changePercent: newChangePercent,
            volume: stock.volume + Math.floor(Math.random() * 10000)
          };
        })
      );
    };

    // Set interval for regular updates
    const intervalId = setInterval(updateStocks, updateInterval);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [updateInterval, toast]);

  return stocks;
};
