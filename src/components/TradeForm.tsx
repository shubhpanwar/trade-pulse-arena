
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Stock } from '@/types/trading';
import { toast } from '@/hooks/use-toast';

interface TradeFormProps {
  stock: Stock;
  onTrade: (symbol: string, price: number, quantity: number, type: 'buy' | 'sell') => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ stock, onTrade }) => {
  const [quantity, setQuantity] = useState<string>('1');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [total, setTotal] = useState<number>(stock.price);
  
  useEffect(() => {
    setTotal(stock.price * (parseFloat(quantity) || 0));
  }, [quantity, stock.price]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quantityNum = parseFloat(quantity);
    
    if (isNaN(quantityNum) || quantityNum <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    onTrade(stock.symbol, stock.price, quantityNum, tradeType);
    setQuantity('1');
    
    toast({
      title: "Trade executed",
      description: `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${stock.symbol} @ $${stock.price.toFixed(2)}`,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Trade {stock.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trade-type">Transaction Type</Label>
            <RadioGroup 
              id="trade-type" 
              value={tradeType} 
              onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy" className="text-positive">Buy</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell" className="text-negative">Sell</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              value={quantity} 
              onChange={handleQuantityChange}
              className="bg-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price per Share</Label>
            <Input 
              id="price" 
              value={`$${stock.price.toFixed(2)}`}
              disabled
              className="bg-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="total">Total Value</Label>
            <Input 
              id="total" 
              value={`$${total.toFixed(2)}`}
              disabled
              className="bg-secondary/50"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Place {tradeType === 'buy' ? 'Buy' : 'Sell'} Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradeForm;
