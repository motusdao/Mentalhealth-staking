import React from 'react';

const APY: React.FC = () => {
  // TODO: Fetch actual APY data from the contract
  const apyData = {
    staking: 12.5,
    liquidity: 8.3,
    totalStaked: '1,234,567',
    totalLiquidity: '567,890'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">APY Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Staking APY Card */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Staking APY</h3>
          <div className="text-4xl font-bold text-blue-600 mb-4">
            {apyData.staking}%
          </div>
          <p className="text-blue-700">
            Total Staked: {apyData.totalStaked} cUSD
          </p>
        </div>

        {/* Liquidity APY Card */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-2">Liquidity APY</h3>
          <div className="text-4xl font-bold text-green-600 mb-4">
            {apyData.liquidity}%
          </div>
          <p className="text-green-700">
            Total Liquidity: {apyData.totalLiquidity} cUSD
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">How APY Works</h3>
        <div className="space-y-4 text-gray-600">
          <p>
            The APY (Annual Percentage Yield) represents the total return on your investment over a year,
            including compound interest.
          </p>
          <p>
            Staking APY is calculated based on the total amount staked and the rewards distributed from
            the health fund's operations.
          </p>
          <p>
            Liquidity APY is determined by the trading fees generated from the liquidity pool and
            distributed to liquidity providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APY; 