import React, { useState } from 'react';
import { Merchant, Product, CartItem } from '../../types';
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Sparkles,
  Phone,
  CheckCircle,
  FileText
} from 'lucide-react';

interface StoreDetailModalProps {
  merchant: Merchant;
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number, notes?: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenCart: () => void;
  onClose: () => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  merchant,
  products,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeTab, setActiveTab] = useState<'menu' | 'info' | 'reviews'>('menu');

  const merchantProducts = products.filter(p => p.merchantId === merchant.id);
  const categories = ['Semua', ...Array.from(new Set(merchantProducts.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Semua' 
    ? merchantProducts 
    : merchantProducts.filter(p => p.category === selectedCategory);

  const cartForMerchant = cart.filter(item => item.product.merchantId === merchant.id);
  const totalItems = cartForMerchant.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cartForMerchant.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  const getItemQuantity = (productId: string) => {
    const item = cart.find(c => c.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl h-full sm:h-[90vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in duration-200">
        
        {/* Banner and Header */}
        <div className="relative h-44 sm:h-52 w-full bg-slate-900 shrink-0">
          <img 
            src={merchant.banner} 
            alt={merchant.name} 
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup detail merchant"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Basic Info */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3">
            <img 
              src={merchant.logo} 
              alt={merchant.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white object-cover bg-white shadow-md shrink-0"
            />
            <div className="text-white min-w-0 flex-1 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  {merchant.category}
                </span>
                {merchant.isPremiumMember && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-amber-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    Official Mitra
                  </span>
                )}
                {merchant.isOpen ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                    Buka
                  </span>
                ) : (
                  <span className="text-[10px] bg-rose-500/30 text-rose-300 font-bold px-2 py-0.5 rounded-md border border-rose-400/30">
                    Tutup
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold truncate mt-1">
                {merchant.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {merchant.rating} ({merchant.totalOrders}+ order)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {merchant.distanceKm} KM ({merchant.district})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Bar if any */}
        {merchant.activePromo && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
              Promo: {merchant.activePromo}
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
              Otomatis Diterapkan
            </span>
          </div>
        )}

        {/* Tabs: Menu, Info Toko, Ulasan */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'menu'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar Produk ({merchantProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Info Toko & Lokasi
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Ulasan Pembeli</span>
            <span className="text-amber-500 flex items-center">
              <Star className="w-3 h-3 fill-current inline" />
              {merchant.rating}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'menu' && (
            <>
              {/* Category chips */}
              {categories.length > 2 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Products list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => {
                  const qty = getItemQuantity(product.id);
                  return (
                    <div 
                      key={product.id}
                      className="p-3 bg-white border border-slate-200 rounded-2xl hover:border-emerald-300 transition-all shadow-xs flex gap-3"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                        {product.promoBadge && (
                          <span className="absolute top-1 left-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                            {product.promoBadge}
                          </span>
                        )}
                        {product.isHardMedicine && (
                          <span className="absolute bottom-1 left-1 bg-amber-500 text-amber-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                            Wajib Resep
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-sm font-black text-emerald-700">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-slate-400 line-through ml-1.5">
                                Rp {product.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>

                          {/* Stepper or Add button */}
                          {qty > 0 ? (
                            <div className="flex items-center gap-2 bg-emerald-50 rounded-xl p-1 border border-emerald-200">
                              <button
                                onClick={() => onUpdateQuantity(product.id, qty - 1)}
                                className="w-6 h-6 rounded-lg bg-white text-emerald-800 shadow-xs flex items-center justify-center font-bold hover:bg-emerald-100"
                                aria-label="Kurangi pesanan"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-emerald-900 w-4 text-center">
                                {qty}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(product.id, qty + 1)}
                                className="w-6 h-6 rounded-lg bg-emerald-600 text-white shadow-xs flex items-center justify-center font-bold hover:bg-emerald-700"
                                aria-label="Tambah pesanan"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => onAddToCart(product, 1)}
                              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Tambah
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4 text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Alamat Lengkap</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{merchant.address}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Kecamatan: {merchant.district}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Jam Operasional</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{merchant.openHours}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Sistem memfilter otomatis: Merchant yang tutup tidak dapat dipesan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Kontak Merchant</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{merchant.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Kebijakan Merchant & Platform</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Komisi platform 10%. Pengiriman dilakukan oleh Kurir Independen Arjawinangun terverifikasi dengan radius maksimal 15 KM.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-emerald-950 flex items-center gap-1.5">
                    {merchant.rating}
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    Berdasarkan {merchant.totalOrders} transaksi selesai
                  </p>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium bg-white/70 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                  Hanya ulasan pembeli terverifikasi
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-2.5">
                <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Budi Santoso (Jungjang)</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">5.0 ★</span>
                  </div>
                  <p className="text-slate-600">
                    Sambel koreknya juara banget, ayamnya renyah dan porsinya mengenyangkan. Kurir MitraArja sampainya cuma 15 menit!
                  </p>
                  <p className="text-[10px] text-slate-400">Order: Paket Hemat Ayam Geprek • Kemarin</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Siti Rahma (Kebonturi)</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">5.0 ★</span>
                  </div>
                  <p className="text-slate-600">
                    Sangat terbantu ada MitraArja, ga perlu keluar rumah panas-panas ke stasiun. Makanan masih anget pas sampai.
                  </p>
                  <p className="text-[10px] text-slate-400">Order: Ayam Bakar Madu • 3 hari lalu</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Cart Footer */}
        {totalItems > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shadow-xl flex items-center justify-between gap-4 shrink-0">
            <div>
              <p className="text-xs text-slate-500 font-medium">
                {totalItems} item dipilih di {merchant.name}
              </p>
              <p className="text-base font-black text-emerald-800">
                Rp {subtotal.toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={onOpenCart}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Lihat Keranjang
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
