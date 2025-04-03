
import React from 'react';
import { Stock } from '@/types/trading';
import StockPrice from './StockPrice';
import PercentChange from './PercentChange';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
  onAddToWatchlist?: (symbol: string) => void;
  inWatchlist?: boolean;
}

const StockRow: React.FC<StockRowProps> = ({ 
  stock, 
  onClick, 
  onAddToWatchlist,
  inWatchlist = false
}) => {
  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToWatchlist) {
      onAddToWatchlist(stock.symbol);
    }
  };

  return (
    <div 
      className="grid grid-cols-12 py-3 px-4 hover:bg-secondary/50 rounded-md cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="col-span-3 font-medium">
        <div>{stock.symbol}</div>
        <div className="text-xs text-muted-foreground">{stock.name}</div>
      </div>
      <div className="col-span-2 flex items-center">
        <StockPrice price={stock.price} previousPrice={stock.previousPrice} />
      </div>
      <div className="col-span-2 flex items-center">
        <PercentChange value={stock.changePercent} />
      </div>
      <div className="col-span-2 text-muted-foreground flex items-center">
        {(stock.volume / 1000000).toFixed(1)}M
      </div>
      <div className="col-span-2 text-muted-foreground flex items-center">
        ${(stock.marketCap / 1000000000).toFixed(1)}B
      </div>
      <div className="col-span-1 flex items-center justify-end">
        {!inWatchlist && onAddToWatchlist && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleAddToWatchlist}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockRow;
