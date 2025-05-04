import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import WalletConnect from './components/WalletConnect';
import Stake from './components/Stake';
import Liquidity from './components/Liquidity';
import APY from './components/APY';
import './App.css';

function App() {
  const [address, setAddress] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-900">
                    Stake4Health
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/stake"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                  >
                    Stake
                  </Link>
                  <Link
                    to="/liquidity"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                  >
                    Liquidity
                  </Link>
                  <Link
                    to="/apy"
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                  >
                    APY
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                {address ? (
                  <div className="text-sm text-gray-600">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                ) : (
                  <WalletConnect onConnect={setAddress} />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stake" element={address ? <Stake address={address} /> : <WalletConnect onConnect={setAddress} />} />
            <Route path="/liquidity" element={address ? <Liquidity /> : <WalletConnect onConnect={setAddress} />} />
            <Route path="/apy" element={<APY />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
