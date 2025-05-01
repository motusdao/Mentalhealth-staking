import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-cyan-600/30' : '';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black/40 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white" style={{ fontFamily: 'monospace' }}>
                MotusDAO
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-cyan-900/30 hover:text-cyan-400 transition-all duration-300 ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                to="/stake"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-cyan-900/30 hover:text-cyan-400 transition-all duration-300 ${isActive('/stake')}`}
              >
                Stake
              </Link>
              <Link
                to="/liquidity"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-cyan-900/30 hover:text-cyan-400 transition-all duration-300 ${isActive('/liquidity')}`}
              >
                Liquidity
              </Link>
              <Link
                to="/apy"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-cyan-900/30 hover:text-cyan-400 transition-all duration-300 ${isActive('/apy')}`}
              >
                APY Info
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/40 text-gray-400 mt-auto border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <p className="text-center text-sm">
            © 2025 MotusDAO built with 🫀.
          </p>
        </div>
      </footer>
    </div>
  );
} 