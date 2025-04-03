
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        {children}
      </main>
      <footer className="bg-card border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TradePulse | Demo Trading Platform
          </p>
          <p className="text-xs mt-1">
            All market data is simulated for demonstration purposes only.
            No real trades are executed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
