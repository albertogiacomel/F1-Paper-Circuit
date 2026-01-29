import React from 'react';

interface F1CarIconProps extends React.SVGProps<SVGSVGElement> {
  color: string;
  borderColor: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const F1CarIcon = ({ color, borderColor, className = "", ...props }: F1CarIconProps) => (
  <svg viewBox="0 0 50 30" className={className} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} {...props}>
    <g transform="translate(0, 0)">
        <rect x="0" y="5" width="8" height="20" rx="2" fill={borderColor} />
        <path d="M 10 10 L 45 12 L 48 15 L 45 18 L 10 20 Z" fill={color} stroke={borderColor} strokeWidth="2" />
        <path d="M 45 8 L 45 22 L 50 20 L 50 10 Z" fill={borderColor} />
        <circle cx="25" cy="15" r="4" fill="white" stroke="black" strokeWidth="1" />
        <rect x="5" y="0" width="12" height="8" rx="3" fill="#1e293b" />
        <rect x="5" y="22" width="12" height="8" rx="3" fill="#1e293b" />
        <rect x="35" y="2" width="10" height="6" rx="2" fill="#1e293b" />
        <rect x="35" y="22" width="10" height="6" rx="2" fill="#1e293b" />
    </g>
  </svg>
);