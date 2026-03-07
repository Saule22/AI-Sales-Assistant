import React from 'react';
import { Product } from '../types';
import CreditCardIcon from './icons/CreditCardIcon';
import CalendarIcon from './icons/CalendarIcon';
import KaspiIcon from './icons/KaspiIcon';


interface PaymentConfirmationModalProps {
  isOpen: boolean;
  product: Product | null;
  onConfirm: (url: string) => void;
  onCancel: () => void;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({ isOpen, product, onConfirm, onCancel }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 transform transition-all animate-fade-in-up">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Сатып алуды растау</h2>
          <p className="text-gray-400 text-center mb-6">Сіз "{product.name}" курсын сатып алғалы жатырсыз.</p>

          <div className="bg-gray-700/50 rounded-lg p-4 mb-6 space-y-2">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-300 text-sm">{product.shortDescription}</p>
            <div className="flex justify-between items-center border-t border-gray-600/50 pt-2 mt-2">
              <span className="text-gray-300">Бағасы:</span>
              <span className="text-xl font-bold text-cyan-400">{product.price}</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-gray-300">Ұзақтығы:</span>
              <span className="text-gray-300 font-medium">{product.duration}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onConfirm(product.paymentLink)}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 shadow-lg"
            >
              <CreditCardIcon />
              <span>Толық төлеу</span>
            </button>
            {product.installmentLink && (
              <button
                onClick={() => onConfirm(product.installmentLink!)}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 shadow-lg"
              >
                <CalendarIcon />
                <span>Бөліп төлеу (3 ай)</span>
              </button>
            )}
            {product.kaspiLink && (
                <button
                    onClick={() => onConfirm(product.kaspiLink!)}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ease-in-out bg-red-500 hover:bg-red-600 hover:scale-105 shadow-lg"
                >
                    <KaspiIcon className="h-5 w-5 mr-2" />
                    <span>Kaspi арқылы</span>
                </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white font-medium transition-colors"
            >
              Бас тарту
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
