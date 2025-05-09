import React, { useState, useEffect } from 'react';
import { encodeFunctionData, parseUnits, createPublicClient, http } from 'viem';
import { celoAlfajores } from 'viem/chains';
import StakingABI from '../abi/HealthStakingFund.json';
import WalletConnect from '../components/WalletConnect';
import { useWallet } from '../context/WalletContext';

const STAKING_CONTRACT_ADDRESS = '0x4afea607fc9545c56449082fcbb4587ea0e4d45c' as const;
const CUSD_TOKEN_ADDRESS = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1' as const;
const FEE_CURRENCY = CUSD_TOKEN_ADDRESS;

// ERC20 ABI for token approval
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
});

export default function Stake() {
  const { client, address, walletConnected } = useWallet();
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [staked, setStaked] = useState<{ amount: string; duration: string } | null>(null);

  // Fetch user's staked amount and lock days
  useEffect(() => {
    async function fetchStake() {
      if (!walletConnected || !address) {
        setStaked(null);
        return;
      }
      try {
        const data = await publicClient.readContract({
          address: STAKING_CONTRACT_ADDRESS,
          abi: StakingABI,
          functionName: 'getUserStake',
          args: [address],
        });
        const [amount, duration] = data as [bigint, bigint];
        setStaked({
          amount: (Number(amount) / 1e18).toFixed(2),
          duration: duration.toString(),
        });
      } catch (err) {
        setStaked(null);
      }
    }
    fetchStake();
  }, [walletConnected, address, txHash]);

  async function approveCUSD() {
    if (!client || !walletConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsApproving(true);
      setError('');

      const approveAmount = parseUnits(amount, 18);
      const approveData = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [STAKING_CONTRACT_ADDRESS, approveAmount],
      });

      const approveHash = await client.sendTransaction({
        chain: celoAlfajores,
        to: CUSD_TOKEN_ADDRESS,
        data: approveData,
        account: address as `0x${string}`,
        feeCurrency: FEE_CURRENCY,
      });

      // Wait for approval transaction to be mined
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds for transaction to be mined
      return true;
    } catch (error) {
      console.error('Approval error:', error);
      setError('Failed to approve cUSD spending. Please try again.');
      return false;
    } finally {
      setIsApproving(false);
    }
  }

  async function stakeCUSD() {
    if (!client || !walletConnected || !address) {
      setError('Please connect your wallet first');
      setSuccess('');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      setSuccess('');
      return;
    }
    try {
      setIsStaking(true);
      setError('');
      setSuccess('');
      // First approve the token spending
      const approved = await approveCUSD();
      if (!approved) {
        return;
      }
      const stakeAmount = parseUnits(amount, 18);
      const duration = 30 * 24 * 60 * 60; // 30 days in seconds
      const data = encodeFunctionData({
        abi: StakingABI,
        functionName: 'stakeCUSD',
        args: [stakeAmount, duration],
      });
      const hash = await client.sendTransaction({
        chain: celoAlfajores,
        to: STAKING_CONTRACT_ADDRESS,
        data,
        account: address as `0x${string}`,
        feeCurrency: FEE_CURRENCY,
        value: BigInt(0),
        gas: BigInt(1000000)
      });
      setTxHash(hash);
      setSuccess('Stake successful!');
      setError('');
    } catch (error: any) {
      console.error('Staking error:', error);
      setError(error?.message || JSON.stringify(error) || 'Failed to stake. Please try again.');
      setSuccess('');
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
        <p className="text-lg text-cyan-300 max-w-2xl mx-auto leading-relaxed mt-4">
          <strong>How Your Stake Helps:</strong> All yield generated from staked funds is used to pay for mental health services, making every staker a direct supporter of mental health access.
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

          {/* Show user's staked amount and lock days */}
          {staked && (
            <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Your Stake</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Staked Amount</p>
                  <p className="text-lg font-semibold text-cyan-400">{staked.amount} cUSD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lock Duration</p>
                  <p className="text-lg font-semibold text-cyan-400">{staked.duration} seconds</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={stakeCUSD}
            disabled={!amount || isStaking || isApproving || !walletConnected}
            className="w-full bg-cyan-600/80 text-white py-3 px-6 rounded-lg hover:bg-cyan-700/80 transition-colors disabled:bg-gray-800/60 disabled:cursor-not-allowed"
          >
            {isApproving ? 'Approving...' : isStaking ? 'Staking...' : !walletConnected ? 'Connect Wallet to Stake' : 'Stake CUSD'}
          </button>

          {/* Show error and success messages */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/20 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {txHash && (
            <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-2">Transaction Hash</p>
              <p className="font-mono text-sm text-cyan-400 break-all">{txHash}</p>
              <a
                href={`https://alfajores.celoscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline mt-2 inline-block"
              >
                View on Celo Explorer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 