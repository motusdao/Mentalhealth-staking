import React, { useState } from 'react';
import { ContractKit } from '@celo/contractkit';
import { newKit } from '@celo/contractkit';
import Web3 from 'web3';
import StakingABI from '../abi/HealthStakingFund.json';

// Original contract addresses
const STAKING_CONTRACT_ADDRESS = '0x4afea607fc9545c56449082fcbb4587ea0e4d45c';
const CUSD_TOKEN_ADDRESS = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';

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

      // Initialize ContractKit
      const web3 = new Web3((window as any).ethereum);
      const kit = newKit(web3.currentProvider as any);

      // Get the staking contract
      const stakingContract = new kit.web3.eth.Contract(
        StakingABI as any,
        STAKING_CONTRACT_ADDRESS
      );

      // Get the cUSD contract
      const cUSDContract = new kit.web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              { name: '_spender', type: 'address' },
              { name: '_value', type: 'uint256' }
            ],
            name: 'approve',
            outputs: [{ name: '', type: 'bool' }],
            type: 'function'
          }
        ],
        CUSD_TOKEN_ADDRESS
      );

      const stakeAmount = kit.web3.utils.toWei(amount, 'ether');

      // Get the current gas price
      const gasPrice = await kit.web3.eth.getGasPrice();

      // Approve the staking contract to spend cUSD
      const approveTx = await cUSDContract.methods
        .approve(STAKING_CONTRACT_ADDRESS, stakeAmount)
        .send({ 
          from: address,
          gasPrice: gasPrice
        });

      // Stake the cUSD
      const stakeTx = await stakingContract.methods
        .stakeCUSD(stakeAmount, 0) // 0 for Community pool
        .send({ 
          from: address,
          gasPrice: gasPrice
        });

      setTxHash(stakeTx.transactionHash);
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