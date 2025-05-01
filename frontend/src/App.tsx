import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Stake from './pages/Stake';
import { WalletProvider } from './context/WalletContext';
import './App.css';

// Placeholder components for other pages
const Liquidity = () => <div className="text-center py-12">Liquidity Page (Coming Soon)</div>;
const APY = () => <div className="text-center py-12">APY Info Page (Coming Soon)</div>;

export default function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/apy" element={<APY />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
}
