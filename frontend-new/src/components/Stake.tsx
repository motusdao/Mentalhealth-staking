import React, { useState } from 'react';
import { createWalletClient, custom, encodeFunctionData } from 'viem';
import { celoAlfajores } from 'viem/chains';
import StakingABI from '../abi/HealthStakingFund.json';

const STAKING_CONTRACT_ADDRESS = '0x64608C2d5E4685830348e9155bAB423bf905E9c9' as const;
const FEE_CURRENCY = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const;

interface StakeProps {
  address: string;
}

const Stake: React.FC<StakeProps> = ({ address }) => {
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleStake = async () => {
    try {
      setIsStaking(true);
      setError('');
      setTxHash('');

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
    } catch (err) {
      console.error('Staking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to stake tokens');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Stake CUSD</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Stake (cUSD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleStake}
          disabled={isStaking || !amount}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white
            ${isStaking || !amount
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 transition-colors'
            }
          `}
        >
          {isStaking ? 'Staking...' : 'Stake Tokens'}
        </button>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {txHash && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Transaction Hash</p>
            <p className="font-mono text-sm break-all">{txHash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stake; 