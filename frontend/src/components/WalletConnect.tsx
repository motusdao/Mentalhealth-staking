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
          className="bg-cyan-600/80 text-white py-2 px-4 rounded-lg hover:bg-cyan-700/80 transition-colors"
        >
          Connect MiniPay
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="bg-black/60 border border-cyan-500/20 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-400">Connected:</span>
            <span className="ml-2 font-mono text-sm text-cyan-400">
              {formatAddress(address)}
            </span>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}
    </div>
  );
} 