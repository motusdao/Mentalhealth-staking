import React, { useState } from 'react';
import { encodeFunctionData } from 'viem';
import { celoAlfajores } from 'viem/chains';
import StakingABI from '../abi/HealthStakingFund.json';
import WalletConnect from '../components/WalletConnect';
import { useWallet } from '../context/WalletContext';

const STAKING_CONTRACT_ADDRESS = '0x64608C2d5E4685830348e9155bAB423bf905E9c9' as const;
const FEE_CURRENCY = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const;

export default function Stake() {
  const { client, address, walletConnected } = useWallet();
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  async function stakeCUSD() {
    if (!client || !walletConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsStaking(true);
      setError('');

      const stakeAmount = BigInt(parseFloat(amount) * 1e18);

      const data = encodeFunctionData({
        abi: StakingABI as any,
        functionName: 'stakeCUSD',
        args: [stakeAmount, BigInt(0)],
      });

      const hash = await client.sendTransaction({
        chain: celoAlfajores,
        to: STAKING_CONTRACT_ADDRESS,
        data,
        account: address as `0x${string}`,
        feeCurrency: FEE_CURRENCY,
      });

      setTxHash(hash);
    } catch (error) {
      console.error('Staking error:', error);
      setError('Failed to stake. Please try again.');
    } finally {
      setIsStaking(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Institutional Staking</h1>
        <p className="text-gray-400">
          Stake CUSD tokens to support healthcare initiatives and earn rewards
        </p>
      </div>

      <div className="bg-black/60 border border-cyan-500/20 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Staking Details</h2>
          <WalletConnect />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount to Stake (cUSD)
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/60 text-white border border-cyan-500/20 rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400">cUSD</span>
              </div>
            </div>
          </div>

          <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Staking Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Current APY</p>
                <p className="text-lg font-semibold text-cyan-400">12.5%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Lock Period</p>
                <p className="text-lg font-semibold text-cyan-400">30 days</p>
              </div>
            </div>
          </div>

          <button
            onClick={stakeCUSD}
            disabled={!amount || isStaking || !walletConnected}
            className="w-full bg-cyan-600/80 text-white py-3 px-6 rounded-lg hover:bg-cyan-700/80 transition-colors disabled:bg-gray-800/60 disabled:cursor-not-allowed"
          >
            {isStaking ? 'Staking...' : !walletConnected ? 'Connect Wallet to Stake' : 'Stake CUSD'}
          </button>

          {error && (
            <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {txHash && (
            <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-2">Transaction Hash</p>
              <p className="font-mono text-sm text-cyan-400 break-all">{txHash}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 