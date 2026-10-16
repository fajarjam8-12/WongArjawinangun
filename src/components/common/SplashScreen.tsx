import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Store, 
  Bike, 
  Lock, 
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { DriverLogo } from './DriverLogo';

interface SplashScreenProps {
  onStart: () => void;
  onOpenAuth: (defaultTab?: 'whatsapp' | 'google' | 'merchant' | 'courier' | 'admin') => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onStart, 
  onOpenAuth
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white p-5 sm:p-8 overflow-hidden select-none">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-xl mx-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-300 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Arjawinangun & Cirebon Barat</span>
        </div>

        {/* Dedicated Admin Portal Button at the Top Right */}
        <button
          onClick={() => onOpenAuth('admin')}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 text-xs font-bold text-emerald-300 transition-all shadow-md cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>Portal Admin</span>
        </button>
      </header>

      {/* Main Center Hero & Arjawinangun Delivery Driver Logo */}
      <main className="relative z-10 flex flex-col items-center text-center my-auto py-5 max-w-md mx-auto w-full">
        
        {/* DRIVER LOGO EMBLEM (ARJAWINANGUN DELIVERY) */}
        <div className="mb-3 transform hover:scale-105 transition-transform duration-300">
          <DriverLogo size="lg" showBadge={false} />
        </div>

        {/* Branding Typography: Tulisan MITRA Dibuat Kecil, ARJAWINANGUN DELIVERY Dibuat Agak Besar */}
        <div className="flex flex-col items-center">
          {/* Tulisan MITRA kecil */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300 shadow-xs mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            MITRA
          </div>

          {/* Tulisan ARJAWINANGUN DELIVERY Agak Besar */}
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
            ARJAWINANGUN <span className="text-emerald-400">DELIVERY</span>
          </h1>

          <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-200/90 mt-1.5">
            Layanan Antar Kurir & Hyperlocal Cepat
          </p>
        </div>

        {/* Hero Tagline */}
        <div className="mt-4 space-y-1">
          <p className="text-sm sm:text-base font-bold text-white">
            Pesan Apa Saja di Arjawinangun
          </p>
          <p className="text-xs text-emerald-300/80 font-medium flex items-center justify-center gap-2">
            <span>Cepat</span>
            <span>•</span>
            <span>Aman</span>
            <span>•</span>
            <span>Terpercaya</span>
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-3 gap-2 w-full mt-5 text-left">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-bold text-emerald-400 block mb-0.5">10 Layanan</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight block">Kuliner, Pasar, Apotek & Paket</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-bold text-amber-400 block mb-0.5">Kirim 8 Ribu</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight block">Tarif kurir flat 2 KM pertama</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-bold text-teal-400 block mb-0.5">MitraPay</span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight block">QRIS, Transfer, PPOB & Poin</span>
          </div>
        </div>
      </main>

      {/* Professional Authentication & Entrance Section */}
      <footer className="relative z-10 w-full max-w-md mx-auto space-y-3 pb-3">
        
        {/* Primary Action: Direct Browse / Tamu */}
        <button
          onClick={onStart}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Lanjut Sebagai Tamu & Jelajahi</span>
          <ArrowRight className="w-5 h-5 text-slate-950" />
        </button>

        {/* Login Options: WhatsApp, Google, Email */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onOpenAuth('whatsapp')}
            className="py-2.5 px-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/30 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => onOpenAuth('google')}
            className="py-2.5 px-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => onOpenAuth('whatsapp')}
            className="py-2.5 px-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-teal-400" />
            <span>Email</span>
          </button>
        </div>

        {/* Partner Portals: Merchant & Kurir */}
        <div className="flex items-center justify-between pt-1 px-1 text-xs">
          <button
            onClick={() => onOpenAuth('merchant')}
            className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Daftar Merchant UMKM</span>
          </button>

          <span className="text-slate-600">•</span>

          <button
            onClick={() => onOpenAuth('courier')}
            className="flex items-center gap-1 text-teal-300 hover:text-teal-200 transition-colors cursor-pointer"
          >
            <Bike className="w-3.5 h-3.5 text-teal-400" />
            <span>Gabung Mitra Kurir</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
