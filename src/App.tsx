import React, { useState } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Merchant, 
  Product, 
  CourierProfile, 
  Order, 
  CartItem, 
  BannerAd, 
  FraudAlert, 
  AdminStats,
  OrderStatus,
  ServiceType
} from './types';
import { 
  INITIAL_USERS, 
  INITIAL_MERCHANTS, 
  INITIAL_PRODUCTS, 
  INITIAL_COURIERS, 
  INITIAL_ADS, 
  INITIAL_ORDERS, 
  INITIAL_FRAUD_ALERTS, 
  INITIAL_ADMIN_STATS 
} from './data/mockData';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthModal, AuthInitialTab } from './components/auth/AuthModal';
import { HomeScreen } from './components/customer/HomeScreen';
import { StoreDetailModal } from './components/customer/StoreDetailModal';
import { PackageDeliveryModal } from './components/customer/PackageDeliveryModal';
import { BillsAndPpobModal } from './components/customer/BillsAndPpobModal';
import { EventAndJastipModal } from './components/customer/EventAndJastipModal';
import { CartCheckoutModal } from './components/customer/CartCheckoutModal';
import { OrderTrackingModal } from './components/customer/OrderTrackingModal';
import { ChatModal } from './components/customer/ChatModal';
import { WalletModal } from './components/customer/WalletModal';
import { OrdersHistoryView } from './components/customer/OrdersHistoryView';
import { CustomerProfileView } from './components/customer/CustomerProfileView';
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { CourierDashboard } from './components/courier/CourierDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DriverLogo } from './components/common/DriverLogo';

import { 
  Home, 
  ShoppingBag, 
  MessageSquare, 
  Wallet, 
  User, 
  Lock,
  Store,
  Bike,
  ShieldCheck,
  ChevronDown,
  LogOut,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Check ?autostart=1
  const isAutostart = typeof window !== 'undefined' && window.location.search.includes('autostart=1');

  // Application States
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]);
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [showSplash, setShowSplash] = useState(!isAutostart);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<AuthInitialTab>('whatsapp');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  // Database States
  const [merchants, setMerchants] = useState<Merchant[]>(INITIAL_MERCHANTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [courier, setCourier] = useState<CourierProfile>(INITIAL_COURIERS[0]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [banners, setBanners] = useState<BannerAd[]>(INITIAL_ADS);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>(INITIAL_FRAUD_ALERTS);
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);

  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCustomerTab, setActiveCustomerTab] = useState<'home' | 'orders' | 'chat' | 'wallet' | 'profile'>('home');
  const [selectedMerchantForDetail, setSelectedMerchantForDetail] = useState<Merchant | null>(null);
  const [showPackageDelivery, setShowPackageDelivery] = useState(false);
  const [showBillsPpob, setShowBillsPpob] = useState(false);
  const [billsPpobInitialTab, setBillsPpobInitialTab] = useState<'bills' | 'pulsa' | 'ppob'>('bills');
  const [showEventJastip, setShowEventJastip] = useState(false);
  const [eventJastipInitialType, setEventJastipInitialType] = useState<'event' | 'jastip'>('event');
  const [showCartCheckout, setShowCartCheckout] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [activeChatOrderId, setActiveChatOrderId] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Active in-progress order for customer view
  const activeOrder = orders.find(o => !['completed', 'cancelled'].includes(o.status)) || null;

  // Handle Role Switching
  const handleSwitchRole = (role: UserRole) => {
    setCurrentRole(role);
    setShowSplash(false);
    setShowRoleMenu(false);
    const targetUser = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
  };

  // Open Auth with specific tab
  const handleOpenAuth = (tab: AuthInitialTab = 'whatsapp') => {
    setAuthInitialTab(tab);
    setShowAuthModal(true);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, notes = '') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, notes }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  // Order Placement
  const handlePlaceOrder = (newOrderData: Partial<Order>) => {
    const fullOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: newOrderData.orderNumber || `ARJA-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      merchantId: newOrderData.merchantId,
      merchantName: newOrderData.merchantName,
      courierId: undefined,
      courierName: undefined,
      serviceType: newOrderData.serviceType || 'food',
      items: newOrderData.items || [],
      pickupAddress: newOrderData.pickupAddress || 'Arjawinangun',
      destinationAddress: newOrderData.destinationAddress || currentUser.address,
      distanceKm: newOrderData.distanceKm || 2.0,
      deliveryNotes: newOrderData.deliveryNotes,
      status: newOrderData.status || 'pending',
      paymentMethod: newOrderData.paymentMethod || 'mitrapay',
      paymentStatus: newOrderData.paymentStatus || 'paid',
      subtotal: newOrderData.subtotal || 0,
      deliveryFee: newOrderData.deliveryFee || 8000,
      platformFee: newOrderData.platformFee || 1500,
      discount: newOrderData.discount || 0,
      total: newOrderData.total || 0,
      courierEarned: newOrderData.courierEarned || 7200,
      merchantEarned: newOrderData.merchantEarned || 0,
      platformCommission: newOrderData.platformCommission || 2000,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: newOrderData.estimatedMinutes || 20,
      progressPercent: newOrderData.progressPercent || 15
    };

    setOrders(prev => [fullOrder, ...prev]);

    // Update wallet balance if paid with MitraPay
    if (fullOrder.paymentMethod === 'mitrapay') {
      setCurrentUser(prev => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - fullOrder.total),
        points: prev.points + Math.floor(fullOrder.total / 10000)
      }));
    }

    // Open tracking modal immediately for delivery-based orders
    if (fullOrder.serviceType !== 'bills' && fullOrder.serviceType !== 'pulsa') {
      setTrackingOrder(fullOrder);
    }
  };

  // Order status advancement
  const handleAdvanceOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        let percent = 20;
        if (nextStatus === 'merchant_accepted') percent = 35;
        if (nextStatus === 'courier_assigned') percent = 50;
        if (nextStatus === 'picked_up') percent = 65;
        if (nextStatus === 'on_delivery') percent = 80;
        if (nextStatus === 'delivered' || nextStatus === 'completed') percent = 100;
        
        return {
          ...o,
          status: nextStatus,
          progressPercent: percent,
          courierId: o.courierId || courier.id,
          courierName: o.courierName || courier.name,
          courierPhone: o.courierPhone || courier.phone,
          courierVehicle: o.courierVehicle || courier.vehicle,
          courierPhoto: o.courierPhoto || courier.photo
        };
      }
      return o;
    }));

    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  // Courier Actions
  const handleCourierAcceptOrder = (orderId: string) => {
    handleAdvanceOrderStatus(orderId, 'merchant_accepted');
    setCourier(prev => ({
      ...prev,
      earningsToday: prev.earningsToday + 12000,
      completedOrdersToday: prev.completedOrdersToday + 1,
      walletBalance: prev.walletBalance + 12000
    }));
  };

  const handleCourierRejectOrder = (_orderId: string) => {
    // Rejected order auto shifts to next courier in auto dispatch system
  };

  // Open Service Modals from 10 Main Menus
  const handleOpenService = (service: ServiceType | 'bills' | 'pulsa' | 'event' | 'jastip') => {
    if (service === 'food') {
      setSelectedMerchantForDetail(merchants[0]);
    } else if (service === 'grocery') {
      const groceryStore = merchants.find(m => m.serviceType === 'grocery') || merchants[6];
      setSelectedMerchantForDetail(groceryStore);
    } else if (service === 'pharmacy') {
      const pharmacy = merchants.find(m => m.serviceType === 'pharmacy') || merchants[9];
      setSelectedMerchantForDetail(pharmacy);
    } else if (service === 'delivery') {
      setShowPackageDelivery(true);
    } else if (service === 'bills') {
      setBillsPpobInitialTab('bills');
      setShowBillsPpob(true);
    } else if (service === 'pulsa') {
      setBillsPpobInitialTab('pulsa');
      setShowBillsPpob(true);
    } else if (service === 'ppob') {
      setBillsPpobInitialTab('bills');
      setShowBillsPpob(true);
    } else if (service === 'event') {
      setEventJastipInitialType('event');
      setShowEventJastip(true);
    } else if (service === 'jastip') {
      setEventJastipInitialType('jastip');
      setShowEventJastip(true);
    } else if (service === 'umkm') {
      const umkmStore = merchants.find(m => m.serviceType === 'umkm') || merchants[10];
      setSelectedMerchantForDetail(umkmStore);
    }
  };

  // Merchant Actions
  const handleToggleStoreOpen = (merchantId: string, isOpen: boolean) => {
    setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, isOpen } : m));
  };

  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const fullProd: Product = {
      ...newProd,
      id: `prod_${Date.now()}`
    };
    setProducts(prev => [fullProd, ...prev]);
  };

  const handleToggleProductStock = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock: !p.inStock } : p));
  };

  // If user is on Splash screen, render full-screen splash without any frame
  if (showSplash) {
    return (
      <div className="w-full min-h-screen bg-slate-950 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <SplashScreen 
          onStart={() => setShowSplash(false)}
          onOpenAuth={handleOpenAuth}
        />
        <AuthModal
          isOpen={showAuthModal}
          initialTab={authInitialTab}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setCurrentRole(user.role);
            setShowSplash(false);
          }}
        />
      </div>
    );
  }

  // MAIN RESPONSIVE WEB & MOBILE APPLICATION LAYOUT (NO ARTIFICIAL PHONE FRAME)
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* TOP UNIFIED RESPONSIVE APP HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (currentRole === 'customer') {
                  setActiveCustomerTab('home');
                } else {
                  handleSwitchRole('customer');
                }
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-0.5 shadow-sm flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <DriverLogo size="sm" showBadge={false} className="scale-90" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-[9px] font-black tracking-[0.2em] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                    MITRA
                  </span>
                </div>
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors uppercase leading-tight mt-0.5">
                  ARJAWINANGUN <span className="text-emerald-600">DELIVERY</span>
                </span>
              </div>
            </button>

            {/* Location indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Arjawinangun & Cirebon Timur</span>
            </div>
          </div>

          {/* Desktop Navigation Links for Customer */}
          {currentRole === 'customer' && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
              <button
                onClick={() => setActiveCustomerTab('home')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCustomerTab === 'home'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => setActiveCustomerTab('orders')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold relative transition-all cursor-pointer ${
                  activeCustomerTab === 'orders'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Pesanan</span>
                {activeOrder && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
                )}
              </button>
              <button
                onClick={() => setActiveCustomerTab('chat')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCustomerTab === 'chat'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setShowWalletModal(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCustomerTab === 'wallet'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                MitraPay
              </button>
              <button
                onClick={() => setActiveCustomerTab('profile')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCustomerTab === 'profile'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Profil
              </button>
            </nav>
          )}

          {/* Right Action Tools: MitraPay Badge, Role Selector & Admin Portal */}
          <div className="flex items-center gap-2">
            
            {/* Quick MitraPay Wallet balance badge */}
            <button
              onClick={() => setShowWalletModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                M
              </div>
              <span className="hidden sm:inline text-slate-600 font-semibold text-[11px]">MitraPay:</span>
              <span className="text-emerald-800 font-black">Rp {currentUser.walletBalance.toLocaleString('id-ID')}</span>
            </button>

            {/* Dedicated Admin Portal button (Top Header) */}
            <button
              onClick={() => {
                if (currentRole === 'admin') {
                  handleSwitchRole('customer');
                } else {
                  handleOpenAuth('admin');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                currentRole === 'admin'
                  ? 'bg-slate-950 text-emerald-400 border border-emerald-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">
                {currentRole === 'admin' ? 'Keluar Admin' : 'Khusus Admin'}
              </span>
            </button>

            {/* Role & Account Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-2xs transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="capitalize">{currentRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.phone}</p>
                  </div>

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Ganti Peran Akses
                  </p>

                  <button
                    onClick={() => handleSwitchRole('customer')}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-semibold transition-colors cursor-pointer ${
                      currentRole === 'customer' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>Mode Customer / Pelanggan</span>
                  </button>

                  <button
                    onClick={() => handleSwitchRole('merchant')}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-semibold transition-colors cursor-pointer ${
                      currentRole === 'merchant' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>Dashboard Mitra Toko</span>
                  </button>

                  <button
                    onClick={() => handleSwitchRole('courier')}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-semibold transition-colors cursor-pointer ${
                      currentRole === 'courier' ? 'bg-blue-50 text-blue-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-blue-600" />
                    <span>Dashboard Mitra Driver</span>
                  </button>

                  <button
                    onClick={() => handleSwitchRole('admin')}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-semibold transition-colors cursor-pointer ${
                      currentRole === 'admin' ? 'bg-slate-900 text-emerald-300 font-bold' : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-emerald-500" />
                    <span>Super Admin Platform</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => setShowSplash(true)}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Kembali ke Halaman Masuk</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* DYNAMIC RESPONSIVE CONTENT AREA */}
      <main className="flex-1 w-full flex flex-col">
        
        {/* CUSTOMER VIEW: Clean responsive mobile/web container */}
        {currentRole === 'customer' && (
          <div className="w-full max-w-2xl mx-auto bg-white min-h-[calc(100vh-64px)] shadow-xs border-x border-slate-200/60 p-4 relative pb-24 md:pb-12">
            
            {activeCustomerTab === 'home' && (
              <HomeScreen
                currentUser={currentUser}
                merchants={merchants}
                products={products}
                banners={banners}
                activeOrder={activeOrder}
                onSelectMerchant={(m) => setSelectedMerchantForDetail(m)}
                onOpenService={handleOpenService}
                onOpenOrderTracking={(ord) => setTrackingOrder(ord)}
                onOpenWallet={() => setShowWalletModal(true)}
              />
            )}

            {activeCustomerTab === 'orders' && (
              <OrdersHistoryView
                orders={orders}
                onTrackOrder={(ord) => setTrackingOrder(ord)}
                onOpenChat={(ordId) => setActiveChatOrderId(ordId)}
              />
            )}

            {activeCustomerTab === 'chat' && (
              <div className="py-2">
                <ChatModal
                  order={activeOrder || orders[0]}
                  currentUser={currentUser}
                  isOpen={true}
                  onClose={() => setActiveCustomerTab('home')}
                />
              </div>
            )}

            {activeCustomerTab === 'wallet' && (
              <div className="py-1">
                <WalletModal
                  currentUser={currentUser}
                  isOpen={true}
                  onClose={() => setActiveCustomerTab('home')}
                  onUpdateBalance={(bal, pts) => setCurrentUser(u => ({ ...u, walletBalance: bal, points: pts }))}
                />
              </div>
            )}

            {activeCustomerTab === 'profile' && (
              <CustomerProfileView
                currentUser={currentUser}
                onOpenWallet={() => setShowWalletModal(true)}
                onOpenAuth={handleOpenAuth}
                onSwitchRole={handleSwitchRole}
              />
            )}

            {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
            <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around z-30 shadow-lg">
              <button
                onClick={() => setActiveCustomerTab('home')}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCustomerTab === 'home' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Beranda</span>
              </button>

              <button
                onClick={() => setActiveCustomerTab('orders')}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative transition-colors cursor-pointer ${
                  activeCustomerTab === 'orders' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Pesanan</span>
                {activeOrder && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-0 right-2" />
                )}
              </button>

              <button
                onClick={() => setActiveCustomerTab('chat')}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative transition-colors cursor-pointer ${
                  activeCustomerTab === 'chat' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-0 right-2" />
              </button>

              <button
                onClick={() => setShowWalletModal(true)}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCustomerTab === 'wallet' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>MitraPay</span>
              </button>

              <button
                onClick={() => setActiveCustomerTab('profile')}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCustomerTab === 'profile' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
            </nav>

          </div>
        )}

        {/* MERCHANT VIEW: Responsive Wide Dashboard */}
        {currentRole === 'merchant' && (
          <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
            <MerchantDashboard
              currentUser={currentUser}
              merchants={merchants}
              products={products}
              orders={orders}
              onToggleStoreOpen={handleToggleStoreOpen}
              onAddProduct={handleAddProduct}
              onToggleStock={handleToggleProductStock}
              onUpdateOrderStatus={handleAdvanceOrderStatus}
              onBackToCustomer={() => handleSwitchRole('customer')}
              onWithdraw={(amt) => {
                setCurrentUser(u => ({ ...u, walletBalance: Math.max(0, u.walletBalance - amt) }));
              }}
              onUpgradeMembership={(mId) => {
                setMerchants(prev => prev.map(m => m.id === mId ? { ...m, isPremiumMember: true } : m));
              }}
            />
          </div>
        )}

        {/* COURIER VIEW: Responsive Wide Dashboard */}
        {currentRole === 'courier' && (
          <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
            <CourierDashboard
              courier={courier}
              activeOrders={orders}
              onToggleOnline={(isOnline) => setCourier(c => ({ ...c, isOnline }))}
              onAcceptOrder={handleCourierAcceptOrder}
              onRejectOrder={handleCourierRejectOrder}
              onAdvanceOrderStatus={handleAdvanceOrderStatus}
              onOpenChat={(ordId) => setActiveChatOrderId(ordId)}
              onBackToCustomer={() => handleSwitchRole('customer')}
              onUpgradeCourierPremium={() => {
                setCourier(c => ({ ...c, isPremiumMember: true, level: 'Platinum' }));
              }}
            />
          </div>
        )}

        {/* ADMIN VIEW: Full Executive Wide Dashboard */}
        {currentRole === 'admin' && (
          <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
            <AdminDashboard
              stats={adminStats}
              fraudAlerts={fraudAlerts}
              merchants={merchants}
              couriers={INITIAL_COURIERS}
              orders={orders}
              banners={banners}
              onExitAdmin={() => handleSwitchRole('customer')}
              onReviewFraud={(alertId, action) => {
                setFraudAlerts(prev => prev.map(f => f.id === alertId ? { ...f, status: action } : f));
              }}
              onUpdateCommissionRate={(_rate) => {
                // commission updated
              }}
            />
          </div>
        )}

      </main>

      {/* APPLICATION MODALS */}

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={showAuthModal}
        initialTab={authInitialTab}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentRole(user.role);
          setShowSplash(false);
        }}
      />

      {/* Store Detail Modal */}
      {selectedMerchantForDetail && (
        <StoreDetailModal
          merchant={selectedMerchantForDetail}
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setShowCartCheckout(true)}
          onClose={() => setSelectedMerchantForDetail(null)}
        />
      )}

      {/* Package Delivery Modal ("Kirim Barang") */}
      <PackageDeliveryModal
        currentUser={currentUser}
        isOpen={showPackageDelivery}
        onClose={() => setShowPackageDelivery(false)}
        onSubmitDelivery={handlePlaceOrder}
      />

      {/* Bills & Pulsa PPOB Modal */}
      <BillsAndPpobModal
        currentUser={currentUser}
        initialTab={billsPpobInitialTab}
        isOpen={showBillsPpob}
        onClose={() => setShowBillsPpob(false)}
        onSuccessTransaction={handlePlaceOrder}
      />

      {/* Event Tickets & Jastip Modal */}
      <EventAndJastipModal
        currentUser={currentUser}
        initialType={eventJastipInitialType}
        isOpen={showEventJastip}
        onClose={() => setShowEventJastip(false)}
        onBookSuccess={handlePlaceOrder}
      />

      {/* Cart & Checkout Modal */}
      <CartCheckoutModal
        cart={cart}
        merchant={selectedMerchantForDetail || merchants[0]}
        currentUser={currentUser}
        isOpen={showCartCheckout}
        onClose={() => setShowCartCheckout(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCart([])}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Real-time Order Tracking Modal with GPS */}
      {trackingOrder && (
        <OrderTrackingModal
          order={trackingOrder}
          isOpen={true}
          onClose={() => setTrackingOrder(null)}
          onOpenChat={(ordId) => setActiveChatOrderId(ordId)}
          onAdvanceStatus={handleAdvanceOrderStatus}
        />
      )}

      {/* Real-time Chat Modal */}
      {activeChatOrderId && (
        <ChatModal
          order={orders.find(o => o.id === activeChatOrderId) || orders[0]}
          currentUser={currentUser}
          isOpen={true}
          onClose={() => setActiveChatOrderId(null)}
        />
      )}

      {/* MitraPay Wallet Modal */}
      <WalletModal
        currentUser={currentUser}
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onUpdateBalance={(bal, pts) => setCurrentUser(u => ({ ...u, walletBalance: bal, points: pts }))}
      />

    </div>
  );
}
