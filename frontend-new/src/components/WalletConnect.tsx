import React, { useState } from 'react';
import { createWalletClient, custom } from 'viem';
import { celoAlfajores } from 'viem/chains';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError('');

      if (!window.ethereum || !window.ethereum.isMiniPay) {
        throw new Error('MiniPay wallet not detected. Please install MiniPay to use this application.');
      }

      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });

      const [userAddress] = await client.getAddresses();
      onConnect(userAddress);
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`
          px-6 py-3 rounded-lg font-semibold text-white
          ${isConnecting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 transition-colors'
          }
        `}
      >
        {isConnecting ? 'Connecting...' : 'Connect MiniPay Wallet'}
      </button>

      {error && (
        <div className="text-red-500 text-sm text-center max-w-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 