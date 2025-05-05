import React from 'react';
import { useWallet } from '../context/WalletContext';

export default function WalletConnect() {
  const { walletConnected, address, error, connectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center space-x-4">
      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="bg-cyan-600/80 text-white py-2 px-4 rounded-lg hover:bg-cyan-700/80 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Connect MetaMask</span>
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="bg-black/60 border border-cyan-500/20 px-4 py-2 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="text-sm text-gray-400">Connected:</span>
              <span className="ml-2 font-mono text-sm text-cyan-400">
                {formatAddress(address)}
              </span>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/20 flex items-center space-x-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
} 