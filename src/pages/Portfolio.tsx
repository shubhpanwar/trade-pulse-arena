
import React from 'react';
import { useTradingContext } from '@/contexts/TradingContext';
import AppLayout from '@/components/AppLayout';
import PortfolioSummary from '@/components/PortfolioSummary';
import RecentTrades from '@/components/RecentTrades';
import StockRow from '@/components/StockRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const { portfolio, trades, stocks } = useTradingContext();
  const navigate = useNavigate();
  
  // Find the stocks in our portfolio
  const portfolioStocks = stocks.filter(stock => 
    portfolio.some(position => position.symbol === stock.symbol)
  );
  
  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Portfolio</h1>
        <p className="text-muted-foreground">
          Track your investments, positions, and trading history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PortfolioSummary positions={portfolio} />
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {portfolioStocks.length > 0 ? (
                <div className="space-y-1">
                  {portfolioStocks.map(stock => (
                    <StockRow 
                      key={stock.symbol} 
                      stock={stock} 
                      onClick={() => handleStockClick(stock.symbol)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  You don't have any positions yet. Start trading to build your portfolio.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <RecentTrades trades={trades} />
      </div>
    </AppLayout>
  );
};

export default Portfolio;
