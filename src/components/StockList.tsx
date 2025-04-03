
import React, { useState } from 'react';
import { Stock } from '@/types/trading';
import StockRow from './StockRow';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface StockListProps {
  stocks: Stock[];
  watchlist: string[];
  onAddToWatchlist: (symbol: string) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, watchlist, onAddToWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  const handleAddToWatchlist = (symbol: string) => {
    onAddToWatchlist(symbol);
    toast({
      title: "Added to Watchlist",
      description: `${symbol} has been added to your watchlist.`,
    });
  };

  return (
    <div className="space-y-4">
      <Input 
        placeholder="Search stocks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-secondary/50"
      />

      <div className="grid grid-cols-12 text-xs uppercase text-muted-foreground py-2 px-4">
        <div className="col-span-3">Symbol / Name</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Change</div>
        <div className="col-span-2">Volume</div>
        <div className="col-span-2">Market Cap</div>
        <div className="col-span-1"></div>
      </div>

      <div className="space-y-1">
        {filteredStocks.length > 0 ? (
          filteredStocks.map(stock => (
            <StockRow 
              key={stock.symbol} 
              stock={stock} 
              onClick={() => handleStockClick(stock.symbol)}
              onAddToWatchlist={handleAddToWatchlist}
              inWatchlist={watchlist.includes(stock.symbol)}
            />
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No stocks found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
