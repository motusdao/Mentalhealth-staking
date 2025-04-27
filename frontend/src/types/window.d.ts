import { EthereumProvider } from 'viem';

declare global {
  interface Window {
    ethereum?: EthereumProvider & {
      isMiniPay?: boolean;
    }
  }
} 