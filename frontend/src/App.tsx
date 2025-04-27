import { useEffect, useState } from 'react';
import { createWalletClient, custom, formatEther, encodeFunctionData } from 'viem';
import { celoAlfajores } from 'viem/chains';
import StakingABI from './abi/HealthStakingFund.json';
import './App.css';

const STAKING_CONTRACT_ADDRESS = '0x64608C2d5E4685830348e9155bAB423bf905E9c9' as const;
const FEE_CURRENCY = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const;

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if MiniPay is available
    if (window.ethereum && window.ethereum.isMiniPay) {
      setError('');
    } else {
      setError('MiniPay wallet not detected. Please install MiniPay to use this application.');
    }
  }, []);

  async function connectWallet() {
    try {
      setError('');
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      const [userAddress] = await client.getAddresses();
      setAddress(userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error('Connection error:', error);
      setError('Failed to connect wallet. Please try again.');
    }
  }

  async function stakeCUSD() {
    try {
      setError('');
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });

      const stakeAmount = BigInt(parseFloat(amount) * 1e18);

      const data = encodeFunctionData({
        abi: StakingABI as any,
        functionName: 'stakeCUSD',
        args: [stakeAmount, BigInt(0)],
      });

      const hash = await client.sendTransaction({
        to: STAKING_CONTRACT_ADDRESS,
        data,
        account: address as `0x${string}`,
        feeCurrency: FEE_CURRENCY,
      });

      setTxHash(hash);
    } catch (error) {
      console.error('Staking error:', error);
      setError('Failed to stake. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Stake4Health</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!walletConnected ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Connect MiniPay Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Connected Wallet</p>
              <p className="font-mono text-sm break-all">{address}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amount to Stake (cUSD)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={stakeCUSD}
              disabled={!amount}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Stake to Health Fund
            </button>

            {txHash && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Transaction Hash</p>
                <p className="font-mono text-sm break-all">{txHash}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
