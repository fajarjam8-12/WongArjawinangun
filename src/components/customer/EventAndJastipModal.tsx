import React, { useState } from 'react';
import { UserProfile, Order } from '../../types';
import { 
  X, 
  Ticket, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface EventAndJastipModalProps {
  currentUser: UserProfile;
  initialType?: 'event' | 'jastip';
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (orderData: Partial<Order>) => void;
}

export const EventAndJastipModal: React.FC<EventAndJastipModalProps> = ({
  currentUser,
  initialType = 'event',
  isOpen,
  onClose,
  onBookSuccess
}) => {
  const [tab, setTab] = useState<'event' | 'jastip'>(initialType);
  
  // Jastip custom request state
  const [jastipLocation, setJastipLocation] = useState('Pasar Sandang Tegalgubug Blok Sentral');
  const [jastipItem, setJastipItem] = useState('Baju Daster Batik Cap & Celana Kulot Katun 3 Pcs');
  const [jastipBudget, setJastipBudget] = useState<number>(150000);
  const [jastipFee, setJastipFee] = useState<number>(20000);

  if (!isOpen) return null;

  const events = [
    {
      id: 'ev_1',
      title: 'Festival Batik & Kuliner Cirebon 2026',
      date: '25-27 Oktober 2026',
      location: 'Alun-Alun & Stadion Mini Arjawinangun',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
      badge: 'Event Akbar'
    },
    {
      id: 'ev_2',
      title: 'Arjawinangun Hyperlocal UMKM Expo',
      date: '10 November 2026',
      location: 'Gedung Serbaguna Jungjang',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80',
      badge: 'Workshop & Bazar'
    }
  ];

  const handleBookTicket = (ev: typeof events[0]) => {
    const orderData: Partial<Order> = {
      orderNumber: `ARJA-TIKET-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      serviceType: 'event',
      pickupAddress: ev.location,
      destinationAddress: 'E-Ticket dikirim via WhatsApp & Aplikasi',
      distanceKm: 0,
      subtotal: ev.price,
      deliveryFee: 0,
      platformFee: 2000,
      discount: 0,
      total: ev.price + 2000,
      status: 'completed',
      paymentMethod: 'mitrapay',
      paymentStatus: 'paid',
      courierEarned: 0,
      merchantEarned: ev.price,
      platformCommission: 2000,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 0,
      progressPercent: 100
    };
    onBookSuccess(orderData);
    alert(`E-Ticket "${ev.title}" berhasil dipesan! Barcode tiket tersimpan di menu Pesanan.`);
    onClose();
  };

  const handleRequestJastip = () => {
    const total = jastipBudget + jastipFee + 1500;
    const orderData: Partial<Order> = {
      orderNumber: `ARJA-JASTIP-${Date.now().toString().slice(-6)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      serviceType: 'jastip',
      pickupAddress: jastipLocation,
      destinationAddress: currentUser.address,
      distanceKm: 3.8,
      itemDescription: jastipItem,
      subtotal: jastipBudget,
      deliveryFee: jastipFee,
      platformFee: 1500,
      discount: 0,
      total: total,
      status: 'pending',
      paymentMethod: 'mitrapay',
      paymentStatus: 'paid',
      courierEarned: Math.round(jastipFee * 0.9),
      merchantEarned: jastipBudget,
      platformCommission: Math.round(jastipFee * 0.1) + 1500,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 45,
      progressPercent: 10
    };
    onBookSuccess(orderData);
    alert(`Permintaan Jastip "${jastipItem}" telah diteruskan ke kurir mitra Arjawinangun!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold">Tiket Event & Jasa Titip</h3>
            <p className="text-xs text-emerald-100">Layanan Khusus Warga Arjawinangun & Sekitarnya</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup event"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4">
          <button
            onClick={() => setTab('event')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === 'event' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500'
            }`}
          >
            <Ticket className="w-4 h-4 text-emerald-600" />
            Tiket Event Lokal
          </button>
          <button
            onClick={() => setTab('jastip')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === 'jastip' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            Jasa Titip (Jastip)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {tab === 'event' ? (
            <div className="space-y-3">
              {events.map((ev) => (
                <div 
                  key={ev.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-emerald-300 transition-all"
                >
                  <div className="relative h-32 w-full bg-slate-900">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover opacity-85" />
                    <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {ev.badge}
                    </span>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                    <div className="flex flex-col gap-1 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {ev.location}
                      </span>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                      <span className="text-base font-black text-emerald-700">
                        Rp {ev.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        onClick={() => handleBookTicket(ev)}
                        className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        Beli E-Tiket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-[11px]">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Jastip Pasar Tegalgubug & Kuliner Pesisir
                </p>
                <p className="text-amber-800 mt-0.5">
                  Kurir MitraArja siap belanja dan antarkan titipan kain batik, busana grosir dari Pasar Tegalgubug atau jajanan oleh-oleh langsung ke rumah Anda.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lokasi Tempat Belanja (Titip)</label>
                <input
                  type="text"
                  value={jastipLocation}
                  onChange={(e) => setJastipLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rincian Barang yang Dititip</label>
                <textarea
                  rows={3}
                  value={jastipItem}
                  onChange={(e) => setJastipItem(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimasi Budget Barang</label>
                  <input
                    type="number"
                    value={jastipBudget}
                    onChange={(e) => setJastipBudget(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jasa Kurir Jastip</label>
                  <input
                    type="number"
                    value={jastipFee}
                    onChange={(e) => setJastipFee(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRequestJastip}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pesan Jastip Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
