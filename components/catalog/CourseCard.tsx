
import React, { useState } from 'react';
import { Product } from '../../types';
import TagIcon from '../icons/TagIcon';
import ClockIcon from '../icons/ClockIcon';
import KaspiIcon from '../icons/KaspiIcon';

interface CourseCardProps {
  product: Product;
  onSelectCourse: (courseName: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ product, onSelectCourse }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-5 flex flex-col justify-between h-full transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20">
      <div>
        <h3 className="font-bold text-lg text-white mb-2">{product.name}</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-300 text-sm mb-3">
          <span className="flex items-center">
            <TagIcon /> {product.price}
          </span>
          <span className="flex items-center">
            <ClockIcon /> {product.duration}
          </span>
          {product.installmentLink && (
            <span className="flex items-center font-medium text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>3 айға бөліп төлеу</span>
            </span>
          )}
          {product.kaspiLink && (
            <span className="flex items-center font-medium text-red-400">
                <KaspiIcon className="h-4 w-4 mr-1.5" />
                <span>Kaspi</span>
            </span>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {product.shortDescription}
          </p>
          {isTooltipVisible && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg z-10">
              {product.shortDescription}
              <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" aria-hidden="true">
                <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onSelectCourse(product.name)}
        className="w-full text-center bg-gray-600/70 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 mt-auto"
      >
        Толығырақ
      </button>
    </div>
  );
};

export default CourseCard;
