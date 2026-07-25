import React from 'react';

interface WSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const WSLogo: React.FC<WSLogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', subText: 'text-[9px]' },
    md: { icon: 44, text: 'text-lg', subText: 'text-[10px]' },
    lg: { icon: 64, text: 'text-2xl', subText: 'text-xs' },
    xl: { icon: 96, text: 'text-4xl', subText: 'text-sm' },
  };

  const dim = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Metallic & Electric Blue Emblem */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: dim.icon, height: dim.icon }}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(0,102,255,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Ring Gradient */}
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Metallic Silver Gradient */}
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Electric Blue Gradient */}
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="#0242a5" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Dark Circle */}
          <circle cx="100" cy="100" r="90" fill="#080e1e" stroke="url(#ringGrad)" strokeWidth="6" />

          {/* Outer Metallic Ring Arc */}
          <path
            d="M 25,100 A 75,75 0 1,1 175,100"
            fill="none"
            stroke="url(#silverGrad)"
            strokeWidth="4"
            strokeDasharray="180 20"
          />

          {/* Candlesticks in emblem lower right */}
          <g transform="translate(82, 110)">
            {/* Bullish Blue Candle 1 */}
            <line x1="10" y1="5" x2="10" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <rect x="7" y="12" width="6" height="15" fill="#2563eb" rx="1" />

            {/* Bearish Silver Candle 2 */}
            <line x1="22" y1="0" x2="22" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <rect x="19" y="8" width="6" height="22" fill="url(#silverGrad)" rx="1" />

            {/* Bullish Blue Candle 3 */}
            <line x1="34" y1="8" x2="34" y2="38" stroke="#3b82f6" strokeWidth="2" />
            <rect x="31" y="15" width="6" height="16" fill="#0066ff" rx="1" />

            {/* Silver Candle 4 */}
            <line x1="46" y1="2" x2="46" y2="32" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="43" y="10" width="6" height="14" fill="#cbd5e1" rx="1" />
          </g>

          {/* Dynamic Metallic Swoosh */}
          <path
            d="M 30,145 Q 75,115 175,35 C 150,60 100,105 50,128 Z"
            fill="url(#silverGrad)"
            filter="url(#glow)"
          />

          {/* "W" Letter */}
          <path
            d="M 40,58 L 56,108 L 70,72 L 84,108 L 100,58 L 86,58 L 76,86 L 68,62 L 60,62 L 52,86 L 42,58 Z"
            fill="url(#blueGrad)"
          />

          {/* "S" Letter */}
          <path
            d="M 112,68 C 112,60 120,56 132,56 C 146,56 156,62 160,68 L 148,78 C 144,74 138,70 132,70 C 126,70 122,72 122,76 C 122,80 126,82 136,86 C 150,90 162,96 162,108 C 162,122 148,128 132,128 C 116,128 104,120 98,110 L 112,100 C 116,108 124,114 134,114 C 142,114 148,110 148,104 C 148,98 142,96 132,92 C 118,88 112,82 112,68 Z"
            fill="url(#silverGrad)"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-black tracking-tight text-white leading-none">
            <span className={`font-extrabold ${dim.text} text-gradient-blue tracking-wider`}>WS</span>
            <span className={`font-bold ${dim.text} text-white tracking-wide`}>INFINITY BOT</span>
          </div>
          <div className="flex items-center justify-between w-full mt-1">
            <span className={`font-semibold tracking-[0.25em] text-slate-400 uppercase ${dim.subText}`}>
              WILL SANTOS
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
