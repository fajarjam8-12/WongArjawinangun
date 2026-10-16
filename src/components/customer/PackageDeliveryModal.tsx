import React, { useState } from 'react';
import { calculateDeliveryFee, checkProhibitedItem, PROHIBITED_KEYWORDS } from '../../utils/pricing';
import { Order, UserProfile } from '../../types';
import { 
  X, 
  Package, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Camera, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

interface PackageDeliveryModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitDelivery: (orderData: Partial<Order>) => void;
}

export const PackageDeliveryModal: React.FC<PackageDeliveryModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onSubmitDelivery
}) => {
  const [pickup, setPickup] = useState('Jl. Raya Jungjang No. 12, Arjawinangun');
  const [destination, setDestination] = useState('Pasar Sandang Tegalgubug Blok C No. 44, Cirebon');
  const [distanceKm, setDistanceKm] = useState<number>(3.5);
  const [weightKg, setWeightKg] = useState<number>(2.5);
  const [description, setDescription] = useState('Baju gamis pesanan 3 lusin dan kancing jahit');
  const [itemPhoto, setItemPhoto] = useState<string>('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80');
  const [agreeSafety, setAgreeSafety] = useState(true);

  if (!isOpen) return null;

  const feeCalc = calculateDeliveryFee(distanceKm, weightKg);
  const safetyCheck = checkProhibitedItem(description);
  const platformFee = 1500;
  const totalCost = feeCalc.deliveryFee + platformFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feeCalc.isOverweight) {
      alert('Berat paket melebihi batas maksimal 20 KG. Harap gunakan ekspedisi kargo.');
      return;
    }
    if (safetyCheck.isProhibited) {
      alert(`Peringatan: Barang mengandung kata terlarang "${safetyCheck.keyword}". Sistem MitraArja menolak pengiriman.`);
      return;
    }

    const orderData: Partial<Order> = {
      orderNumber: `ARJA-KIRIM-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      serviceType: 'delivery',
      pickupAddress: pickup,
      destinationAddress: destination,
      distanceKm: distanceKm,
      weightKg: weightKg,
      itemDescription: description,
      itemPhoto: itemPhoto,
      subtotal: 0,
      deliveryFee: feeCalc.deliveryFee,
      platformFee: platformFee,
      discount: 0,
      total: totalCost,
      status: 'pending',
      paymentMethod: 'mitrapay',
      paymentStatus: 'paid',
      courierEarned: Math.round(feeCalc.deliveryFee * 0.9),
      merchantEarned: 0,
      platformCommission: Math.round(feeCalc.deliveryFee * 0.1) + platformFee,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: Math.round(distanceKm * 4 + 10),
      progressPercent: 10
    };

    onSubmitDelivery(orderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Kirim Barang Instan</h3>
              <p className="text-xs text-emerald-100">Kurir Independen Arjawinangun & Cirebon Timur</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup kirim barang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Rules Banner */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Tarif Transparan & Otomatis:</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                • 2 KM pertama = <strong>Rp 8.000</strong><br />
                • Selanjutnya = <strong>Rp 2.000 / KM</strong><br />
                • Maksimal berat barang = <strong>20 KG</strong>
              </p>
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Alamat Penjemputan (Pickup)
            </label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Destination Address */}
          <div>
            <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Alamat Tujuan Pengiriman (Destination)
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Distance and Weight Sliders */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700">Estimasi Jarak</span>
                <span className="font-extrabold text-emerald-700">{distanceKm} KM</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-[10px] text-slate-400">Radius max: 15 KM</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-slate-500" />
                  Berat Barang
                </span>
                <span className={`font-extrabold ${weightKg > 20 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {weightKg} KG
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className={`w-full ${weightKg > 20 ? 'accent-rose-600' : 'accent-emerald-600'}`}
              />
              <span className={`text-[10px] ${weightKg > 20 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                {weightKg > 20 ? 'Melebihi batas (Maks 20KG)' : 'Maksimal 20 KG'}
              </span>
            </div>
          </div>

          {/* Description & Contraband Check */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Deskripsi Barang yang Dikirim
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Dokumen penting, baju jahitan, makanan kaleng..."
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Prohibited Alert Notification */}
          {safetyCheck.isProhibited && (
            <div className="p-3 bg-rose-50 border-2 border-rose-400 rounded-2xl text-rose-900 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-sm">Barang Terlarang Terdeteksi!</p>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  Sistem menemukan kata kunci terlarang: <strong>"{safetyCheck.keyword}"</strong>.
                  MitraArja melarang keras pengiriman narkoba, senjata, hewan langka, dan bahan peledak.
                </p>
              </div>
            </div>
          )}

          {/* Prohibited Items Info List */}
          <div className="p-2.5 bg-slate-100 rounded-xl text-[11px] text-slate-600">
            <span className="font-bold text-slate-800">Dilarang kirim: </span>
            {PROHIBITED_KEYWORDS.slice(0, 5).join(', ')}, hewan langka, dan barang ilegal lainnya.
          </div>

          {/* Item Photo Simulator */}
          <div>
            <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              Foto Barang (Opsional untuk Bukti Kurir)
            </label>
            <div className="flex items-center gap-3">
              <img 
                src={itemPhoto} 
                alt="Foto paket" 
                className="w-14 h-14 rounded-xl object-cover border border-slate-300"
              />
              <button
                type="button"
                onClick={() => setItemPhoto('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-[11px] transition-colors"
              >
                Ganti Foto Contoh
              </button>
            </div>
          </div>

          {/* Cost Summary Box */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Tarif Ongkos Kirim ({distanceKm} KM)</span>
              <span className="font-semibold text-slate-800">Rp {feeCalc.deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Layanan Platform</span>
              <span className="font-semibold text-slate-800">Rp {platformFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="border-t border-slate-200 pt-1.5 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Pembayaran (MitraPay)</span>
              <span className="text-base font-black text-emerald-700">Rp {totalCost.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={safetyCheck.isProhibited || feeCalc.isOverweight}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Pesan Kurir Instan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
