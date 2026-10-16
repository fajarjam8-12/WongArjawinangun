import React from 'react';

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
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 opacity-25 blur-xl animate-pulse pointer-events-none" />
        
        {/* Crisp Vector Driver Circular Emblem */}
        <svg
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="35%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>

            <linearGradient id="emeraldShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>

            <linearGradient id="innerBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#022C22" />
              <stop offset="60%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="25%" stopColor="#047857" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="75%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            <linearGradient id="windSpeedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
              <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>

            <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* 1. OUTER EMBLEM CIRCLE WITH DUAL GOLD BORDER */}
          <circle cx="110" cy="110" r="105" fill="#022C22" stroke="url(#goldRingGrad)" strokeWidth="5" />
          <circle cx="110" cy="110" r="97" fill="url(#innerBgGrad)" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />

          {/* Top Subtitle Arc Badge: "★ MITRA ★" (Kecil seperti instruksi user) */}
          <g>
            {/* Top arched background ribbon */}
            <path 
              d="M 60 48 Q 110 32 160 48 L 156 34 Q 110 20 64 34 Z" 
              fill="#064E3B" 
              stroke="#F59E0B" 
              strokeWidth="1.2" 
            />
            {/* Small text "MITRA" */}
            <text 
              x="110" 
              y="39" 
              textAnchor="middle" 
              fill="#FDE68A" 
              fontSize="9" 
              fontWeight="900" 
              letterSpacing="0.28em"
            >
              ★ MITRA ★
            </text>
          </g>

          {/* Dynamic Speed Wind Streaks behind driver */}
          <path d="M 24 82 Q 55 80 82 82" stroke="url(#windSpeedGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 18 106 Q 58 104 96 106" stroke="url(#windSpeedGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 28 128 Q 62 126 86 128" stroke="url(#windSpeedGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Road / Motion Curve under the bike */}
          <path d="M 28 160 Q 110 178 192 160" stroke="#047857" strokeWidth="3" strokeDasharray="6 4" opacity="0.6" />

          {/* 2. MOTORCYCLE & WHEELS */}
          {/* Rear Wheel */}
          <circle cx="62" cy="136" r="21" fill="#0F172A" stroke="#334155" strokeWidth="5.5" />
          <circle cx="62" cy="136" r="13" fill="#1E293B" stroke="#64748B" strokeWidth="1.8" />
          <circle cx="62" cy="136" r="5" fill="#F8FAFC" />
          {/* Wheel Spokes */}
          <line x1="62" y1="123" x2="62" y2="149" stroke="#94A3B8" strokeWidth="1.8" />
          <line x1="49" y1="136" x2="75" y2="136" stroke="#94A3B8" strokeWidth="1.8" />

          {/* Front Wheel */}
          <circle cx="156" cy="136" r="21" fill="#0F172A" stroke="#334155" strokeWidth="5.5" />
          <circle cx="156" cy="136" r="13" fill="#1E293B" stroke="#64748B" strokeWidth="1.8" />
          <circle cx="156" cy="136" r="5" fill="#F8FAFC" />
          {/* Wheel Spokes */}
          <line x1="156" y1="123" x2="156" y2="149" stroke="#94A3B8" strokeWidth="1.8" />
          <line x1="143" y1="136" x2="169" y2="136" stroke="#94A3B8" strokeWidth="1.8" />

          {/* Motorcycle Body & Chassis */}
          <path d="M 62 136 L 94 124 L 126 124 L 156 136" stroke="#047857" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 92 124 L 102 98 L 140 96 L 156 136" fill="#059669" stroke="#10B981" strokeWidth="2.2" />

          {/* Chrome Exhaust Pipe with speed flare */}
          <path d="M 76 139 L 45 141" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
          <path d="M 43 141 Q 34 139 30 141" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.85" />

          {/* 3. THERMAL DELIVERY BOX (ARJAWINANGUN COURIER BOX) */}
          <g filter="url(#shadowFilter)">
            <rect x="46" y="78" width="36" height="36" rx="6" fill="#047857" stroke="#10B981" strokeWidth="2.5" />
            {/* Box Lid / Top Accent */}
            <rect x="49" y="82" width="30" height="6" rx="2" fill="#F59E0B" />
            {/* Courier Bag Pocket Straps */}
            <line x1="56" y1="88" x2="56" y2="114" stroke="#064E3B" strokeWidth="2" />
            <line x1="72" y1="88" x2="72" y2="114" stroke="#064E3B" strokeWidth="2" />
            {/* Box Mascot Symbol (Letter A / M Winged Icon) */}
            <path d="M 54 107 L 60 95 L 64 102 L 68 95 L 74 107" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* 4. DRIVER BODY (GREEN JACKET WITH SAFETY STRIPES) */}
          {/* Driver Torso */}
          <path d="M 85 82 C 85 73 95 70 108 70 C 122 70 128 76 126 88 L 119 116 L 94 116 Z" fill="#059669" stroke="#047857" strokeWidth="1.8" />
          {/* Reflective Safety Vest Bands */}
          <path d="M 91 90 L 118 90" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 93 98 L 116 98" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />

          {/* Driver Arms & Forward Leaning Riding Position */}
          <path d="M 104 80 L 134 90 L 144 89" stroke="#047857" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Handlebars & Aero Windshield */}
          <path d="M 139 83 L 146 93" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 142 80 Q 150 70 159 82" stroke="#38BDF8" strokeWidth="3" fill="none" opacity="0.8" />

          {/* 5. DRIVER HELMET (AERO RACING DESIGN) */}
          <circle cx="113" cy="53" r="17" fill="#047857" stroke="#10B981" strokeWidth="2.8" />
          {/* Golden Racing Stripe on Helmet */}
          <path d="M 102 48 Q 113 40 124 48" stroke="#F59E0B" strokeWidth="3" fill="none" />
          {/* Dark Shield Visor */}
          <path d="M 115 47 C 126 47 132 53 130 62 L 117 62 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.8" />
          {/* Visor Glare / Specular Highlight */}
          <path d="M 120 51 Q 126 53 128 59" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

          {/* 6. FRONT HEADLIGHT & BRIGHT BEAM */}
          <polygon points="156,110 205,88 205,132" fill="url(#headlightBeam)" />
          <circle cx="156" cy="110" r="5.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.8" />

          {/* 7. DOMINANT EMBLEM BANNER: "ARJAWINANGUN DELIVERY" (Besar & Tegas) */}
          <g filter="url(#shadowFilter)">
            {/* Banner Back Ribbon Foldings Left & Right */}
            <polygon points="20,165 35,150 35,178 20,192 27,178" fill="#022C22" stroke="#F59E0B" strokeWidth="1" />
            <polygon points="200,165 185,150 185,178 200,192 193,178" fill="#022C22" stroke="#F59E0B" strokeWidth="1" />
            
            {/* Main Central Banner Ribbon */}
            <rect 
              x="26" 
              y="152" 
              width="168" 
              height="38" 
              rx="9" 
              fill="url(#bannerGrad)" 
              stroke="url(#goldRingGrad)" 
              strokeWidth="2.5" 
            />

            {/* Banner Inner Trim */}
            <rect 
              x="29" 
              y="155" 
              width="162" 
              height="32" 
              rx="7" 
              fill="none" 
              stroke="#34D399" 
              strokeWidth="1" 
              strokeDasharray="4 2" 
              opacity="0.6" 
            />

            {/* DOMINANT TEXT 1: "ARJAWINANGUN" (Besar, Bold, Putih Bersih) */}
            <text
              x="110"
              y="168"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
              letterSpacing="0.08em"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' }}
            >
              ARJAWINANGUN
            </text>

            {/* DOMINANT TEXT 2: "DELIVERY" (Bold, Warna Emas Terang) */}
            <text
              x="110"
              y="182"
              textAnchor="middle"
              fill="#FDE68A"
              fontSize="10"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
              letterSpacing="0.22em"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' }}
            >
              ★ DELIVERY ★
            </text>
          </g>

          {/* Decorative Stars on border */}
          <polygon points="110,9 112,13 116,13 113,16 114,20 110,18 106,20 107,16 104,13 108,13" fill="#FBBF24" />
          <circle cx="48" cy="48" r="2.5" fill="#FBBF24" />
          <circle cx="172" cy="48" r="2.5" fill="#FBBF24" />
        </svg>
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
