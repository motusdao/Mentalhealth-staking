import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const actionBoxes = [
    {
      title: 'Stake CUSD',
      description: 'Stake your CUSD tokens to earn rewards and support mental health initiatives.',
      buttonText: 'Start Staking',
      onClick: () => navigate('/stake'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add Liquidity',
      description: 'Provide liquidity to the pool and earn additional rewards.',
      buttonText: 'Add Liquidity',
      onClick: () => navigate('/liquidity'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View APY',
      description: 'Check current APY rates and your potential earnings.',
      buttonText: 'View APY',
      onClick: () => navigate('/apy'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Stake4Health
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A revolutionary platform combining DeFi staking with mental health initiatives.
            Stake your CUSD tokens to earn rewards while supporting important mental health projects.
          </p>
        </div>

        {/* Action Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {actionBoxes.map((box, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {box.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {box.description}
                </p>
                <button
                  onClick={box.onClick}
                  className={`w-full ${box.color} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300`}
                >
                  {box.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 