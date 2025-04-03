
import { Stock, Trade, PortfolioPosition, ChartData, TimeRange } from '@/types/trading';

// Mock stock data
export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    previousPrice: 173.21,
    changePercent: 1.28,
    volume: 57382109,
    marketCap: 2750000000000,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 321.87,
    previousPrice: 325.12,
    changePercent: -1.00,
    volume: 28473921,
    marketCap: 2400000000000,
    sector: 'Technology'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 132.21,
    previousPrice: 131.85,
    changePercent: 0.27,
    volume: 35762981,
    marketCap: 1350000000000,
    sector: 'Consumer Cyclical'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.50,
    previousPrice: 140.35,
    changePercent: 0.82,
    volume: 19283746,
    marketCap: 1780000000000,
    sector: 'Communication Services'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 185.64,
    previousPrice: 194.05,
    changePercent: -4.33,
    volume: 98654321,
    marketCap: 580000000000,
    sector: 'Automotive'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 294.37,
    previousPrice: 287.42,
    changePercent: 2.42,
    volume: 25637481,
    marketCap: 750000000000,
    sector: 'Technology'
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 485.92,
    previousPrice: 490.13,
    changePercent: -0.86,
    volume: 8765432,
    marketCap: 210000000000,
    sector: 'Entertainment'
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 112.75,
    previousPrice: 110.25,
    changePercent: 2.27,
    volume: 12354987,
    marketCap: 205000000000,
    sector: 'Entertainment'
  }
];

// Mock portfolio positions
export const mockPortfolio: PortfolioPosition[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    averagePrice: 155.50,
    currentPrice: 175.43,
    totalValue: 1754.30,
    totalGain: 199.30,
    totalGainPercent: 12.82,
    dayChange: 22.20,
    dayChangePercent: 1.28
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 5,
    averagePrice: 310.25,
    currentPrice: 321.87,
    totalValue: 1609.35,
    totalGain: 58.10,
    totalGainPercent: 3.74,
    dayChange: -16.25,
    dayChangePercent: -1.00
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    shares: 8,
    averagePrice: 200.15,
    currentPrice: 185.64,
    totalValue: 1485.12,
    totalGain: -116.08,
    totalGainPercent: -7.25,
    dayChange: -67.28,
    dayChangePercent: -4.33
  }
];

// Mock market data
export const generateMockChartData = (days: number = 30, volatility: number = 0.02, startPrice: number = 150): ChartData[] => {
  const data: ChartData[] = [];
  let price = startPrice;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const change = price * volatility * (Math.random() - 0.5);
    price += change;
    
    data.push({
      time: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
};

// Mock recent trades
export const generateMockTrades = (count: number = 5): Trade[] => {
  const trades: Trade[] = [];
  const symbols = mockStocks.map(stock => stock.symbol);
  
  for (let i = 0; i < count; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const stock = mockStocks.find(s => s.symbol === symbol)!;
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const quantity = Math.floor(Math.random() * 10) + 1;
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - i * 30);
    
    trades.push({
      id: `trade-${i}`,
      symbol,
      price: stock.price,
      quantity,
      type,
      timestamp,
      total: parseFloat((stock.price * quantity).toFixed(2))
    });
  }
  
  return trades;
};

// Time ranges for charts
export const timeRanges: TimeRange[] = [
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: '5Y', value: '5Y' }
];

// Generate intraday data (1-minute intervals for the last 6.5 hours - trading day)
export const generateIntradayData = (startPrice: number, volatility: number = 0.0015): ChartData[] => {
  const data: ChartData[] = [];
  let price = startPrice;
  const intervals = 6.5 * 60; // 6.5 hours * 60 minutes
  
  for (let i = 0; i < intervals; i++) {
    const now = new Date();
    now.setHours(9 + Math.floor(i / 60), 30 + (i % 60), 0, 0);
    
    const trend = Math.sin(i / (intervals / 4)) * volatility * 0.8; // Add slight trend
    const change = price * volatility * (Math.random() - 0.5 + trend);
    price += change;
    
    data.push({
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
};

// Generate watchlist
export const mockWatchlist = ['GOOGL', 'AMZN', 'META', 'NFLX'];

// Mock orders
export const mockOrders = generateMockTrades(10);
