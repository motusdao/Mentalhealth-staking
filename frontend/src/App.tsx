import { useEffect, useState } from 'react';
import { createWalletClient, custom, formatEther } from 'viem';
import { celoAlfajores } from 'viem/chains';
import { abi as StakingABI } from '../abi/HealthStakingFund.json';

const STAKING_CONTRACT_ADDRESS = '0x64608C2d5E4685830348e9155bAB423bf905E9c9'; // example


export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      connectWallet();
    }
  }, []);

  async function connectWallet() {
    try {
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      const [userAddress] = await client.getAddresses();
      setAddress(userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  async function stakeCUSD() {
    try {
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });

      const stakeAmount = BigInt(parseFloat(amount) * 1e18);

      const hash = await client.sendTransaction({
        to: STAKING_CONTRACT_ADDRESS,
        data: {
          abi: StakingABI,
          functionName: 'stakeCUSD',
          args: [stakeAmount, 0],
        },
        account: address,
        feeCurrency: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
      });

      setTxHash(hash);
    } catch (error) {
      console.error('Staking error:', error);
    }
  }

  return (
    <div className="min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Stake4Health (MiniPay)</h1>
      {walletConnected ? (
        <div>
          <p className="mb-2">Connected as: {address}</p>
          <input
            type="number"
            placeholder="Amount in cUSD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded mb-2"
          />
          <br />
          <button
            onClick={stakeCUSD}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Stake to Health Fund
          </button>
          {txHash && <p className="mt-4">Tx Hash: {txHash}</p>}
        </div>
      ) : (
        <p>Loading MiniPay wallet...</p>
      )}
    </div>
  );
}
