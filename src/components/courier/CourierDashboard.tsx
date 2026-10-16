import React, { useState, useEffect } from 'react';
import { CourierProfile, Order, CourierLevel } from '../../types';
import { getAutoDispatchRadius, WITHDRAWAL_FEE } from '../../utils/pricing';
import { 
  Bike, 
  MapPin, 
  Power, 
  Star, 
  Award, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  AlertCircle, 
  DollarSign, 
  ShieldCheck,
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';

interface CourierDashboardProps {
  courier: CourierProfile;
  activeOrders: Order[];
  onToggleOnline: (isOnline: boolean) => void;
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string) => void;
  onAdvanceOrderStatus: (orderId: string, status: any) => void;
  onOpenChat: (orderId: string) => void;
  onUpgradeCourierPremium: () => void;
  onBackToCustomer?: () => void;
}

export const CourierDashboard: React.FC<CourierDashboardProps> = ({
  courier,
  activeOrders,
  onToggleOnline,
  onAcceptOrder,
  onRejectOrder,
  onAdvanceOrderStatus,
  onOpenChat,
  onUpgradeCourierPremium,
  onBackToCustomer
}) => {
  const [activeTab, setActiveTab] = useState<'dispatch' | 'performance' | 'wallet' | 'membership'>('dispatch');
  
  // Auto-dispatch countdown simulator (30s)
  const [dispatchCountdown, setDispatchCountdown] = useState<number>(30);
  const [dispatchAttempt, setDispatchAttempt] = useState<number>(0);

  // Incoming pending order needing dispatch
  const pendingDispatchOrder = activeOrders.find(o => o.status === 'pending');
  // Order already assigned to this courier
  const currentAssignedOrder = activeOrders.find(o => o.courierId === courier.id && !['completed', 'cancelled'].includes(o.status));

  // Timer countdown for pending order
  useEffect(() => {
    let timer: any;
    if (pendingDispatchOrder && courier.isOnline) {
      setDispatchCountdown(30);
      timer = setInterval(() => {
        setDispatchCountdown(prev => {
          if (prev <= 1) {
            // Auto escalate radius to next courier
            setDispatchAttempt(a => (a + 1) % 3);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [pendingDispatchOrder?.id, courier.isOnline]);

  const currentRadius = getAutoDispatchRadius(dispatchAttempt);

  const getLevelBadge = (level: CourierLevel) => {
    switch (level) {
      case 'Platinum':
        return <span className="bg-purple-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full">Platinum (Bagi Hasil 95%)</span>;
      case 'Gold':
        return <span className="bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full">Gold (Bagi Hasil 90%)</span>;
      case 'Silver':
        return <span className="bg-slate-300 text-slate-900 font-black text-[10px] px-2 py-0.5 rounded-full">Silver (Bagi Hasil 85%)</span>;
      default:
        return <span className="bg-amber-700 text-white font-black text-[10px] px-2 py-0.5 rounded-full">Bronze (Bagi Hasil 80%)</span>;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Courier Header with Online/Offline Switch */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 rounded-b-3xl shadow-lg -mx-4 -mt-4 mb-4">
        {onBackToCustomer && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
            <button
              onClick={onBackToCustomer}
              className="text-emerald-200 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>← Mode Belanja (Customer)</span>
            </button>
            <span className="text-[10px] text-emerald-300 font-mono">PORTAL DRIVER</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bike className="w-5 h-5 text-emerald-300" />
            <h2 className="text-base font-bold">Kurir Independen MitraArja</h2>
          </div>
          {/* Online Toggle */}
          <button
            onClick={() => onToggleOnline(!courier.isOnline)}
            className={`px-3 py-1.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              courier.isOnline 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{courier.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Courier Profile Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={courier.photo} 
                alt={courier.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shrink-0"
              />
              <span className={`w-3.5 h-3.5 rounded-full absolute -bottom-0.5 -right-0.5 ring-2 ring-emerald-900 ${
                courier.isOnline ? 'bg-emerald-400' : 'bg-slate-500'
              }`} />
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-white">{courier.name}</h3>
              <p className="text-xs text-emerald-200 mt-0.5">{courier.vehicle} • {courier.licensePlate}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {courier.rating}
                </span>
                <span>•</span>
                {getLevelBadge(courier.level)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Counters: Pendapatan Hari Ini, Pesanan Hari Ini */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pendapatan Hari Ini</span>
          <p className="text-lg font-black text-emerald-700 mt-0.5">
            Rp {courier.earningsToday.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-slate-500">Saldo: Rp {courier.walletBalance.toLocaleString('id-ID')}</span>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pesanan Diantar Hari Ini</span>
          <p className="text-lg font-black text-slate-800 mt-0.5">{courier.completedOrdersToday} Pesanan</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Tingkat Penyelesaian 100%</span>
        </div>
      </div>

      {/* AUTO DISPATCH INCOMING ORDER MODAL / ALERT */}
      {courier.isOnline && pendingDispatchOrder && (
        <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-3xl shadow-xl space-y-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider">Order Masuk (Auto Dispatch)</span>
            </div>
            {/* 30 seconds Countdown Timer */}
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-100">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{dispatchCountdown} Detik</span>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl space-y-2 border border-white/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-extrabold text-sm">{pendingDispatchOrder.merchantName || 'Kirim Paket Instan'}</p>
                <p className="text-xs text-amber-100">{pendingDispatchOrder.pickupAddress}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-white">
                  +Rp {pendingDispatchOrder.courierEarned.toLocaleString('id-ID')}
                </span>
                <p className="text-[10px] text-amber-200">Ongkir Bersih</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs pt-1 border-t border-white/20">
              <MapPin className="w-3.5 h-3.5 text-rose-300" />
              <span className="truncate">Antar ke: {pendingDispatchOrder.destinationAddress}</span>
              <span className="font-bold ml-auto shrink-0">{pendingDispatchOrder.distanceKm} KM</span>
            </div>
          </div>

          {/* Auto Dispatch Escalation Status */}
          <div className="text-[11px] text-amber-100 flex items-center justify-between px-1">
            <span>Radius Pencarian Sistem: <strong>{currentRadius} KM</strong> (1KM → 3KM → 5KM)</span>
            <span>Prioritas Level: <strong>{courier.level}</strong></span>
          </div>

          {/* Accept / Reject Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => onRejectOrder(pendingDispatchOrder.id)}
              className="w-1/3 py-3 bg-black/30 hover:bg-black/50 text-white rounded-2xl font-bold text-xs transition-colors cursor-pointer"
            >
              Tolak
            </button>
            <button
              type="button"
              onClick={() => onAcceptOrder(pendingDispatchOrder.id)}
              className="flex-1 py-3 bg-white hover:bg-amber-50 text-amber-950 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>TERIMA ORDER SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE ASSIGNED ORDER (In-Delivery Workflow) */}
      {currentAssignedOrder && (
        <div className="p-4 bg-white border-2 border-emerald-500 rounded-3xl shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-extrabold text-slate-900 text-sm">Pesanan Sedang Diantar</h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {currentAssignedOrder.orderNumber}
            </span>
          </div>

          {/* Customer & Merchant contact buttons */}
          <div className="p-3 bg-slate-50 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Pelanggan: {currentAssignedOrder.customerName}</p>
                <p className="text-[11px] text-slate-500">{currentAssignedOrder.destinationAddress}</p>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onOpenChat(currentAssignedOrder.id)}
                  className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs"
                  title="Chat Pelanggan"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`tel:${currentAssignedOrder.customerPhone}`}
                  className="p-2 bg-white text-emerald-800 border border-slate-300 rounded-xl"
                  title="Telepon"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Delivery progression step buttons */}
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-bold text-slate-700">Perbarui Status Pengantaran:</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onAdvanceOrderStatus(currentAssignedOrder.id, 'picked_up')}
                className={`py-2 px-1 rounded-xl font-bold transition-all ${
                  currentAssignedOrder.status === 'picked_up'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. Sudah Ambil
              </button>

              <button
                type="button"
                onClick={() => onAdvanceOrderStatus(currentAssignedOrder.id, 'on_delivery')}
                className={`py-2 px-1 rounded-xl font-bold transition-all ${
                  currentAssignedOrder.status === 'on_delivery'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. OTW Antar
              </button>

              <button
                type="button"
                onClick={() => onAdvanceOrderStatus(currentAssignedOrder.id, 'completed')}
                className="py-2 px-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black shadow-xs transition-all"
              >
                3. Selesai Antar!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courier Level Progression & Courier Premium */}
      <div className="p-4 bg-white border border-slate-200 rounded-3xl space-y-3 text-xs shadow-xs">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Tingkatan Level Kurir
          </h4>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Bonus Performa Aktif
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className={`p-2 rounded-xl border ${courier.level === 'Bronze' ? 'border-amber-700 bg-amber-50 font-bold' : 'border-slate-200 text-slate-500'}`}>
            <p className="font-bold text-[11px]">Bronze</p>
            <p className="text-[9px]">80% bagi hasil</p>
          </div>
          <div className={`p-2 rounded-xl border ${courier.level === 'Silver' ? 'border-slate-400 bg-slate-50 font-bold' : 'border-slate-200 text-slate-500'}`}>
            <p className="font-bold text-[11px]">Silver</p>
            <p className="text-[9px]">85% bagi hasil</p>
          </div>
          <div className={`p-2 rounded-xl border ${courier.level === 'Gold' ? 'border-amber-500 bg-amber-50 font-black text-amber-950' : 'border-slate-200 text-slate-500'}`}>
            <p className="font-bold text-[11px]">Gold</p>
            <p className="text-[9px]">90% bagi hasil</p>
          </div>
          <div className={`p-2 rounded-xl border ${courier.level === 'Platinum' ? 'border-purple-600 bg-purple-50 font-bold' : 'border-slate-200 text-slate-500'}`}>
            <p className="font-bold text-[11px]">Platinum</p>
            <p className="text-[9px]">95% bagi hasil</p>
          </div>
        </div>

        {/* Courier Premium Membership */}
        <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-white space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-black text-xs">Courier Premium</span>
            <span className="text-[11px] font-bold bg-black/20 px-2 py-0.5 rounded-md">Rp 20.000 / Bulan</span>
          </div>
          <p className="text-[11px] text-amber-100">
            Benefit: Prioritas order masuk 10 detik lebih awal & bonus reward performa bulanan.
          </p>
          <button
            type="button"
            onClick={onUpgradeCourierPremium}
            className="w-full mt-1.5 py-1.5 bg-white hover:bg-amber-50 text-amber-950 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            {courier.isPremiumMember ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status Premium Aktif</span>
              </>
            ) : (
              <span>Langganan Courier Premium</span>
            )}
          </button>
        </div>
      </div>

      {/* Saldo Dompet & Tarik Dana Kurir */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-800">Saldo Dompet Kurir</p>
            <p className="text-xl font-black text-emerald-800">Rp {courier.walletBalance.toLocaleString('id-ID')}</p>
          </div>
          <span className="text-[11px] text-slate-500">Biaya Tarik: Rp {WITHDRAWAL_FEE.toLocaleString('id-ID')}</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Penarikan dana hasil antar order langsung cair ke rekening bank atau dompet digital tanpa menunggu hari kerja.
        </p>
      </div>

    </div>
  );
};
