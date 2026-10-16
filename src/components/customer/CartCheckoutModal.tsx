import React, { useState } from 'react';
import { CartItem, PaymentMethod, UserProfile, Order, Merchant } from '../../types';
import { calculateDeliveryFee, calculateServiceFee, calculateMitraPoints } from '../../utils/pricing';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Wallet, 
  Banknote, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Upload,
  CheckCircle2
} from 'lucide-react';

interface CartCheckoutModalProps {
  cart: CartItem[];
  merchant?: Merchant;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: Partial<Order>) => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  cart,
  merchant,
  currentUser,
  isOpen,
  onClose,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address || 'Griya Permata Arjawinangun Blok B4 No. 12, Jungjang');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mitrapay');
  const [voucherCode, setVoucherCode] = useState('ARJAHEMAT');
  const [voucherDiscount, setVoucherDiscount] = useState(5000);
  const [prescriptionPhoto, setPrescriptionPhoto] = useState<string>('');
  const [showQrisCode, setShowQrisCode] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const distanceKm = merchant ? merchant.distanceKm : 2.0;
  const deliveryCalc = calculateDeliveryFee(distanceKm);
  const platformFee = calculateServiceFee(subtotal);
  const total = Math.max(0, subtotal + deliveryCalc.deliveryFee + platformFee - voucherDiscount);
  const pointsEarned = calculateMitraPoints(total);

  // Check if any product needs prescription
  const hasHardMedicine = cart.some(item => item.product.isHardMedicine);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (hasHardMedicine && !prescriptionPhoto) {
      alert('Peringatan: Keranjang berisi Obat Keras (Resep Dokter). Harap unggah foto resep dokter terlebih dahulu.');
      return;
    }

    if (paymentMethod === 'mitrapay' && currentUser.walletBalance < total) {
      alert(`Saldo MitraPay tidak mencukupi (Saldo: Rp ${currentUser.walletBalance.toLocaleString('id-ID')}). Silakan top-up atau pilih metode QRIS/COD.`);
      return;
    }

    const orderData: Partial<Order> = {
      orderNumber: `ARJA-${Date.now().toString().slice(-7)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      merchantId: merchant?.id,
      merchantName: merchant?.name || 'MitraArja Partner',
      serviceType: merchant?.serviceType || 'food',
      items: [...cart],
      pickupAddress: merchant?.address || 'Pusat Arjawinangun',
      destinationAddress: deliveryAddress,
      distanceKm: distanceKm,
      deliveryNotes: deliveryNotes,
      prescriptionPhoto: prescriptionPhoto,
      status: 'pending',
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      subtotal: subtotal,
      deliveryFee: deliveryCalc.deliveryFee,
      platformFee: platformFee,
      discount: voucherDiscount,
      total: total,
      courierEarned: Math.round(deliveryCalc.deliveryFee * 0.9),
      merchantEarned: Math.round(subtotal * 0.9),
      platformCommission: Math.round(subtotal * 0.1) + platformFee,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: Math.round(distanceKm * 4 + 12),
      progressPercent: 15
    };

    onPlaceOrder(orderData);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold">Keranjang & Checkout</h3>
            <p className="text-xs text-emerald-100">
              {merchant ? merchant.name : 'Pesanan MitraArja'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {cart.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">Keranjang Belanja Kosong</p>
              <p className="text-xs mt-1">Pilih menu favorit Anda terlebih dahulu</p>
            </div>
          ) : (
            <>
              {/* Delivery Address */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">Alamat Pengantaran</span>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                    />
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Catatan patokan (Contoh: Pagar hitam depan musholla)"
                      className="w-full mt-1.5 p-2 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Prescription Upload if needed */}
              {hasHardMedicine && (
                <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    Wajib Unggah Resep Dokter (Obat Keras)
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Pesanan Anda mengandung obat keras yang memerlukan resep dokter sah untuk disetujui apoteker MitraArja.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    {prescriptionPhoto ? (
                      <div className="flex items-center gap-2 text-emerald-700 font-bold bg-white px-3 py-1.5 rounded-xl border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4" />
                        Resep Terlampir
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPrescriptionPhoto('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80')}
                        className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Simulasikan Unggah Foto Resep
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2.5">
                <span className="font-bold text-slate-700 block">Item Pesanan ({cart.length})</span>
                {cart.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-2.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{item.product.name}</h4>
                      <p className="text-emerald-700 font-extrabold text-[11px]">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>
                      {item.notes && (
                        <p className="text-[10px] text-slate-400 italic truncate">"{item.notes}"</p>
                      )}
                    </div>
                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-200"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-lg bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-700"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Method Selector */}
              <div>
                <span className="font-bold text-slate-700 block mb-1.5">Metode Pembayaran</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('mitrapay'); setShowQrisCode(false); }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'mitrapay'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-800">MitraPay</p>
                      <p className="text-[10px] text-slate-500">Saldo: Rp {currentUser.walletBalance.toLocaleString('id-ID')}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('qris'); setShowQrisCode(true); }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'qris'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-bold text-slate-800">QRIS Instan</p>
                      <p className="text-[10px] text-slate-500">Scan semua e-wallet</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('cod'); setShowQrisCode(false); }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-bold text-slate-800">COD (Tunai)</p>
                      <p className="text-[10px] text-slate-500">Bayar ke Kurir</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('bank_transfer'); setShowQrisCode(false); }}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-bold text-slate-800">Transfer Bank</p>
                      <p className="text-[10px] text-slate-500">BCA, Mandiri, BRI</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* QRIS Simulator Box */}
              {showQrisCode && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-center space-y-2">
                  <p className="font-bold text-indigo-950">QRIS Standar Pembayaran Nasional</p>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow-xs border border-indigo-200 flex items-center justify-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=MITRAARJA-QRIS-TEST-${total}`} 
                      alt="QRIS Code" 
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[10px] text-indigo-700">Scan dengan BCA, GoPay, OVO, Dana, ShopeePay</p>
                </div>
              )}

              {/* Cost Summary */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Belanja</span>
                  <span className="font-semibold text-slate-800">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ongkos Kirim ({distanceKm} KM)</span>
                  <span className="font-semibold text-slate-800">Rp {deliveryCalc.deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Layanan Platform</span>
                  <span className="font-semibold text-slate-800">Rp {platformFee.toLocaleString('id-ID')}</span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Diskon Voucher ({voucherCode})</span>
                    <span>-Rp {voucherDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between items-center">
                  <span className="font-black text-slate-900 text-sm">Total Pembayaran</span>
                  <span className="text-base font-black text-emerald-800">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Points Award badge */}
                <div className="mt-2 p-2 bg-emerald-100/70 rounded-xl flex items-center justify-between text-emerald-900 font-semibold text-[11px]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    Reward Mitra Point:
                  </span>
                  <span className="font-extrabold text-emerald-800">+{pointsEarned} Poin (Rp 10.000 = 1 Poin)</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Konfirmasi & Buat Pesanan (Auto Dispatch Kurir)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
