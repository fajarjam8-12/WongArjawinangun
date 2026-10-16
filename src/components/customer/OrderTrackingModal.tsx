import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../../types';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Bike, 
  CheckCircle2, 
  Store, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Navigation,
  Star
} from 'lucide-react';

interface OrderTrackingModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: (orderId: string) => void;
  onAdvanceStatus?: (orderId: string, nextStatus: OrderStatus) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenChat,
  onAdvanceStatus
}) => {
  const [courierPosition, setCourierPosition] = useState({ x: 45, y: 55 });

  // Simulate courier movement on GPS map
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCourierPosition(prev => ({
        x: Math.min(80, prev.x + (Math.random() * 2 - 0.5)),
        y: Math.max(30, prev.y - (Math.random() * 2 - 0.5))
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const statusSteps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'pending', label: 'Menunggu Konfirmasi', desc: 'Sistem auto dispatch mencari kurir' },
    { key: 'merchant_accepted', label: 'Diproses Toko', desc: 'Merchant sedang menyiapkan pesanan' },
    { key: 'courier_assigned', label: 'Kurir Ditemukan', desc: `${order.courierName || 'Kurir'} menuju toko` },
    { key: 'picked_up', label: 'Pesanan Diambil', desc: 'Kurir telah mengambil barang dari toko' },
    { key: 'on_delivery', label: 'Dalam Pengantaran', desc: 'Kurir sedang dalam perjalanan ke lokasi Anda' },
    { key: 'delivered', label: 'Tiba di Tujuan', desc: 'Kurir telah tiba di alamat' },
    { key: 'completed', label: 'Selesai', desc: 'Pesanan telah selesai & terverifikasi' }
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-base font-bold">Lacak Pesanan Realtime</h3>
            </div>
            <p className="text-xs text-emerald-100 font-mono mt-0.5">{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup pelacakan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          
          {/* Simulated GPS Map Graphic */}
          <div className="relative h-48 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner">
            {/* Map Roads & Land Grid Illustration */}
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Roads */}
                <path d="M 0 50 Q 150 70 300 40 T 500 80" stroke="#475569" strokeWidth="12" fill="none" />
                <path d="M 120 0 L 120 200" stroke="#475569" strokeWidth="8" fill="none" />
                <path d="M 280 0 L 280 200" stroke="#475569" strokeWidth="8" fill="none" />
                <path d="M 30 140 L 450 140" stroke="#334155" strokeWidth="6" fill="none" />
                {/* Railway line */}
                <path d="M 0 100 L 500 100" stroke="#64748b" strokeWidth="3" strokeDasharray="6 6" fill="none" />
              </svg>
            </div>

            {/* Landmarks labels */}
            <div className="absolute top-3 left-4 text-[10px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
              Stasiun Arjawinangun
            </div>
            <div className="absolute bottom-3 left-4 text-[10px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
              RSUD Arjawinangun
            </div>
            <div className="absolute top-3 right-4 text-[10px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
              Pasar Tegalgubug
            </div>

            {/* Merchant Pin */}
            <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center shadow-lg font-bold">
                <Store className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-extrabold text-white bg-amber-900/80 px-1.5 py-0.5 rounded-md mt-1 whitespace-nowrap">
                {order.merchantName || 'Toko'}
              </span>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-[65%] right-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-extrabold text-white bg-rose-950/80 px-1.5 py-0.5 rounded-md mt-1 whitespace-nowrap">
                Lokasi Anda
              </span>
            </div>

            {/* Moving Courier Pin */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-1000 ease-out"
              style={{ left: `${courierPosition.x}%`, top: `${courierPosition.y}%` }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-400/40 animate-pulse">
                  <Bike className="w-5 h-5" />
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded-md mt-1 shadow-sm whitespace-nowrap">
                {order.courierName || 'Kurir Aktif'}
              </span>
            </div>

            {/* Live GPS badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-500/30">
              <Navigation className="w-3 h-3 animate-spin" />
              GPS Aktif • {order.estimatedMinutes} Menit lagi
            </div>
          </div>

          {/* Courier Card with Chat & Call button */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={order.courierPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'} 
                alt="Foto Kurir" 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-300"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900">{order.courierName || 'Kang Asep Supriatna'}</h4>
                  <span className="px-1.5 py-0.2 bg-amber-500 text-amber-950 text-[9px] font-extrabold rounded">
                    Gold
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{order.courierVehicle || 'Honda Vario 160 (E 4521 AA)'}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-400 inline" />
                  <span>4.9 (1.200+ Pesanan Sukses)</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenChat(order.id)}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1 font-bold text-xs"
                title="Buka Chat Realtime"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
              <a
                href={`tel:${order.courierPhone || '085712348899'}`}
                className="p-2.5 bg-white hover:bg-slate-100 text-emerald-800 border border-emerald-300 rounded-xl shadow-xs transition-colors"
                title="Telepon Kurir"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Step Timeline */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h4 className="font-bold text-slate-800 text-xs">Status Perjalanan Pesanan</h4>
            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="flex items-start gap-3 relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isPassed 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-slate-500'
                    } ${isCurrent ? 'ring-4 ring-emerald-200 scale-110' : ''}`}>
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${isCurrent ? 'text-emerald-800' : (isPassed ? 'text-slate-800' : 'text-slate-400')}`}>
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulate Next Step button for demo verification */}
          {onAdvanceStatus && currentStepIndex < statusSteps.length - 1 && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
              <span className="text-[11px] text-amber-900 font-semibold">
                Simulasi Tahap Status (Demo Test):
              </span>
              <button
                type="button"
                onClick={() => onAdvanceStatus(order.id, statusSteps[currentStepIndex + 1].key)}
                className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Maju ke: {statusSteps[currentStepIndex + 1].label} →
              </button>
            </div>
          )}

          {/* Items & Cost breakdown */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800">Rincian Pembayaran ({order.paymentMethod.toUpperCase()})</h4>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Item</span>
              <span className="font-semibold text-slate-800">Rp {order.subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Ongkos Kirim ({order.distanceKm} KM)</span>
              <span className="font-semibold text-slate-800">Rp {order.deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Layanan</span>
              <span className="font-semibold text-slate-800">Rp {order.platformFee.toLocaleString('id-ID')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Diskon</span>
                <span>-Rp {order.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-slate-900 text-sm">
              <span>Total Pesanan</span>
              <span className="text-emerald-700">Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
