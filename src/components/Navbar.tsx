
import React from 'react';
import { Link } from 'react-router-dom';
import { ChartLine, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-card border-b">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <ChartLine className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">TradePulse</span>
        </Link>
        
        <nav className="flex items-center space-x-1 md:space-x-4">
          <Link to="/">
            <Button variant="ghost" size={isMobile ? "sm" : "default"}>
              Dashboard
            </Button>
          </Link>
          <Link to="/market">
            <Button variant="ghost" size={isMobile ? "sm" : "default"}>
              Market
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="ghost" size={isMobile ? "sm" : "default"}>
              Portfolio
            </Button>
          </Link>
          <Link to="/trade">
            <Button size={isMobile ? "sm" : "default"}>
              <DollarSign className="h-4 w-4 mr-1" />
              <span>Trade</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
