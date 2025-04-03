
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StockPriceProps {
  price: number;
  previousPrice: number;
  className?: string;
}

const StockPrice: React.FC<StockPriceProps> = ({ price, previousPrice, className }) => {
  const [animateClass, setAnimateClass] = useState<string>('');
  
  useEffect(() => {
    if (price === previousPrice) return;
    
    const newClass = price > previousPrice ? 'animate-price-up' : 'animate-price-down';
    setAnimateClass(newClass);
    
    const timer = setTimeout(() => {
      setAnimateClass('');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [price, previousPrice]);
  
  const priceChangeClass = price > previousPrice ? 'price-up' : price < previousPrice ? 'price-down' : '';
  
  return (
    <span className={cn(priceChangeClass, animateClass, className)}>
      ${price.toFixed(2)}
    </span>
  );
};

export default StockPrice;
