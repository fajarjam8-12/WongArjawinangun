import React, { useState } from 'react';
import logoImage from '../../assets/logo.jpg';

export interface DriverLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  variant?: 'full' | 'compact' | 'badge-only';
}

export const DriverLogo: React.FC<DriverLogoProps> = ({ 
  size = 'lg', 
  showBadge = true,
  className = '',
  variant = 'full'
}) => {
  const [imageError, setImageError] = useState(false);

  const dimensionMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-52 h-52 sm:w-60 sm:h-60'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer dynamic glowing circle aura */}
      <div className={`relative ${dimensionMap[size]} flex items-center justify-center flex-shrink-0`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 opacity-20 blur-xl animate-pulse pointer-events-none" />
        
        {/* Render Primary Emblem Logo (Matching User Reference: Water Tower, Village, Courier, MITRA top, ARJAWINANGUN DELIVERY bottom) */}
        {!imageError ? (
          <img
            src={logoImage}
            alt="Logo Mitra Arjawinangun Delivery"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-full drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        ) : (
          /* High-Fidelity Vector SVG Fallback */
          <svg
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="30%" stopColor="#FDE68A" />
                <stop offset="65%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              <linearGradient id="innerBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="45%" stopColor="#047857" />
                <stop offset="85%" stopColor="#022C22" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="40%" stopColor="#065F46" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>

              <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#022C22" />
                <stop offset="20%" stopColor="#064E3B" />
                <stop offset="50%" stopColor="#047857" />
                <stop offset="80%" stopColor="#064E3B" />
                <stop offset="100%" stopColor="#022C22" />
              </linearGradient>

              <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* 1. OUTER DUAL GOLD RIM & EMERALD SEAL */}
            <circle cx="120" cy="120" r="115" fill="#022C22" stroke="url(#goldRingGrad)" strokeWidth="6" />
            <circle cx="120" cy="120" r="106" fill="url(#innerBgGrad)" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />

            {/* Sky Background Circle */}
            <circle cx="120" cy="120" r="96" fill="url(#skyGrad)" />

            {/* Radiant Sunburst behind water tower */}
            <circle cx="120" cy="115" r="32" fill="#FEF08A" opacity="0.6" filter="blur(4px)" />

            {/* 2. ARJAWINANGUN VILLAGE SKYLINE SILHOUETTE */}
            <path
              d="M 32 145 
                 L 45 136 L 58 145 L 62 134 L 75 125 L 88 134 L 92 145
                 L 148 145 L 152 135 L 165 126 L 178 135 L 182 145 L 195 137 L 208 145
                 L 208 175 L 32 175 Z"
              fill="#064E3B"
            />
            {/* Village Palm Trees Silhouettes */}
            <path d="M 50 138 Q 45 128 35 128 M 50 138 Q 48 126 50 120 M 50 138 Q 54 127 62 128" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
            <path d="M 190 138 Q 185 128 178 128 M 190 138 Q 190 126 193 120 M 190 138 Q 196 127 204 128" stroke="#047857" strokeWidth="2" strokeLinecap="round" />

            {/* 3. ICONIC ARJAWINANGUN WATER TOWER (MENARA AIR ARJAWINANGUN) */}
            <g id="waterTower">
              {/* Telecommunication Antenna Spire at Top */}
              <line x1="120" y1="28" x2="120" y2="78" stroke="#FDE68A" strokeWidth="2.5" />
              {/* Antenna Rings / Signal Radiations */}
              <circle cx="120" cy="30" r="3" fill="#F59E0B" />
              <path d="M 112 40 Q 120 36 128 40" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 108 46 Q 120 40 132 46" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.8" />
              
              {/* Antenna Latticework Mast */}
              <line x1="117" y1="52" x2="123" y2="52" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="116" y1="62" x2="124" y2="62" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="115" y1="72" x2="125" y2="72" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="116" y1="52" x2="124" y2="62" stroke="#FDE68A" strokeWidth="1" />
              <line x1="124" y1="52" x2="116" y2="62" stroke="#FDE68A" strokeWidth="1" />
              <line x1="116" y1="62" x2="124" y2="72" stroke="#FDE68A" strokeWidth="1" />
              <line x1="124" y1="62" x2="116" y2="72" stroke="#FDE68A" strokeWidth="1" />

              {/* Tower Conical Roof & Top Rim */}
              <polygon points="120,68 138,82 102,82" fill="#047857" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="120" cy="68" r="2.5" fill="#FDE68A" />

              {/* Main Cylindrical Water Reservoir Tank */}
              <rect x="105" y="82" width="30" height="22" rx="3" fill="#E2E8F0" stroke="#047857" strokeWidth="1.5" />
              <rect x="117" y="86" width="6" height="8" rx="1.5" fill="#065F46" />
              <line x1="108" y1="84" x2="108" y2="102" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

              {/* Tank Platform & Railing Walkway */}
              <rect x="100" y="104" width="40" height="4" rx="2" fill="#047857" stroke="#F59E0B" strokeWidth="1" />

              {/* Tower Support Legs */}
              <line x1="106" y1="108" x2="102" y2="148" stroke="#FDE68A" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="134" y1="108" x2="138" y2="148" stroke="#FDE68A" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="120" y1="108" x2="120" y2="148" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
              <line x1="105" y1="118" x2="135" y2="128" stroke="#F59E0B" strokeWidth="1.2" />
              <line x1="135" y1="118" x2="105" y2="128" stroke="#F59E0B" strokeWidth="1.2" />
              <line x1="104" y1="132" x2="136" y2="144" stroke="#F59E0B" strokeWidth="1.2" />
              <line x1="136" y1="132" x2="104" y2="144" stroke="#F59E0B" strokeWidth="1.2" />
            </g>

            {/* 4. WINDING ROAD */}
            <path
              d="M 120 142 Q 135 152 145 160 Q 165 174 190 182 L 80 182 Q 105 165 120 142 Z"
              fill="#1E293B"
            />
            <path
              d="M 121 144 Q 130 152 138 160 Q 148 170 158 182"
              stroke="#FDE68A"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* 5. COURIER MOTORCYCLE */}
            <g id="courierRider">
              <circle cx="114" cy="162" r="7.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="138" cy="160" r="7.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
              <path d="M 114 162 L 124 156 L 133 156 L 138 160" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
              <rect x="110" y="145" width="10" height="10" rx="2" fill="#047857" stroke="#10B981" strokeWidth="1" />
              <circle cx="127" cy="144" r="3.5" fill="#059669" />
              <circle cx="129" cy="139" r="4" fill="#047857" stroke="#FDE68A" strokeWidth="1" />
            </g>

            {/* 6. TOP ARC BADGE: "MITRA" (Kecil Sesuai Instruksi User) */}
            <g>
              <path
                d="M 72 52 Q 120 34 168 52 L 164 40 Q 120 24 76 40 Z"
                fill="#064E3B"
                stroke="#F59E0B"
                strokeWidth="1.2"
              />
              <text
                x="120"
                y="44"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="9"
                fontWeight="900"
                letterSpacing="0.32em"
              >
                ★ MITRA ★
              </text>
            </g>

            {/* 7. LOWER RIBBON BANNER: "ARJAWINANGUN DELIVERY" (Besar & Dominan) */}
            <g filter="url(#shadowFilter)">
              <polygon points="18,175 35,160 35,190 18,205 26,190" fill="#022C22" stroke="#F59E0B" strokeWidth="1" />
              <polygon points="222,175 205,160 205,190 222,205 214,190" fill="#022C22" stroke="#F59E0B" strokeWidth="1" />

              <rect
                x="26"
                y="164"
                width="188"
                height="44"
                rx="10"
                fill="url(#bannerGrad)"
                stroke="url(#goldRingGrad)"
                strokeWidth="2.8"
              />

              <rect
                x="30"
                y="168"
                width="180"
                height="36"
                rx="8"
                fill="none"
                stroke="#34D399"
                strokeWidth="1"
                strokeDasharray="4 2"
                opacity="0.7"
              />

              <text
                x="120"
                y="183"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="14.5"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                letterSpacing="0.08em"
                style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.9))' }}
              >
                ARJAWINANGUN
              </text>

              <text
                x="120"
                y="198"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                letterSpacing="0.25em"
                style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.9))' }}
              >
                ★ DELIVERY ★
              </text>
            </g>

            <polygon points="120,12 122,16 126,16 123,19 124,23 120,21 116,23 117,19 114,16 118,16" fill="#FBBF24" />
            <circle cx="48" cy="56" r="3" fill="#FBBF24" />
            <circle cx="192" cy="56" r="3" fill="#FBBF24" />
            <circle cx="36" cy="120" r="2.5" fill="#FBBF24" />
            <circle cx="204" cy="120" r="2.5" fill="#FBBF24" />
          </svg>
        )}
      </div>

      {/* TYPOGRAPHY BADGE UNDER EMBLEM (IF ENABLED) */}
      {showBadge && (
        <div className="mt-3 flex flex-col items-center text-center">
          {/* Tulisan MITRA (Dibuat Kecil sesuai instruksi) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300 shadow-xs mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            MITRA
          </div>

          {/* Tulisan ARJAWINANGUN DELIVERY (Dibuat Agak Besar sesuai instruksi) */}
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
            ARJAWINANGUN <span className="text-emerald-400">DELIVERY</span>
          </h2>

          <p className="text-[11px] font-medium text-emerald-200/80 mt-0.5">
            Layanan Antar Cepat, Aman & Terpercaya
          </p>
        </div>
      )}
    </div>
  );
};
