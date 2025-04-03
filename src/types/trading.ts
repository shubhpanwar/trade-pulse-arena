
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  previousPrice: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface Trade {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  type: 'buy' | 'sell';
  timestamp: Date;
  total: number;
}

export interface PortfolioPosition {
  symbol: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: Date;
}

export interface ChartData {
  time: string;
  price: number;
}

export interface TimeRange {
  label: string;
  value: '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';
}
