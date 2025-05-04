import React, { useState } from 'react';

const Liquidity: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const handleAddLiquidity = async () => {
    try {
      setIsAdding(true);
      setError('');
      // TODO: Implement liquidity addition logic
      console.log('Adding liquidity:', amount);
    } catch (err) {
      console.error('Liquidity error:', err);
      setError(err instanceof Error ? err.message : 'Failed to add liquidity');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Liquidity</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Add (cUSD)
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
          onClick={handleAddLiquidity}
          disabled={isAdding || !amount}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white
            ${isAdding || !amount
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 transition-colors'
            }
          `}
        >
          {isAdding ? 'Adding Liquidity...' : 'Add Liquidity'}
        </button>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Liquidity; 