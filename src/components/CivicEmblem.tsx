import React from 'react';

interface CivicEmblemProps {
  className?: string;
  lang?: 'ne' | 'en';
}

export const CivicEmblem: React.FC<CivicEmblemProps> = ({ className = 'w-10 h-10', lang = 'ne' }) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      {/* Outer subtle gold ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-sm">
        {/* Inner rich crimson core */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8f1515] to-[#6b0f0f] flex items-center justify-center">
          {/* Subtle civic star / rays glow */}
          <div className="absolute inset-0.5 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent" />
          
          {/* Central Monogram */}
          <span className="relative z-10 font-bold text-white font-serif tracking-tight select-none leading-none translate-y-[-0.5px] text-[15px]">
            {lang === 'ne' ? 'रो' : 'RP'}
          </span>
        </div>
      </div>
    </div>
  );
};
