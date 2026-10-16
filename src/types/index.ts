export type UserRole = 'customer' | 'merchant' | 'courier' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'pending';
  points: number;
  walletBalance: number;
  referralCode: string;
  referredBy?: string;
  address: string;
  district: string;
  createdAt: string;
}

export type ServiceType = 
  | 'food' 
  | 'grocery' 
  | 'pharmacy' 
  | 'delivery' 
  | 'bills' 
  | 'pulsa' 
  | 'ppob' 
  | 'event' 
  | 'jastip' 
  | 'umkm';

export interface Merchant {
  id: string;
  name: string;
  category: string;
  serviceType: 'food' | 'grocery' | 'pharmacy' | 'umkm';
  rating: number;
  totalOrders: number;
  address: string;
  district: string;
  distanceKm: number;
  isOpen: boolean;
  isFeatured: boolean;
  isPremiumMember: boolean;
  banner: string;
  logo: string;
  openHours: string;
  minOrder: number;
  phone: string;
  activePromo?: string;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  inStock: boolean;
  isHardMedicine?: boolean; // Requires prescription
  promoBadge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'merchant_accepted'
  | 'courier_assigned'
  | 'picked_up'
  | 'on_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'qris' | 'bank_transfer' | 'mitrapay';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId?: string;
  merchantName?: string;
  courierId?: string;
  courierName?: string;
  courierPhone?: string;
  courierVehicle?: string;
  courierPhoto?: string;
  serviceType: ServiceType;
  items: CartItem[];
  pickupAddress: string;
  destinationAddress: string;
  distanceKm: number;
  weightKg?: number;
  deliveryNotes?: string;
  prescriptionPhoto?: string;
  isPrescriptionVerified?: boolean;
  itemDescription?: string;
  itemPhoto?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  total: number;
  courierEarned: number;
  merchantEarned: number;
  platformCommission: number;
  createdAt: string;
  estimatedMinutes: number;
  progressPercent: number;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderRole: UserRole | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export type CourierLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface CourierProfile {
  id: string;
  name: string;
  phone: string;
  photo: string;
  vehicle: string;
  licensePlate: string;
  rating: number;
  level: CourierLevel;
  isOnline: boolean;
  isPremiumMember: boolean;
  earningsToday: number;
  completedOrdersToday: number;
  walletBalance: number;
  currentDispatchOrder?: Order | null;
  dispatchTimeLeft?: number;
}

export interface WalletTransaction {
  id: string;
  type: 'topup' | 'payment' | 'earning' | 'withdrawal' | 'cashback' | 'transfer';
  title: string;
  amount: number;
  fee?: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  reference?: string;
}

export interface BannerAd {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge: string;
  actionUrl: string;
  type: 'homepage' | 'top_search' | 'recommendation';
  pricePaid: number;
  activeUntil: string;
}

export interface FraudAlert {
  id: string;
  type: 'fake_order' | 'multi_account' | 'voucher_abuse' | 'suspicious_distance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  targetUser: string;
  timestamp: string;
  status: 'flagged' | 'reviewed' | 'banned';
}

export interface AdminStats {
  gmv: number;
  platformRevenue: number;
  netProfit: number;
  totalUsers: number;
  totalMerchants: number;
  totalCouriers: number;
  totalOrders: number;
  activeOrdersCount: number;
}
