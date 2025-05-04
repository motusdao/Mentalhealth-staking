import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createWalletClient, custom } from 'viem';
import { celoAlfajores } from 'viem/chains';

interface WalletContextType {
  walletConnected: boolean;
  address: string;
  error: string;
  connectWallet: () => Promise<void>;
  client: ReturnType<typeof createWalletClient> | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [client, setClient] = useState<ReturnType<typeof createWalletClient> | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      setError('');
    } else {
      setError('MetaMask not detected. Please install MetaMask to use this application.');
    }
  }, []);

  async function connectWallet() {
    try {
      setError('');
      const newClient = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      
      const [userAddress] = await newClient.getAddresses();
      setAddress(userAddress);
      setWalletConnected(true);
      setClient(newClient);
    } catch (error) {
      console.error('Connection error:', error);
      setError('Failed to connect wallet. Please try again.');
    }
  }

  return (
    <WalletContext.Provider value={{ walletConnected, address, error, connectWallet, client }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 