import React, { useState } from 'react';
import { UserProfile, WalletTransaction } from '../../types';
import { WITHDRAWAL_FEE, REFERRAL_BONUS_POINTS } from '../../utils/pricing';
import { 
  X, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  Sparkles, 
  Gift, 
  Copy, 
  CheckCircle2, 
  Share2, 
  CreditCard,
  Plus
} from 'lucide-react';

interface WalletModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateBalance: (newBalance: number, newPoints: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onUpdateBalance
}) => {
  const [activeTab, setActiveTab] = useState<'balance' | 'topup' | 'withdraw' | 'transfer' | 'points' | 'referral'>('balance');
  
  // Topup
  const [topupAmount, setTopupAmount] = useState<number>(50000);
  
  // Withdraw
  const [withdrawAmount, setWithdrawAmount] = useState<number>(50000);
  const [bankAccount, setBankAccount] = useState('BCA - 8122334455 (Diva Ageng Nugraha)');

  // Transfer
  const [transferTargetPhone, setTransferTargetPhone] = useState('085712348899');
  const [transferAmount, setTransferAmount] = useState<number>(25000);

  // Copied state
  const [copied, setCopied] = useState(false);

  // Transactions list
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 'tx_1',
      type: 'payment',
      title: 'Pembayaran Pesanan Mas Gondrong',
      amount: -65300,
      status: 'success',
      date: 'Hari ini, 08:35'
    },
    {
      id: 'tx_2',
      type: 'cashback',
      title: 'Cashback Promo Arjawinangun Mantap',
      amount: 5000,
      status: 'success',
      date: 'Hari ini, 08:36'
    },
    {
      id: 'tx_3',
      type: 'topup',
      title: 'Top Up MitraPay via QRIS',
      amount: 100000,
      status: 'success',
      date: 'Kemarin, 19:20'
    }
  ]);

  if (!isOpen) return null;

  const handleTopup = () => {
    const newBal = currentUser.walletBalance + topupAmount;
    onUpdateBalance(newBal, currentUser.points);
    setTransactions(prev => [
      {
        id: `tx_${Date.now()}`,
        type: 'topup',
        title: `Top Up MitraPay Instan`,
        amount: topupAmount,
        status: 'success',
        date: 'Baru saja'
      },
      ...prev
    ]);
    alert(`Top-up sebesar Rp ${topupAmount.toLocaleString('id-ID')} berhasil ditambahkan ke saldo MitraPay!`);
    setActiveTab('balance');
  };

  const handleWithdraw = () => {
    const totalDeducted = withdrawAmount + WITHDRAWAL_FEE;
    if (currentUser.walletBalance < totalDeducted) {
      alert(`Saldo tidak mencukupi untuk penarikan + biaya penarikan Rp ${WITHDRAWAL_FEE.toLocaleString('id-ID')}.`);
      return;
    }
    const newBal = currentUser.walletBalance - totalDeducted;
    onUpdateBalance(newBal, currentUser.points);
    setTransactions(prev => [
      {
        id: `tx_${Date.now()}`,
        type: 'withdrawal',
        title: `Tarik Dana ke ${bankAccount}`,
        amount: -withdrawAmount,
        fee: WITHDRAWAL_FEE,
        status: 'success',
        date: 'Baru saja'
      },
      ...prev
    ]);
    alert(`Penarikan dana Rp ${withdrawAmount.toLocaleString('id-ID')} sedang diproses ke rekening Anda. Biaya admin: Rp ${WITHDRAWAL_FEE.toLocaleString('id-ID')}.`);
    setActiveTab('balance');
  };

  const handleTransfer = () => {
    if (currentUser.walletBalance < transferAmount) {
      alert('Saldo tidak mencukupi untuk transfer.');
      return;
    }
    const newBal = currentUser.walletBalance - transferAmount;
    onUpdateBalance(newBal, currentUser.points);
    setTransactions(prev => [
      {
        id: `tx_${Date.now()}`,
        type: 'transfer',
        title: `Transfer ke ${transferTargetPhone}`,
        amount: -transferAmount,
        status: 'success',
        date: 'Baru saja'
      },
      ...prev
    ]);
    alert(`Transfer dana Rp ${transferAmount.toLocaleString('id-ID')} ke ${transferTargetPhone} sukses!`);
    setActiveTab('balance');
  };

  const handleRedeemPoints = (pointsCost: number, voucherName: string) => {
    if (currentUser.points < pointsCost) {
      alert('Poin Mitra Anda belum mencukupi.');
      return;
    }
    const newPoints = currentUser.points - pointsCost;
    onUpdateBalance(currentUser.walletBalance, newPoints);
    alert(`Selamat! Anda berhasil menukar ${pointsCost} Mitra Point dengan voucher: ${voucherName}.`);
  };

  const handleCopyReferral = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header with MitraPay Card style */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-5 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup MitraPay"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-400 text-emerald-950 flex items-center justify-center font-black text-sm">
              M
            </div>
            <span className="font-extrabold text-sm tracking-wide">MitraPay</span>
            <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              Dompet Digital Arjawinangun
            </span>
          </div>

          <div className="mt-2">
            <p className="text-xs text-emerald-200">Saldo Tersedia</p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
              Rp {currentUser.walletBalance.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Mitra Point and Reward */}
          <div className="mt-3 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>{currentUser.points} Mitra Point</span>
            </div>
            <span className="text-[10px] text-emerald-200">
              Rp 10.000 = 1 Poin
            </span>
          </div>
        </div>

        {/* Action quick buttons */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('topup')}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 border transition-all ${
              activeTab === 'topup' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-[11px]">Top Up</span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 border transition-all ${
              activeTab === 'withdraw' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-[11px]">Tarik Dana</span>
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 border transition-all ${
              activeTab === 'transfer' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <Send className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-[11px]">Transfer</span>
          </button>
          <button
            onClick={() => setActiveTab('referral')}
            className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 border transition-all ${
              activeTab === 'referral' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-[11px]">Ajak Teman</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === 'balance' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs">Riwayat Transaksi Terakhir</h4>
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div 
                    key={tx.id}
                    className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{tx.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {tx.amount > 0 ? `+Rp ${tx.amount.toLocaleString('id-ID')}` : `-Rp ${Math.abs(tx.amount).toLocaleString('id-ID')}`}
                      </p>
                      {tx.fee && (
                        <p className="text-[10px] text-rose-500">Biaya: Rp {tx.fee.toLocaleString('id-ID')}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'topup' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Isi Saldo MitraPay</h4>
              <div className="grid grid-cols-2 gap-2">
                {[20000, 50000, 100000, 250000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setTopupAmount(amount)}
                    className={`p-3 rounded-2xl border font-bold text-center transition-all ${
                      topupAmount === amount 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Rp {amount.toLocaleString('id-ID')}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] space-y-1">
                <p className="font-bold text-slate-800">Metode Pengisian:</p>
                <p className="text-slate-600">• QRIS Nasional (Semua Bank & E-Wallet)</p>
                <p className="text-slate-600">• Virtual Account BCA, BRI, Mandiri</p>
                <p className="text-slate-600">• Kasir Indomaret/Alfamart Arjawinangun</p>
              </div>

              <button
                type="button"
                onClick={handleTopup}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Konfirmasi Top Up Rp {topupAmount.toLocaleString('id-ID')}
              </button>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-[11px] text-blue-900 space-y-0.5">
                <p className="font-bold">Ketentuan Tarik Dana (Cashout):</p>
                <p>• Biaya penarikan: <strong>Rp {WITHDRAWAL_FEE.toLocaleString('id-ID')}</strong> per transaksi</p>
                <p>• Diproses otomatis ke rekening bank terdaftar dalam hitungan detik</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rekening Tujuan</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nominal Penarikan</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[50000, 100000, 200000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setWithdrawAmount(amt)}
                      className={`p-2 rounded-xl border text-center font-bold ${
                        withdrawAmount === amt ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200'
                      }`}
                    >
                      Rp {amt.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Nominal Tarik</span>
                  <span className="font-bold text-slate-800">Rp {withdrawAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Admin</span>
                  <span className="font-bold text-slate-800">Rp {WITHDRAWAL_FEE.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-slate-200 pt-1 flex justify-between font-black text-slate-900">
                  <span>Total Pemotongan Saldo</span>
                  <span className="text-rose-600">Rp {(withdrawAmount + WITHDRAWAL_FEE).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWithdraw}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Tarik Dana Sekarang
              </button>
            </div>
          )}

          {activeTab === 'transfer' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Transfer Sesama MitraPay (Gratis Biaya)</h4>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor Handphone Penerima</label>
                <input
                  type="tel"
                  value={transferTargetPhone}
                  onChange={(e) => setTransferTargetPhone(e.target.value)}
                  placeholder="0812xxxx"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jumlah Transfer</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <button
                type="button"
                onClick={handleTransfer}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Kirim Saldo Rp {transferAmount.toLocaleString('id-ID')}
              </button>
            </div>
          )}

          {activeTab === 'referral' && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900">Program Ajak Teman MitraArja</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Customer A mengundang Customer B. Dapatkan hadiah bonus <strong>{REFERRAL_BONUS_POINTS} Mitra Point</strong> setelah teman menyelesaikan order pertamanya!
                </p>
              </div>

              {/* Referral code card */}
              <div className="p-4 bg-amber-50/80 border-2 border-dashed border-amber-300 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-amber-800 uppercase font-bold tracking-wider">Kode Referral Kamu</p>
                  <p className="text-xl font-mono font-black text-amber-950 mt-0.5">{currentUser.referralCode}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-xs flex items-center gap-1 font-bold text-xs"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <div className="text-left p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Cara Kerja:</p>
                <p>1. Bagikan kode unik referral Anda ke tetangga dan rekan di Cirebon</p>
                <p>2. Teman mendaftar & melakukan transaksi perdana</p>
                <p>3. Bonus 100 poin otomatis masuk ke saldo Mitra Point Anda</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
