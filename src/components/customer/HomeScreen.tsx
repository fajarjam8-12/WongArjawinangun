import React, { useState } from 'react';
import { Merchant, Product, Order, UserProfile, BannerAd, ServiceType } from '../../types';
import { 
  Search, 
  MapPin, 
  Star, 
  Bike, 
  Utensils, 
  ShoppingBag, 
  Package, 
  Zap, 
  Pill, 
  Smartphone, 
  CreditCard, 
  Ticket, 
  Store, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface HomeScreenProps {
  currentUser: UserProfile;
  merchants: Merchant[];
  products: Product[];
  banners: BannerAd[];
  activeOrder?: Order | null;
  onSelectMerchant: (merchant: Merchant) => void;
  onOpenService: (service: ServiceType | 'bills' | 'pulsa' | 'event' | 'jastip') => void;
  onOpenOrderTracking: (order: Order) => void;
  onOpenWallet: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  merchants,
  products,
  banners,
  activeOrder,
  onSelectMerchant,
  onOpenService,
  onOpenOrderTracking,
  onOpenWallet
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentDistrict, setCurrentDistrict] = useState<string>('Jungjang, Arjawinangun');
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Filter merchants according to rules:
  // 1. Merchant tutup TIDAK TAMPIL (isOpen === true)
  // 2. Radius within 1 - 15 KM (distanceKm <= selectedRadius)
  // 3. Category match
  // 4. Search query
  const filteredMerchants = merchants.filter(m => {
    // Closed merchants rule
    if (!m.isOpen) return false;
    // Radius rule
    if (m.distanceKm > selectedRadius) return false;
    // Category rule
    if (selectedCategory !== 'Semua' && m.serviceType !== selectedCategory && m.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMerchant = m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
      const matchProduct = products.some(p => p.merchantId === m.id && p.name.toLowerCase().includes(q));
      return matchMerchant || matchProduct;
    }
    return true;
  });

  const categories = [
    'Semua',
    'Ayam',
    'Bakso',
    'Mie',
    'Kopi',
    'Seafood',
    'Sate',
    'Martabak',
    'Sembako',
    'Apotek',
    'UMKM Lokal'
  ];

  const mainMenus = [
    { id: 'food', name: 'Makanan', icon: Utensils, bg: 'bg-emerald-500 text-white', badge: '10%' },
    { id: 'grocery', name: 'Belanja', icon: ShoppingBag, bg: 'bg-amber-500 text-white', badge: 'Pasar' },
    { id: 'delivery', name: 'Kirim Barang', icon: Package, bg: 'bg-blue-600 text-white', badge: '8rb/2KM' },
    { id: 'bills', name: 'Tagihan', icon: Zap, bg: 'bg-indigo-600 text-white', badge: 'PPOB' },
    { id: 'pharmacy', name: 'Apotek', icon: Pill, bg: 'bg-rose-500 text-white', badge: 'Resep' },
    { id: 'pulsa', name: 'Pulsa', icon: Smartphone, bg: 'bg-teal-600 text-white', badge: 'Murah' },
    { id: 'ppob', name: 'PPOB', icon: CreditCard, bg: 'bg-purple-600 text-white', badge: 'Resmi' },
    { id: 'event', name: 'Tiket Event', icon: Ticket, bg: 'bg-orange-500 text-white', badge: '2026' },
    { id: 'jastip', name: 'Jasa Titip', icon: Store, bg: 'bg-cyan-600 text-white', badge: 'Tegalgubug' },
    { id: 'umkm', name: 'UMKM Lokal', icon: Sparkles, bg: 'bg-lime-600 text-white', badge: 'Arja' },
  ];

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Location Bar & MitraPay Summary */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 rounded-b-3xl shadow-md -mx-4 -mt-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Antar ke Lokasi</p>
              <select 
                value={currentDistrict}
                onChange={(e) => setCurrentDistrict(e.target.value)}
                className="bg-transparent text-xs font-bold text-white border-none focus:outline-none cursor-pointer pr-4"
              >
                <option value="Jungjang, Arjawinangun" className="text-slate-900">Jungjang, Arjawinangun</option>
                <option value="Kebonturi, Arjawinangun" className="text-slate-900">Kebonturi, Arjawinangun</option>
                <option value="Tegalgubug, Arjawinangun" className="text-slate-900">Tegalgubug, Arjawinangun</option>
                <option value="Sende, Arjawinangun" className="text-slate-900">Sende, Arjawinangun</option>
                <option value="Cirebon Timur" className="text-slate-900">Cirebon Timur</option>
              </select>
            </div>
          </div>

          {/* MitraPay Quick Badge */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-lg bg-emerald-400 text-emerald-950 flex items-center justify-center font-black text-[10px]">
              M
            </div>
            <div className="text-left">
              <p className="text-[9px] text-emerald-200">MitraPay</p>
              <p className="text-xs font-extrabold text-white">Rp {currentUser.walletBalance.toLocaleString('id-ID')}</p>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari empal gentong, ayam geprek, sembako, apotek..."
            className="w-full pl-9 pr-4 py-2.5 bg-white text-slate-800 rounded-2xl text-xs font-medium placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Active Order Floating Banner if any */}
      {activeOrder && (
        <div 
          onClick={() => onOpenOrderTracking(activeOrder)}
          className="p-3 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl text-white shadow-lg cursor-pointer flex items-center justify-between gap-2.5 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">Order Sedang Berjalan</span>
              </div>
              <p className="text-xs font-bold truncate">{activeOrder.merchantName || 'Kurir MitraArja'}</p>
              <p className="text-[10px] text-emerald-100 truncate">{activeOrder.courierName || 'Kang Asep'} • {activeOrder.estimatedMinutes} Menit lagi</p>
            </div>
          </div>
          <button 
            type="button"
            className="px-2.5 py-1.5 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow-xs shrink-0 whitespace-nowrap"
          >
            Lacak
          </button>
        </div>
      )}

      {/* Promotional Banner Carousel (Monetization: Iklan Banner) */}
      <div className="relative overflow-hidden rounded-2xl shadow-sm bg-slate-900 h-36">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === activeBannerIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-[10px] font-extrabold text-white self-start uppercase tracking-wider mb-1">
                {banner.badge}
              </span>
              <h3 className="text-sm font-black text-white">{banner.title}</h3>
              <p className="text-[11px] text-slate-200">{banner.subtitle}</p>
            </div>
          </div>
        ))}
        {/* Banner indicators */}
        <div className="absolute bottom-2 right-3 z-20 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBannerIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeBannerIdx ? 'w-5 bg-emerald-400' : 'bg-white/50'
              }`}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 10 MAIN MENUS GRID */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-extrabold text-slate-900 text-sm">Layanan MitraArja</h3>
          <span className="text-[11px] font-bold text-emerald-700">Super App Lokal</span>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {mainMenus.map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                key={menu.id}
                onClick={() => onOpenService(menu.id as any)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 group-active:scale-95 ${menu.bg}`}>
                  <Icon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-black px-1 rounded-full shadow-xs">
                    {menu.badge}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight line-clamp-1">
                  {menu.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radius and Category Filters (Rule: 1 - 15 KM, closed merchants hidden) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Radius Jangkauan: <strong>{selectedRadius} KM</strong></span>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            Toko Buka Saja ({filteredMerchants.length})
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          value={selectedRadius}
          onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
          className="w-full accent-emerald-600"
        />

        {/* Horizontal Category Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Best Sellers strip */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            Menu Favorit Arjawinangun
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Best Seller</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {products.slice(0, 5).map((prod) => {
            const merchant = merchants.find(m => m.id === prod.merchantId);
            return (
              <div 
                key={prod.id}
                onClick={() => merchant && onSelectMerchant(merchant)}
                className="w-36 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-24 w-full bg-slate-100">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {prod.promoBadge && (
                    <span className="absolute top-1 left-1 bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                      {prod.promoBadge}
                    </span>
                  )}
                </div>
                <div className="p-2 space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{prod.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{merchant?.name}</p>
                  <p className="text-xs font-extrabold text-emerald-700">Rp {prod.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Merchant Terdekat (Radius 1 - 15 KM, Closed Merchants strictly hidden) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Merchant Terdekat</h3>
            <p className="text-[11px] text-slate-500">UMKM & Resto siap diantar kurir independen</p>
          </div>
          <span className="text-xs text-emerald-700 font-bold">
            Radius 1-{selectedRadius} KM
          </span>
        </div>

        {filteredMerchants.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            <p className="font-semibold text-xs">Tidak ada merchant yang buka dalam radius {selectedRadius} KM</p>
            <p className="text-[11px] text-slate-400 mt-1">Coba perlebar radius atau pilih kategori lain</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                onClick={() => onSelectMerchant(merchant)}
                className="p-3 bg-white border border-slate-200 rounded-2xl hover:border-emerald-300 transition-all shadow-xs flex gap-3 cursor-pointer group"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img 
                    src={merchant.banner} 
                    alt={merchant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {merchant.isPremiumMember && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-amber-950 text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      Mitra VIP
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                        {merchant.category}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">
                        {merchant.district}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                      {merchant.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="text-amber-500 font-extrabold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {merchant.rating} ({merchant.totalOrders}+)
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-700">
                        {merchant.distanceKm} KM
                      </span>
                      <span>•</span>
                      <span>~15-25 mnt</span>
                    </div>
                  </div>

                  {merchant.activePromo && (
                    <div className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md inline-block truncate border border-amber-200/60 self-start">
                      {merchant.activePromo}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
