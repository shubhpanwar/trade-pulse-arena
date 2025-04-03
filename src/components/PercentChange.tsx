
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PercentChangeProps {
  value: number;
  className?: string;
  showIcon?: boolean;
}

const PercentChange: React.FC<PercentChangeProps> = ({ value, className, showIcon = true }) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const baseClass = isPositive 
    ? 'text-positive' 
    : isNeutral 
      ? '' 
      : 'text-negative';
  
  return (
    <span className={cn("flex items-center", baseClass, className)}>
      {showIcon && !isNeutral && (
        isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />
      )}
      {value > 0 ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
};

export default PercentChange;
