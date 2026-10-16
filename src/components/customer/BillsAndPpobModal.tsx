import React, { useState } from 'react';
import { calculatePpobPrice } from '../../utils/pricing';
import { UserProfile, Order } from '../../types';
import { 
  X, 
  Zap, 
  Droplet, 
  ShieldCheck, 
  Wifi, 
  PhoneCall, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface BillsAndPpobModalProps {
  currentUser: UserProfile;
  initialTab?: 'bills' | 'pulsa' | 'ppob';
  isOpen: boolean;
  onClose: () => void;
  onSuccessTransaction: (orderData: Partial<Order>) => void;
}

export const BillsAndPpobModal: React.FC<BillsAndPpobModalProps> = ({
  currentUser,
  initialTab = 'bills',
  isOpen,
  onClose,
  onSuccessTransaction
}) => {
  const [tab, setTab] = useState<'bills' | 'pulsa' | 'ppob'>(initialTab);
  
  // Bills state
  const [billType, setBillType] = useState<'pln' | 'pdam' | 'bpjs' | 'wifi' | 'telkom'>('pln');
  const [customerNumber, setCustomerNumber] = useState('541289001243');
  const [inquiryResult, setInquiryResult] = useState<{
    name: string;
    period: string;
    baseAmount: number;
    adminFee: number;
    total: number;
  } | null>({
    name: 'DIVA AGENG NUGRAHA',
    period: 'Oktober 2026',
    baseAmount: 185000,
    adminFee: 2500,
    total: 187500
  });

  // Pulsa state
  const [operator, setOperator] = useState<'Telkomsel' | 'XL' | 'Indosat' | 'Tri' | 'Smartfren'>('Telkomsel');
  const [pulsaPhone, setPulsaPhone] = useState('081223344556');
  const [selectedNominal, setSelectedNominal] = useState<number>(50000);

  if (!isOpen) return null;

  const pulsaNominals = [
    { value: 5000, price: 6500 },
    { value: 10000, price: 11500 },
    { value: 20000, price: 21500 },
    { value: 50000, price: 51500 },
    { value: 100000, price: 101500 }
  ];

  const handlePayBill = () => {
    if (!inquiryResult) return;
    const orderData: Partial<Order> = {
      orderNumber: `ARJA-BILL-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      serviceType: 'bills',
      pickupAddress: 'Server API PPOB Nasional',
      destinationAddress: `ID Pelanggan: ${customerNumber}`,
      distanceKm: 0,
      subtotal: inquiryResult.baseAmount,
      deliveryFee: 0,
      platformFee: inquiryResult.adminFee,
      discount: 0,
      total: inquiryResult.total,
      status: 'completed',
      paymentMethod: 'mitrapay',
      paymentStatus: 'paid',
      courierEarned: 0,
      merchantEarned: 0,
      platformCommission: inquiryResult.adminFee,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 0,
      progressPercent: 100
    };
    onSuccessTransaction(orderData);
    alert('Pembayaran Tagihan Berhasil! Resi resmi tersimpan di menu Pesanan.');
    onClose();
  };

  const handlePayPulsa = () => {
    const item = pulsaNominals.find(n => n.value === selectedNominal) || pulsaNominals[3];
    const orderData: Partial<Order> = {
      orderNumber: `ARJA-PULSA-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      serviceType: 'pulsa',
      pickupAddress: `Operator ${operator}`,
      destinationAddress: `No. HP: ${pulsaPhone}`,
      distanceKm: 0,
      subtotal: selectedNominal,
      deliveryFee: 0,
      platformFee: item.price - selectedNominal,
      discount: 0,
      total: item.price,
      status: 'completed',
      paymentMethod: 'mitrapay',
      paymentStatus: 'paid',
      courierEarned: 0,
      merchantEarned: 0,
      platformCommission: item.price - selectedNominal,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 0,
      progressPercent: 100
    };
    onSuccessTransaction(orderData);
    alert(`Pengisian Pulsa ${operator} Rp ${selectedNominal.toLocaleString('id-ID')} ke ${pulsaPhone} Berhasil!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold">Tagihan & Pulsa PPOB</h3>
            <p className="text-xs text-emerald-100">Bayar Cepat Bebas Antri se-Arjawinangun</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup PPOB"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4">
          <button
            onClick={() => setTab('bills')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === 'bills' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Tagihan Rutin
          </button>
          <button
            onClick={() => setTab('pulsa')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === 'pulsa' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500'
            }`}
          >
            <Smartphone className="w-4 h-4 text-blue-500" />
            Pulsa & Kuota
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {tab === 'bills' ? (
            <div className="space-y-4">
              {/* Bill Provider Icons */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'pln', name: 'PLN', icon: Zap, color: 'text-amber-500 bg-amber-50' },
                  { id: 'pdam', name: 'PDAM', icon: Droplet, color: 'text-blue-500 bg-blue-50' },
                  { id: 'bpjs', name: 'BPJS', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50' },
                  { id: 'wifi', name: 'WIFI', icon: Wifi, color: 'text-indigo-500 bg-indigo-50' },
                  { id: 'telkom', name: 'Telkom', icon: PhoneCall, color: 'text-rose-500 bg-rose-50' }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setBillType(item.id as any)}
                      className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                        billType === item.id
                          ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* ID Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nomor ID Pelanggan / Meteran / Virtual Account
                </label>
                <input
                  type="text"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  placeholder="Masukkan nomor pelanggan..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

              {/* Inquiry Bill Display */}
              {inquiryResult && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex justify-between font-bold text-emerald-950 pb-2 border-b border-emerald-200">
                    <span>{billType.toUpperCase()} - Cirebon</span>
                    <span className="text-emerald-600">Terdaftar</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Nama Pelanggan</span>
                    <span className="font-bold text-slate-800">{inquiryResult.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Periode Tagihan</span>
                    <span className="font-semibold text-slate-800">{inquiryResult.period}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tagihan Pokok</span>
                    <span className="font-semibold text-slate-800">Rp {inquiryResult.baseAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Admin MitraArja</span>
                    <span className="font-semibold text-slate-800">Rp {inquiryResult.adminFee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="border-t border-emerald-200 pt-2 flex justify-between items-center text-sm font-black text-emerald-900">
                    <span>Total Bayar</span>
                    <span className="text-base text-emerald-700">Rp {inquiryResult.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handlePayBill}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Bayar Sekarang (Saldo MitraPay)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Operator Picker */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pilih Operator Seluler
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren'] as const).map(op => (
                    <button
                      key={op}
                      onClick={() => setOperator(op)}
                      className={`py-2 px-1 text-center font-bold text-[11px] rounded-xl border transition-all ${
                        operator === op
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nomor Handphone Penerima
                </label>
                <input
                  type="tel"
                  value={pulsaPhone}
                  onChange={(e) => setPulsaPhone(e.target.value)}
                  placeholder="0812xxxx"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

              {/* Nominals Grid */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pilih Nominal Pulsa
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {pulsaNominals.map(nom => (
                    <button
                      key={nom.value}
                      type="button"
                      onClick={() => setSelectedNominal(nom.value)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedNominal === nom.value
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <p className="font-black text-slate-900 text-sm">
                        Rp {nom.value.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        Harga: Rp {nom.price.toLocaleString('id-ID')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayPulsa}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Beli Pulsa (Saldo MitraPay)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
