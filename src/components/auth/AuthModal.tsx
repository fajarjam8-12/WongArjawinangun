import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../../types';
import { INITIAL_USERS } from '../../data/mockData';
import { 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  X, 
  MapPin, 
  Bike, 
  Store, 
  Lock, 
  KeyRound, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DriverLogo } from '../common/DriverLogo';

export type AuthInitialTab = 'whatsapp' | 'google' | 'merchant' | 'courier' | 'admin';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: AuthInitialTab;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  initialTab = 'whatsapp',
  onClose, 
  onLoginSuccess 
}) => {
  const [tab, setTab] = useState<AuthInitialTab>(initialTab);
  
  // Customer WhatsApp state
  const [phone, setPhone] = useState('081223344556');
  const [name, setName] = useState('Diva Ageng Nugraha');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '0']);

  // Admin Dedicated Login state
  const [adminEmail, setAdminEmail] = useState('admin@mitraarja.id');
  const [adminPin, setAdminPin] = useState('889900');
  const [adminError, setAdminError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setAdminError('');
      setOtpStep(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 600);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const cust = INITIAL_USERS.find(u => u.role === 'customer') || INITIAL_USERS[0];
      onLoginSuccess({
        ...cust,
        name: name || cust.name,
        phone: phone || cust.phone,
        role: 'customer'
      });
      onClose();
    }, 500);
  };

  const handleMerchantLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const merchantUser = INITIAL_USERS.find(u => u.role === 'merchant') || INITIAL_USERS[1];
      onLoginSuccess(merchantUser);
      onClose();
    }, 500);
  };

  const handleCourierLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const courierUser = INITIAL_USERS.find(u => u.role === 'courier') || INITIAL_USERS[2];
      onLoginSuccess(courierUser);
      onClose();
    }, 500);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAdminError('');

    setTimeout(() => {
      setIsLoading(false);
      if (adminPin !== '889900' && adminPin !== '123456') {
        setAdminError('Kode PIN Keamanan Admin salah. Gunakan PIN: 889900');
        return;
      }
      const adminUser = INITIAL_USERS.find(u => u.role === 'admin') || INITIAL_USERS[3];
      onLoginSuccess(adminUser);
      onClose();
    }, 600);
  };

  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      id: `guest_${Date.now()}`,
      name: 'Pelanggan Arjawinangun',
      phone: '0812xxxx9900',
      email: 'pelanggan@mitraarja.id',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'customer',
      status: 'active',
      points: 20,
      walletBalance: 50000,
      referralCode: 'ARJA-GUEST',
      address: 'Pusat Kota Arjawinangun',
      district: 'Arjawinangun',
      createdAt: '2026-10-16'
    };
    onLoginSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Dynamic Header based on portal */}
        {tab === 'admin' ? (
          <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white text-center border-b border-emerald-500/30">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup login"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-black tracking-tight text-white">
              LOGIN KHUSUS ADMIN
            </h2>
            <p className="text-xs text-emerald-300 font-mono mt-0.5">
              Portal Keamanan Platform MITRAARJA
            </p>
          </div>
        ) : (
          <div className="relative bg-gradient-to-r from-emerald-800 to-teal-800 p-6 text-white text-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup login"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center mb-1">
              <DriverLogo size="sm" showBadge={false} className="mb-2" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-400/40 mb-1">
                MITRA
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                ARJAWINANGUN <span className="text-emerald-300">DELIVERY</span>
              </h2>
            </div>
            <p className="text-xs text-emerald-100">
              Pesan Makanan, Belanja, Apotek & Kirim Paket
            </p>
          </div>
        )}

        {/* Portal Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold px-2 pt-2 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setTab('whatsapp'); setOtpStep(false); }}
            className={`py-2 px-3 rounded-t-xl transition-all ${
              tab === 'whatsapp' || tab === 'google'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setTab('merchant')}
            className={`py-2 px-3 rounded-t-xl transition-all ${
              tab === 'merchant'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Mitra Toko
          </button>
          <button
            onClick={() => setTab('courier')}
            className={`py-2 px-3 rounded-t-xl transition-all ${
              tab === 'courier'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Mitra Kurir
          </button>
          <button
            onClick={() => setTab('admin')}
            className={`py-2 px-3 rounded-t-xl transition-all ml-auto ${
              tab === 'admin'
                ? 'bg-slate-900 text-emerald-300 border-t-2 border-emerald-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🔒 Khusus Admin
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* CUSTOMER LOGIN (WhatsApp OTP) */}
          {(tab === 'whatsapp' || tab === 'google') && (
            <div className="space-y-3">
              {!otpStep ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                        +62
                      </span>
                      <input
                        type="tel"
                        value={phone.replace(/^(\+62|0)/, '')}
                        onChange={(e) => setPhone('0' + e.target.value.replace(/\D/g, ''))}
                        placeholder="812-xxxx-xxxx"
                        required
                        className="w-full pl-12 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      required
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Mengirim...' : 'Kirim Kode OTP WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                    <p className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      OTP Terkirim ke WhatsApp {phone}
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Kode simulasi instan: <strong>5280</strong>
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Masukkan 4 Digit Kode OTP
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otpCode];
                            newOtp[idx] = e.target.value;
                            setOtpCode(newOtp);
                          }}
                          className="w-12 h-12 text-center text-xl font-black bg-slate-50 border-2 border-emerald-400 rounded-xl focus:border-emerald-600 focus:outline-none text-slate-900"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? 'Memverifikasi...' : 'Masuk Sekarang'}
                  </button>
                </div>
              )}

              {/* Guest button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Lanjut Sebagai Tamu (Tanpa Akun)
                </button>
              </div>
            </div>
          )}

          {/* MERCHANT LOGIN */}
          {tab === 'merchant' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                <Store className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Portal Masuk Mitra Merchant UMKM</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola toko, tambah produk makanan/sembako, atur stok dan terima pesanan dari warga Arjawinangun.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                <p className="font-bold text-slate-800">Akun Terdaftar: RM Barokah / Mas Gondrong</p>
                <p className="text-slate-500">Email: warung.barokah@mitraarja.id</p>
              </div>

              <button
                type="button"
                onClick={handleMerchantLogin}
                disabled={isLoading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Memproses...' : 'Buka Dashboard Merchant'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* COURIER LOGIN */}
          {tab === 'courier' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                <Bike className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Portal Masuk Driver Kurir Independen</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Aktifkan status Online, terima auto dispatch pesanan, dan pantau penghasilan harian Anda.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                <p className="font-bold text-slate-800">Akun Driver: Kang Asep Supriatna (Gold)</p>
                <p className="text-slate-500">Kendaraan: Honda Vario 160 (E 4521 AA)</p>
              </div>

              <button
                type="button"
                onClick={handleCourierLogin}
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Memproses...' : 'Buka Dashboard Kurir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* DEDICATED ADMIN LOGIN */}
          {tab === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-3.5">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Akses Founder & Pemilik Platform</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hanya untuk pengelolaan GMV, komisi 10%, persetujuan merchant, deteksi fraud, dan zona wilayah.
                  </p>
                </div>
              </div>

              {adminError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Admin Platform
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  PIN Keamanan Super Admin (6 Digit)
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="PIN: 889900"
                  required
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest text-slate-900"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  PIN simulasi otomatis: <strong>889900</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-slate-950 hover:bg-black text-emerald-300 border border-emerald-500/40 rounded-xl font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{isLoading ? 'Mengautentikasi...' : 'Masuk ke Super Admin Platform'}</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
