import React from 'react';

interface KaspiIconProps {
  className?: string;
}

const KaspiIcon: React.FC<KaspiIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
  >
    <circle cx={64} cy={64} r={64} fill="#f14635" />
    <path
      fill="#fff"
      d="M59.34 23.333l-18.4 18.4v62.934h19.2V65.8l18.4-18.4V23.333H59.34zm20.8 45.6l-1.6-1.6-17.6-17.6V39.333h19.2v29.6z"
    />
  </svg>
);

export default KaspiIcon;
