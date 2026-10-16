import React from 'react';
import { UserProfile, UserRole } from '../../types';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Gift, 
  Sparkles, 
  CreditCard, 
  Wallet, 
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  Tag,
  Store,
  Bike,
  Lock
} from 'lucide-react';

interface CustomerProfileViewProps {
  currentUser: UserProfile;
  onOpenWallet: () => void;
  onOpenAuth: (defaultTab?: any) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  currentUser,
  onOpenWallet,
  onOpenAuth,
  onSwitchRole
}) => {
  return (
    <div className="space-y-4 pb-20">
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 rounded-b-3xl shadow-md -mx-4 -mt-4 mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
          />
          <div>
            <h2 className="text-base font-bold text-white">{currentUser.name}</h2>
            <p className="text-xs text-emerald-200">{currentUser.phone}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-emerald-500/30 border border-emerald-400/40 px-2.5 py-0.5 rounded-full font-semibold">
                Akun Warga Arjawinangun
              </span>
            </div>
          </div>
        </div>

        {/* Mitra Point and Wallet Balance Strip */}
        <div className="mt-4 pt-3 border-t border-emerald-700/60 grid grid-cols-2 gap-3 text-xs">
          <div 
            onClick={onOpenWallet}
            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl cursor-pointer transition-colors border border-white/15"
          >
            <span className="text-[10px] text-emerald-200">Saldo MitraPay</span>
            <p className="text-sm font-black text-white mt-0.5">
              Rp {currentUser.walletBalance.toLocaleString('id-ID')}
            </p>
          </div>

          <div 
            onClick={onOpenWallet}
            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl cursor-pointer transition-colors border border-white/15"
          >
            <span className="text-[10px] text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Mitra Point
            </span>
            <p className="text-sm font-black text-amber-300 mt-0.5">
              {currentUser.points} Poin
            </p>
          </div>
        </div>
      </div>

      {/* Profile Menu Items */}
      <div className="space-y-2">
        {/* Saved Address */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Alamat Pengiriman Utama
            </span>
            <span className="text-emerald-700 text-[11px] font-semibold">Ubah</span>
          </div>
          <p className="text-xs text-slate-600 pl-6">{currentUser.address}</p>
          <p className="text-[10px] text-slate-400 pl-6">Kecamatan: {currentUser.district}</p>
        </div>

        {/* Vouchers and Promos */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-2.5">
            <Tag className="w-4 h-4 text-amber-500" />
            <div>
              <p className="font-bold text-slate-800 text-xs">Voucher & Kupon Saya</p>
              <p className="text-[10px] text-slate-500">3 Voucher aktif (Diskon Ongkir & Cashback)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Payment Methods */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-blue-500" />
            <div>
              <p className="font-bold text-slate-800 text-xs">Metode Pembayaran</p>
              <p className="text-[10px] text-slate-500">MitraPay, QRIS, COD, Bank Transfer</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Referral Program */}
        <div 
          onClick={onOpenWallet}
          className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-bold text-amber-950 text-xs">Ajak Teman (Kode: {currentUser.referralCode})</p>
              <p className="text-[10px] text-amber-800">Dapatkan 100 poin setiap teman daftar & belanja</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </div>

        {/* PARTNER & ADMIN ACCESS PORTALS (Clean Professional Integration) */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
            Portal Kemitraan & Pengelola
          </span>

          <div className="space-y-1.5">
            <button
              onClick={() => onSwitchRole('merchant')}
              className="w-full p-3 bg-white border border-slate-200 hover:border-amber-300 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Portal Mitra Toko (Merchant)</p>
                  <p className="text-[10px] text-slate-500">Buka toko, kelola menu, atur stok & promo</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onSwitchRole('courier')}
              className="w-full p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Portal Driver / Kurir Independen</p>
                  <p className="text-[10px] text-slate-500">Terima order dispatch & pantau komisi</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenAuth('admin')}
              className="w-full p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs">Login Khusus Admin Platform</p>
                  <p className="text-[10px] text-emerald-300">Akses dashboard founder, GMV & fraud detection</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Switch / Logout */}
        <div 
          onClick={() => onOpenAuth('whatsapp')}
          className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors pt-2"
        >
          <div className="flex items-center gap-2.5 text-rose-600">
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-xs">Ganti Akun / Keluar</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

    </div>
  );
};
