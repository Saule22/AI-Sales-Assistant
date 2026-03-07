
import React from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

interface ActionFooterProps {
  isEnabled: boolean;
  onInitiatePurchase: () => void;
}

const ActionFooter: React.FC<ActionFooterProps> = ({ isEnabled, onInitiatePurchase }) => {

  const handleClick = () => {
    if (isEnabled) {
      onInitiatePurchase();
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700/50">
      <button
        onClick={handleClick}
        disabled={!isEnabled}
        className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500
          ${
            isEnabled
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 shadow-lg'
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          }
        `}
        aria-label="Сатып алу"
      >
        <ShoppingCartIcon />
        <span>Сатып алу</span>
      </button>
    </div>
  );
};

export default ActionFooter;
