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
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to use this application.');
      return;
    }

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const newClient = createWalletClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
          });
          setAddress(accounts[0]);
          setWalletConnected(true);
          setClient(newClient);
        }
      } catch (err) {
        console.error('Error checking connection:', err);
      }
    };

    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWalletConnected(false);
        setAddress('');
        setClient(null);
      } else {
        setAddress(accounts[0]);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  async function connectWallet() {
    try {
      setError('');
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Create wallet client
      const newClient = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });

      // Switch to Celo Alfajores network if not already on it
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '44787' }], // 0xaef3 is the chain ID for Celo Alfajores
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '44787',
                  chainName: 'Celo Alfajores',
                  nativeCurrency: {
                    name: 'CELO',
                    symbol: 'CELO',
                    decimals: 18,
                  },
                  rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
                  blockExplorerUrls: ['https://alfajores.celoscan.io'],
                },
              ],
            });
          } catch (addError) {
            throw new Error('Failed to add Celo Alfajores network to MetaMask');
          }
        } else {
          throw new Error('Failed to switch to Celo Alfajores network');
        }
      }

      setAddress(accounts[0]);
      setWalletConnected(true);
      setClient(newClient);
    } catch (error: any) {
      console.error('Connection error:', error);
      setError(error.message || 'Failed to connect wallet. Please try again.');
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