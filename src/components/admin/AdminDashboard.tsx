import React, { useState } from 'react';
import { AdminStats, FraudAlert, Merchant, CourierProfile, Order, BannerAd } from '../../types';
import { 
  ShieldAlert, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Store, 
  Bike, 
  Package, 
  CheckCircle2, 
  Ban, 
  Sliders, 
  MapPin, 
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  stats: AdminStats;
  fraudAlerts: FraudAlert[];
  merchants: Merchant[];
  couriers: CourierProfile[];
  orders: Order[];
  banners: BannerAd[];
  onReviewFraud: (id: string, action: 'reviewed' | 'banned') => void;
  onUpdateCommissionRate: (ratePercent: number) => void;
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  fraudAlerts,
  merchants,
  couriers,
  orders,
  banners,
  onReviewFraud,
  onUpdateCommissionRate,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'monetization' | 'fraud' | 'zones' | 'database'>('overview');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [commissionRate, setCommissionRate] = useState<number>(10);
  const [baseServiceFee, setBaseServiceFee] = useState<number>(1500);

  // Period multiplier for chart simulation
  const multiplier = period === 'daily' ? 0.03 : (period === 'weekly' ? 0.22 : (period === 'monthly' ? 1.0 : 12.0));
  const currentGmv = Math.round(stats.gmv * multiplier);
  const currentRev = Math.round(stats.platformRevenue * multiplier);
  const currentProfit = Math.round(stats.netProfit * multiplier);
  const currentOrders = Math.round(stats.totalOrders * multiplier);

  // Monetization breakdown
  const revenueBreakdown = [
    { title: 'Komisi Merchant (10%)', amount: Math.round(currentRev * 0.58), percent: 58, desc: 'Dari total subtotal transaksi restoran & UMKM' },
    { title: 'Service Fee (Rp 1.000 - 2.500)', amount: Math.round(currentRev * 0.18), percent: 18, desc: 'Biaya aplikasi per transaksi customer' },
    { title: 'Iklan & Banner Homepage', amount: Math.round(currentRev * 0.10), percent: 10, desc: 'Rp 50.000/minggu & Rp 150.000/bulan' },
    { title: 'Membership Pro (Merchant & Kurir)', amount: Math.round(currentRev * 0.08), percent: 8, desc: 'Merchant Rp 100k/bln, Kurir Rp 20k/bln' },
    { title: 'Margin API Tagihan & Pulsa PPOB', amount: Math.round(currentRev * 0.04), percent: 4, desc: 'Selisih harga beli provider vs tarif jual' },
    { title: 'Biaya Penarikan Saldo (Rp 2.500)', amount: Math.round(currentRev * 0.02), percent: 2, desc: 'Cashout fee dompet mitra' },
  ];

  return (
    <div className="space-y-4 pb-20">
      
      {/* Super Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 rounded-b-3xl shadow-xl -mx-4 -mt-4 mb-4 border-b border-emerald-500/20">
        {onExitAdmin && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
            <span className="text-[10px] text-emerald-400 font-mono font-bold">🔐 PORTAL FOUNDER & SUPER ADMIN</span>
            <button
              onClick={onExitAdmin}
              className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
            >
              Keluar dari Admin
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Super Admin Platform</h2>
              <p className="text-[10px] text-emerald-300 font-mono">MITRAARJA HYPERLOCAL ARCHITECTURE</p>
            </div>
          </div>

          {/* Timeframe Pill */}
          <div className="flex bg-white/10 rounded-xl p-0.5 text-[11px] font-bold">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  period === p ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'daily' ? 'Hari' : (p === 'weekly' ? 'Minggu' : (p === 'monthly' ? 'Bulan' : 'Tahun'))}
              </button>
            ))}
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total GMV Transaksi</span>
            <p className="text-lg font-black text-white mt-0.5">Rp {(currentGmv / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+24.5% MoM</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Platform Revenue</span>
            <p className="text-lg font-black text-emerald-400 mt-0.5">Rp {(currentRev / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-emerald-400 font-semibold">Take-rate 12.0%</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Laba Bersih Platform</span>
            <p className="text-lg font-black text-teal-300 mt-0.5">Rp {(currentProfit / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-slate-400">Full Automated</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Transaksi</span>
            <p className="text-lg font-black text-amber-300 mt-0.5">{currentOrders.toLocaleString('id-ID')}</p>
            <span className="text-[10px] text-slate-400">Arjawinangun Area</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Ringkasan Eksekutif' },
          { id: 'monetization', label: 'Monetisasi & Tarif' },
          { id: 'fraud', label: `Deteksi Fraud (${fraudAlerts.filter(f => f.status === 'flagged').length})` },
          { id: 'zones', label: 'Zona & Wilayah' },
          { id: 'database', label: 'Skema Database Utama' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === t.id ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Ecosystem stats */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalUsers.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Customer Aktif</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Store className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalMerchants}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Merchant UMKM</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Bike className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalCouriers}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Kurir Independen</p>
            </div>
          </div>

          {/* Interactive Bar Chart Representation */}
          <div className="p-4 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-sm text-slate-900">Grafik Penjualan ({period.toUpperCase()})</h4>
              <span className="text-xs text-emerald-700 font-bold">Tren Pertumbuhan +32%</span>
            </div>
            
            {/* Chart bars */}
            <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200">
              {[45, 62, 58, 74, 85, 92, 100].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-bold text-slate-400">{val}%</span>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-500" 
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-500 font-medium">H-{7 - idx}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Arjawinangun Pantura</span>
              <span>Pasar Tegalgubug</span>
              <span>Jungjang & Sende</span>
            </div>
          </div>

          {/* Founder Automation Banner */}
          <div className="p-4 bg-slate-900 rounded-3xl text-white space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              Sistem Operasional 1-Founder Otomatis Penuh
            </div>
            <p className="text-xs text-slate-300">
              Platform tidak memiliki armada fisik. Sistem melakukan otomatisasi penuh pada:
              pendaftaran merchant, verifikasi kurir, auto dispatch 30 detik (1KM-3KM-5KM), pembayaran QRIS/MitraPay, settlement harian, komisi 10%, notifikasi WhatsApp, dan laporan keuangan.
            </p>
          </div>
        </div>
      )}

      {/* MONETIZATION TAB */}
      {activeTab === 'monetization' && (
        <div className="space-y-4">
          {/* Monetization Streams list */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-slate-900">7 Sumber Pendapatan Platform</h4>
            {revenueBreakdown.map((rev, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-xs">{idx + 1}. {rev.title}</span>
                  <span className="font-black text-emerald-700 text-xs">Rp {rev.amount.toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${rev.percent}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">{rev.desc}</p>
              </div>
            ))}
          </div>

          {/* Tariff Configuration Form */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Pengaturan Tarif & Margin Platform
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Persentase Komisi Merchant (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => {
                    const r = parseInt(e.target.value) || 10;
                    setCommissionRate(r);
                    onUpdateCommissionRate(r);
                  }}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Biaya Layanan Dasar (Rp)</label>
                <input
                  type="number"
                  value={baseServiceFee}
                  onChange={(e) => setBaseServiceFee(parseInt(e.target.value) || 1500)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
              <p className="font-bold text-slate-800">Rumus Biaya Ongkir Kirim Barang:</p>
              <p>• 2 KM pertama = <strong>Rp 8.000</strong></p>
              <p>• Setiap KM berikutnya = <strong>Rp 2.000 / KM</strong></p>
              <p>• Maksimal berat barang = <strong>20 KG</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* FRAUD DETECTION TAB */}
      {activeTab === 'fraud' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                Pusat Deteksi Kecurangan (Fraud Prevention)
              </h4>
              <p className="text-xs text-slate-500">
                Deteksi otomatis: Order Fiktif, Akun Ganda (Multi-Account), dan Manipulasi Kode Voucher
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {fraudAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-3.5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      alert.severity === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-slate-900">{alert.targetUser}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                </div>

                <p className="text-slate-600 text-xs">{alert.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className={`text-[10px] font-bold ${alert.status === 'banned' ? 'text-rose-600' : (alert.status === 'reviewed' ? 'text-emerald-600' : 'text-amber-600')}`}>
                    Status: {alert.status.toUpperCase()}
                  </span>

                  <div className="flex gap-2">
                    {alert.status === 'flagged' && (
                      <>
                        <button
                          onClick={() => onReviewFraud(alert.id, 'reviewed')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Tandai Aman
                        </button>
                        <button
                          onClick={() => onReviewFraud(alert.id, 'banned')}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1"
                        >
                          <Ban className="w-3 h-3" />
                          Blokir Akun
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ZONES TAB */}
      {activeTab === 'zones' && (
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-sm text-slate-900">Manajemen Zona Hyperlocal</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: 'Kecamatan Arjawinangun (Pusat)', status: 'Aktif Penuh', merchants: 180, couriers: 95 },
              { name: 'Desa Jungjang & Sekitarnya', status: 'Aktif Penuh', merchants: 42, couriers: 25 },
              { name: 'Pasar Grosir Tegalgubug', status: 'Zona Khusus Jastip', merchants: 65, couriers: 30 },
              { name: 'Desa Kebonturi & Sende', status: 'Aktif', merchants: 18, couriers: 12 },
              { name: 'Cirebon Timur Expansion', status: 'Fase Persiapan', merchants: 12, couriers: 8 }
            ].map((z, i) => (
              <div key={i} className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{z.name}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {z.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {z.merchants} Merchant terdaftar • {z.couriers} Kurir armada independen
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DATABASE SCHEMA TAB */}
      {activeTab === 'database' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900 text-slate-200 rounded-2xl space-y-1.5 font-mono text-[11px]">
            <p className="font-bold text-emerald-400">Database Utama MitraArja (PostgreSQL / Supabase Ready):</p>
            <p className="text-slate-400 leading-relaxed">
              users, addresses, merchants, merchant_branches, couriers, products, categories, orders, order_items, payments, wallets, wallet_transactions, withdrawals, reviews, coupons, promotions, referrals, notifications, chats, messages, banners, advertisements, service_fees, delivery_fees, routes, zones, cities, districts, villages, ppob_transactions, membership_subscriptions, audit_logs, reports, support_tickets.
            </p>
          </div>
          <p className="text-slate-500 text-[11px]">
            Struktur relasi microservice multi-city dirancang untuk skalabilitas ribuan kurir dan merchant tanpa sentuhan manual operasional.
          </p>
        </div>
      )}

    </div>
  );
};
