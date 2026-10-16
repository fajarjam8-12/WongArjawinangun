import React, { useState } from 'react';
import { Merchant, Product, Order, UserProfile } from '../../types';
import { WITHDRAWAL_FEE } from '../../utils/pricing';
import { 
  Store, 
  DollarSign, 
  ShoppingBag, 
  Star, 
  Plus, 
  Edit3, 
  Power, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Tag, 
  Image as ImageIcon,
  Check,
  X,
  Layers
} from 'lucide-react';

interface MerchantDashboardProps {
  currentUser: UserProfile;
  merchants: Merchant[];
  products: Product[];
  orders: Order[];
  onToggleStoreOpen: (merchantId: string, isOpen: boolean) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onToggleStock: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onWithdraw: (amount: number) => void;
  onUpgradeMembership: (merchantId: string) => void;
  onBackToCustomer?: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  currentUser,
  merchants,
  products,
  orders,
  onToggleStoreOpen,
  onAddProduct,
  onToggleStock,
  onUpdateOrderStatus,
  onWithdraw,
  onUpgradeMembership,
  onBackToCustomer
}) => {
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(merchants[0]?.id || 'm1');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'promos' | 'wallet' | 'membership'>('overview');
  
  // New product form modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Ayam');
  const [newProdPrice, setNewProdPrice] = useState<number>(20000);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80');

  const currentMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];
  const merchantProducts = products.filter(p => p.merchantId === currentMerchant.id);
  const merchantOrders = orders.filter(o => o.merchantId === currentMerchant.id);

  // Stats calculation
  const todayOrders = merchantOrders.length;
  const todayRevenue = merchantOrders.reduce((sum, o) => sum + o.merchantEarned, 0);
  const totalProductsSold = merchantOrders.reduce((sum, o) => sum + (o.items ? o.items.reduce((acc, i) => acc + i.quantity, 0) : 0), 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    onAddProduct({
      merchantId: currentMerchant.id,
      name: newProdName,
      category: newProdCategory,
      price: newProdPrice,
      description: newProdDesc || 'Menu lezat pilihan khas Arjawinangun',
      image: newProdImage,
      inStock: true
    });
    setNewProdName('');
    setNewProdDesc('');
    setShowAddModal(false);
    alert('Produk baru berhasil ditambahkan dan langsung aktif di katalog!');
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Merchant Header & Store Selector */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 rounded-b-3xl shadow-lg -mx-4 -mt-4 mb-4">
        {onBackToCustomer && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
            <button
              onClick={onBackToCustomer}
              className="text-emerald-200 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>← Mode Belanja (Customer)</span>
            </button>
            <span className="text-[10px] text-emerald-300 font-mono">PORTAL MERCHANT</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-300" />
            <h2 className="text-base font-bold">Dashboard Mitra Merchant</h2>
          </div>
          {/* Store Switcher */}
          <select
            value={selectedMerchantId}
            onChange={(e) => setSelectedMerchantId(e.target.value)}
            className="bg-white/15 text-xs font-bold text-white rounded-xl px-2.5 py-1.5 border border-white/20 focus:outline-none cursor-pointer max-w-[160px] truncate"
          >
            {merchants.map(m => (
              <option key={m.id} value={m.id} className="text-slate-900">
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Store Profile Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={currentMerchant.logo} 
              alt={currentMerchant.name} 
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-white truncate">{currentMerchant.name}</h3>
                {currentMerchant.isPremiumMember && (
                  <span className="bg-amber-400 text-amber-950 font-black text-[9px] px-1.5 py-0.2 rounded">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">{currentMerchant.category} • {currentMerchant.district}</p>
              <div className="flex items-center gap-2 text-[11px] text-white/90 mt-1">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {currentMerchant.rating}
                </span>
                <span>•</span>
                <span>{currentMerchant.totalOrders} Pesanan Selesai</span>
              </div>
            </div>
          </div>

          {/* Store Open/Close Toggle */}
          <div className="text-right shrink-0">
            <button
              onClick={() => onToggleStoreOpen(currentMerchant.id, !currentMerchant.isOpen)}
              className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                currentMerchant.isOpen 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{currentMerchant.isOpen ? 'BUKA' : 'TUTUP'}</span>
            </button>
            <p className="text-[10px] text-emerald-200 mt-1">
              {currentMerchant.isOpen ? 'Menerima order' : 'Disembunyikan'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Ringkasan' },
          { id: 'orders', label: `Pesanan Masuk (${merchantOrders.length})` },
          { id: 'products', label: `Menu & Stok (${merchantProducts.length})` },
          { id: 'wallet', label: 'Dompet & Komisi' },
          { id: 'membership', label: 'Membership PRO' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === t.id ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pendapatan Bersih</span>
              <p className="text-base font-black text-emerald-700 mt-0.5">
                Rp {todayRevenue.toLocaleString('id-ID')}
              </p>
              <span className="text-[10px] text-slate-500">Setelah komisi 10%</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pesanan Hari Ini</span>
              <p className="text-base font-black text-slate-800 mt-0.5">{todayOrders}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+100% On-time</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Produk Terjual</span>
              <p className="text-base font-black text-slate-800 mt-0.5">{totalProductsSold} porsi</p>
              <span className="text-[10px] text-slate-500">Dari semua menu</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Rating Toko</span>
              <p className="text-base font-black text-amber-500 mt-0.5 flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {currentMerchant.rating}
              </p>
              <span className="text-[10px] text-slate-500">Review terverifikasi</span>
            </div>
          </div>

          {/* Monetization note: 10% Commission rule */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Skema Komisi Otomatis Platform: 10%</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Setiap transaksi pesanan berhasil, merchant menerima 90% langsung ke dompet MitraPay. Platform memungut 10% komisi untuk pemeliharaan server & garansi kurir.
              </p>
            </div>
          </div>

          {/* Quick Active Orders Preview */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900">Pesanan Perlu Diproses</h4>
            {merchantOrders.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                Tidak ada pesanan aktif saat ini
              </div>
            ) : (
              merchantOrders.map((ord) => (
                <div key={ord.id} className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-400">{ord.orderNumber}</span>
                    <p className="font-bold text-slate-900 text-xs">{ord.customerName} ({ord.customerPhone})</p>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {ord.items?.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-700">Rp {ord.merchantEarned.toLocaleString('id-ID')}</span>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {merchantOrders.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Belum ada pesanan masuk untuk toko ini
            </div>
          ) : (
            merchantOrders.map((ord) => (
              <div key={ord.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{ord.orderNumber}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{ord.customerName}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Status: {ord.status}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-xs">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span className="font-semibold">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  {ord.deliveryNotes && (
                    <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                      Catatan pembeli: "{ord.deliveryNotes}"
                    </p>
                  )}
                </div>

                {/* Status action buttons */}
                <div className="flex gap-2 pt-1">
                  {ord.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(ord.id, 'merchant_accepted')}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Terima & Mulai Masak
                    </button>
                  )}
                  {ord.status === 'merchant_accepted' && (
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(ord.id, 'picked_up')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Serahkan ke Kurir ({ord.courierName || 'Kurir'})
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PRODUCTS & STOCKS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Daftar Produk & Kelola Stok</h4>
              <p className="text-xs text-slate-500">Klik toggle stok jika produk habis hari ini</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tambah Produk
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {merchantProducts.map((p) => (
              <div 
                key={p.id}
                className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
              >
                <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-xs truncate">{p.name}</h4>
                  <p className="text-emerald-700 font-extrabold text-xs">Rp {p.price.toLocaleString('id-ID')}</p>
                  <span className="text-[10px] text-slate-400">{p.category}</span>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => onToggleStock(p.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                      p.inStock 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800' 
                        : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800'
                    }`}
                  >
                    {p.inStock ? 'Tersedia' : 'Habis'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WALLET TAB */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl text-white">
            <p className="text-xs text-emerald-200">Saldo Penjualan Merchant</p>
            <p className="text-2xl font-black mt-1">Rp {currentUser.walletBalance.toLocaleString('id-ID')}</p>
            <p className="text-[11px] text-emerald-200 mt-1">Dapat ditarik ke rekening bank mana saja</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
            <p className="font-bold text-slate-800">Biaya Penarikan Saldo: Rp {WITHDRAWAL_FEE.toLocaleString('id-ID')}</p>
            <p className="text-slate-600">Proses pencairan instan 24 jam ke BCA, Mandiri, BRI, BNI.</p>
          </div>

          <button
            onClick={() => onWithdraw(500000)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Tarik Saldo Rp 500.000 ke Rekening Bank
          </button>
        </div>
      )}

      {/* MEMBERSHIP TAB */}
      {activeTab === 'membership' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl text-white">
            <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
              Paket Langganan Mitra
            </span>
            <h3 className="text-lg font-black mt-1">Merchant Premium</h3>
            <p className="text-xl font-black mt-1">Rp 100.000 / Bulan</p>
            <div className="mt-3 space-y-1 text-xs text-amber-100">
              <p>✓ Prioritas Listing di Halaman Utama</p>
              <p>✓ Akses Dashboard Analytics & Tren Pembelian</p>
              <p>✓ Promo Tools & Voucher Khusus Toko</p>
            </div>
          </div>

          <button
            onClick={() => onUpgradeMembership(currentMerchant.id)}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer"
          >
            {currentMerchant.isPremiumMember ? 'Perpanjang Membership (Aktif)' : 'Aktifkan Merchant Premium Sekarang'}
          </button>

          {/* Banner Ads System */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs">
            <h4 className="font-extrabold text-sm text-slate-900">Iklan Banner Homepage (Ads System)</h4>
            <p className="text-slate-600">
              Pasang banner promosi tokomu di carousel teratas aplikasi MitraArja.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="font-bold text-slate-800">1 Minggu</p>
                <p className="text-emerald-700 font-black text-sm">Rp 50.000</p>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="font-bold text-slate-800">1 Bulan (Hemat)</p>
                <p className="text-emerald-700 font-black text-sm">Rp 150.000</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Menu / Produk Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Produk / Makanan</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Contoh: Ayam Geprek Keju Mozarella"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="Ayam">Ayam</option>
                    <option value="Bakso">Bakso</option>
                    <option value="Mie">Mie</option>
                    <option value="Kopi">Kopi</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Sate">Sate</option>
                    <option value="Martabak">Martabak</option>
                    <option value="Sembako">Sembako</option>
                    <option value="UMKM Lokal">UMKM Lokal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(parseInt(e.target.value) || 0)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Deskripsi bahan dan rasa..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Simpan & Pasarkan Produk
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
