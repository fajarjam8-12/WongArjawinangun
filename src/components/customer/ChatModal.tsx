import React, { useState } from 'react';
import { ChatMessage, Order, UserProfile } from '../../types';
import { 
  X, 
  Send, 
  Bike, 
  Store, 
  User, 
  Clock, 
  CheckCheck, 
  Sparkles,
  Phone
} from 'lucide-react';

interface ChatModalProps {
  order: Order;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  order,
  currentUser,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      orderId: order.id,
      senderRole: 'system',
      senderName: 'Sistem MitraArja',
      text: 'Pesanan telah terkonfirmasi. Chat ini aktif selama proses pengantaran hingga 24 jam setelah pesanan selesai.',
      timestamp: '08:35',
      isRead: true
    },
    {
      id: 'msg_2',
      orderId: order.id,
      senderRole: 'merchant',
      senderName: order.merchantName || 'Warung Barokah',
      text: 'Halo kak, pesanan sedang kami racik dan goreng hangat ya. Ditunggu kurir sebentar.',
      timestamp: '08:37',
      isRead: true
    },
    {
      id: 'msg_3',
      orderId: order.id,
      senderRole: 'courier',
      senderName: order.courierName || 'Kang Asep (Kurir)',
      text: 'Siap kak, saya sudah di warung ambil pesanan. Langsung otw ke Griya Permata Arjawinangun ya!',
      timestamp: '08:42',
      isRead: true
    }
  ]);

  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickReplies = [
    'Sudah otw kak?',
    'Sambal koreknya dipisah ya mas',
    'Titip di pos satpam depan kalau tidak ada orang',
    'Saya tunggu di depan pagar'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      orderId: order.id,
      senderRole: currentUser.role,
      senderName: currentUser.name,
      text: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate instant auto-reply from Courier or Merchant if sent by Customer
    if (currentUser.role === 'customer') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `msg_reply_${Date.now()}`,
          orderId: order.id,
          senderRole: 'courier',
          senderName: order.courierName || 'Kang Asep (Kurir)',
          text: 'Siap laksanakan kak! Ini sedang di jalan dekat Stasiun Arjawinangun, estimasi 5 menit lagi sampai.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          isRead: true
        };
        setMessages(prev => [...prev, reply]);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bike className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-emerald-900" />
            </div>
            <div>
              <h3 className="text-sm font-bold truncate">Chat Pesanan #{order.orderNumber.slice(-6)}</h3>
              <p className="text-[11px] text-emerald-100 flex items-center gap-2">
                <span>{order.courierName || 'Kang Asep'}</span>
                <span>•</span>
                <span>{order.merchantName || 'Merchant'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 24-Hour Notice Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 text-[11px] text-emerald-900 flex items-center justify-between">
          <span className="flex items-center gap-1 font-semibold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Chat aktif hingga 24 jam setelah pesanan selesai
          </span>
          <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded-md font-bold text-emerald-800">
            Realtime
          </span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((msg) => {
            const isMe = msg.senderRole === currentUser.role;
            const isSystem = msg.senderRole === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="text-[11px] bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium inline-block max-w-[85%]">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div 
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender badge */}
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 mb-1 px-1">
                  {msg.senderRole === 'merchant' && (
                    <span className="text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Store className="w-2.5 h-2.5" /> Toko
                    </span>
                  )}
                  {msg.senderRole === 'courier' && (
                    <span className="text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Bike className="w-2.5 h-2.5" /> Kurir
                    </span>
                  )}
                  {msg.senderRole === 'customer' && (
                    <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <User className="w-2.5 h-2.5" /> Pembeli
                    </span>
                  )}
                  <span>{msg.senderName}</span>
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-xs ${
                  isMe 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : (msg.senderRole === 'courier' ? 'bg-blue-600 text-white rounded-tl-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none')
                }`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick replies */}
        <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply)}
              className="py-1 px-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 text-[11px] font-medium rounded-full whitespace-nowrap transition-colors border border-slate-200"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan ke kurir atau toko..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md transition-colors shrink-0"
            aria-label="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
