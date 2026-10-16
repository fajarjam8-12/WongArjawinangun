import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  MessageSquare, 
  Star 
} from 'lucide-react';

interface OrdersHistoryViewProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onOpenChat: (orderId: string) => void;
}

export const OrdersHistoryView: React.FC<OrdersHistoryViewProps> = ({
  orders,
  onTrackOrder,
  onOpenChat
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return !['completed', 'cancelled'].includes(order.status);
    }
    if (activeTab === 'completed') {
      return order.status === 'completed';
    }
    if (activeTab === 'cancelled') {
      return order.status === 'cancelled';
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Mencari Kurir</span>;
      case 'merchant_accepted':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Disiapkan Toko</span>;
      case 'courier_assigned':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Kurir Menuju Toko</span>;
      case 'picked_up':
      case 'on_delivery':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">Sedang Diantar</span>;
      case 'delivered':
      case 'completed':
        return <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Selesai</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Dibatalkan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 rounded-b-3xl shadow-md -mx-4 -mt-4 mb-4">
        <h2 className="text-lg font-bold">Daftar Pesanan Saya</h2>
        <p className="text-xs text-emerald-100">Pantau transaksi dan status pengiriman secara realtime</p>
      </div>

      {/* Tabs: Aktif, Selesai, Dibatalkan */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'active' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Aktif ({orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'completed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Selesai ({orders.filter(o => o.status === 'completed').length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'cancelled' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dibatalkan ({orders.filter(o => o.status === 'cancelled').length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-2">
          <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
          <p className="font-semibold text-xs text-slate-600">Tidak ada pesanan di tab ini</p>
          <p className="text-[11px]">Semua pesanan makanan, belanja, dan kirim paket akan tercatat di sini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold block">{order.orderNumber}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{order.merchantName || order.serviceType.toUpperCase()}</h4>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl">
                {order.items && order.items.length > 0 ? (
                  <p className="font-medium text-slate-800 line-clamp-1">
                    {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                  </p>
                ) : (
                  <p className="font-medium text-slate-800">{order.itemDescription || 'Pengiriman Paket Instan'}</p>
                )}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
                  <span className="text-slate-500">{order.createdAt}</span>
                  <span className="font-black text-emerald-800 text-xs">
                    Rp {order.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => onOpenChat(order.id)}
                  className="py-1.5 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  Chat
                </button>

                <button
                  type="button"
                  onClick={() => onTrackOrder(order)}
                  className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  Lacak Detail
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
