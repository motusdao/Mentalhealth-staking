import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to MotusDAO
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
          A revolutionary platform combining health tracking with decentralized finance.
          Stake your assets and earn rewards while contributing to healthcare initiatives.
        </p>
        <p className="text-lg text-cyan-300 max-w-2xl mx-auto leading-relaxed mb-8">
          <strong>How Your Stake Helps:</strong> All yield generated from staked funds is used to pay for mental health services, making every staker a direct supporter of mental health access.
        </p>
        <div className="flex justify-center">
          <WalletConnect />
        </div>
      </div>

      {/* Action Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Stake Box */}
        <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-300">
          <div className="mb-4">
            <div className="text-cyan-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Stake</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Stake your CUSD tokens and earn rewards while supporting healthcare initiatives.
          </p>
          <Link
            to="/stake"
            className="block w-full bg-cyan-600/80 text-white text-center py-3 px-6 rounded-lg hover:bg-cyan-700/80 transition-all duration-300"
          >
            Start Staking
          </Link>
        </div>

        {/* Liquidity Box */}
        <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-300">
          <div className="mb-4">
            <div className="text-cyan-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Liquidity</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Provide liquidity to our pools and earn additional rewards from trading fees.
          </p>
          <Link
            to="/liquidity"
            className="block w-full bg-cyan-600/80 text-white text-center py-3 px-6 rounded-lg hover:bg-cyan-700/80 transition-all duration-300"
          >
            Add Liquidity
          </Link>
        </div>

        {/* APY Info Box */}
        <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-300">
          <div className="mb-4">
            <div className="text-cyan-400 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">APY Info</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Check current APY rates and learn about our reward distribution system.
          </p>
          <Link
            to="/apy"
            className="block w-full bg-cyan-600/80 text-white text-center py-3 px-6 rounded-lg hover:bg-cyan-700/80 transition-all duration-300"
          >
            View APY
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-white mb-8">Why Choose MotusDAO?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Health Focus</h3>
            <p className="text-gray-300">Support mental healthcare initiatives while earning rewards</p>
          </div>
          <div className="space-y-3">
            <div className="text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Secure Staking</h3>
            <p className="text-gray-300">Built on Celo blockchain for maximum security</p>
          </div>
          <div className="space-y-3">
            <div className="text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Competitive APY</h3>
            <p className="text-gray-300">Earn attractive returns on your staked assets</p>
          </div>
        </div>
      </div>
    </div>
  );
} 