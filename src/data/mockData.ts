import {
  UserProfile,
  Merchant,
  Product,
  CourierProfile,
  BannerAd,
  FraudAlert,
  AdminStats,
  Order
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_cust_1',
    name: 'Diva Ageng Nugraha',
    phone: '081223344556',
    email: 'agengdiva@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'customer',
    status: 'active',
    points: 450,
    walletBalance: 185000,
    referralCode: 'ARJA-WIN-99',
    address: 'Griya Permata Arjawinangun Blok B4 No. 12',
    district: 'Jungjang, Arjawinangun',
    createdAt: '2026-01-10'
  },
  {
    id: 'user_merchant_1',
    name: 'Hj. Eni Rohaeni (Owner RM Barokah)',
    phone: '081399887766',
    email: 'warung.barokah@mitraarja.id',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'merchant',
    status: 'active',
    points: 820,
    walletBalance: 1420000,
    referralCode: 'WARUNG-ENI-01',
    address: 'Jl. Ki Buyut Roda No. 88',
    district: 'Arjawinangun',
    createdAt: '2025-11-20'
  },
  {
    id: 'user_courier_1',
    name: 'Kang Asep Supriatna',
    phone: '085712348899',
    email: 'asep.kurir@mitraarja.id',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'courier',
    status: 'active',
    points: 310,
    walletBalance: 320000,
    referralCode: 'KURIR-ASEP-07',
    address: 'Desa Kebonturi RT 03/RW 02',
    district: 'Kebonturi, Arjawinangun',
    createdAt: '2025-12-01'
  },
  {
    id: 'user_admin_1',
    name: 'Admin Utama MitraArja',
    phone: '082100001111',
    email: 'admin@mitraarja.id',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    status: 'active',
    points: 9999,
    walletBalance: 24890000,
    referralCode: 'FOUNDER-ARJA',
    address: 'Kantor Pusat MitraArja, Ruko Pantura No. 15',
    district: 'Arjawinangun',
    createdAt: '2025-10-01'
  }
];

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Ayam Geprek Sambal Korek Mas Gondrong',
    category: 'Ayam',
    serviceType: 'food',
    rating: 4.8,
    totalOrders: 1840,
    address: 'Jl. Ki Buyut Roda No. 42 (Dekat Stasiun)',
    district: 'Jungjang',
    distanceKm: 1.2,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=200&q=80',
    openHours: '09:00 - 22:00',
    minOrder: 15000,
    phone: '081234567890',
    activePromo: 'Diskon 20% Min Belanja 40rb'
  },
  {
    id: 'm2',
    name: 'Bakso Beranak & Mie Ayam Mas Joko Jungjang',
    category: 'Bakso',
    serviceType: 'food',
    rating: 4.9,
    totalOrders: 3120,
    address: 'Jl. Raya Jungjang No. 17',
    district: 'Jungjang',
    distanceKm: 0.8,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=200&q=80',
    openHours: '10:00 - 21:30',
    minOrder: 12000,
    phone: '081344556677',
    activePromo: 'Gratis Es Teh Manis'
  },
  {
    id: 'm3',
    name: 'Kopi Janji Roda & Toast Arjawinangun',
    category: 'Kopi',
    serviceType: 'food',
    rating: 4.7,
    totalOrders: 980,
    address: 'Komplek Pertokoan Pantura Square No. 5',
    district: 'Arjawinangun',
    distanceKm: 2.1,
    isOpen: true,
    isFeatured: false,
    isPremiumMember: false,
    banner: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80',
    openHours: '08:00 - 23:00',
    minOrder: 10000,
    phone: '085811223344',
    activePromo: 'Beli 2 Kopi Susu Gratis Roti'
  },
  {
    id: 'm4',
    name: 'Seafood Pantura 99 Tegalgubug',
    category: 'Seafood',
    serviceType: 'food',
    rating: 4.6,
    totalOrders: 750,
    address: 'Jl. Raya Pasar Sandang Tegalgubug',
    district: 'Tegalgubug',
    distanceKm: 3.5,
    isOpen: true,
    isFeatured: false,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=200&q=80',
    openHours: '16:00 - 24:00',
    minOrder: 25000,
    phone: '087788990011'
  },
  {
    id: 'm5',
    name: 'Sate Kambing Muda & Gule H. Apud Cab. Arja',
    category: 'Sate',
    serviceType: 'food',
    rating: 4.9,
    totalOrders: 2400,
    address: 'Jl. Raya By Pass Arjawinangun KM 18',
    district: 'Kebonturi',
    distanceKm: 2.8,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=200&q=80',
    openHours: '09:00 - 21:00',
    minOrder: 30000,
    phone: '081299001122',
    activePromo: 'Cashback 5rb MitraPay'
  },
  {
    id: 'm6',
    name: 'Martabak Bangka & Terang Bulan Istimewa',
    category: 'Martabak',
    serviceType: 'food',
    rating: 4.8,
    totalOrders: 1450,
    address: 'Depan Masjid Jami Arjawinangun',
    district: 'Arjawinangun',
    distanceKm: 1.5,
    isOpen: true,
    isFeatured: false,
    isPremiumMember: false,
    banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
    openHours: '16:30 - 23:00',
    minOrder: 20000,
    phone: '085222333444'
  },
  {
    id: 'm7',
    name: 'Toko Sembako Berkah Pasar Arjawinangun',
    category: 'Sembako',
    serviceType: 'grocery',
    rating: 4.9,
    totalOrders: 4200,
    address: 'Pasar Tradisional Arjawinangun Los B No. 14',
    district: 'Jungjang',
    distanceKm: 1.0,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=200&q=80',
    openHours: '06:00 - 18:00',
    minOrder: 20000,
    phone: '081322114455',
    activePromo: 'Beras Pandan Wangi Promo'
  },
  {
    id: 'm8',
    name: 'Sayur & Buah Segar Petani Lokal Kebonturi',
    category: 'Sayur',
    serviceType: 'grocery',
    rating: 4.8,
    totalOrders: 1850,
    address: 'Desa Kebonturi Blok Gardu No. 3',
    district: 'Kebonturi',
    distanceKm: 2.2,
    isOpen: true,
    isFeatured: false,
    isPremiumMember: false,
    banner: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=200&q=80',
    openHours: '05:30 - 14:00',
    minOrder: 15000,
    phone: '081277665544'
  },
  {
    id: 'm9',
    name: 'Depo Frozen Food & Galon Air Arjawinangun',
    category: 'Frozen Food',
    serviceType: 'grocery',
    rating: 4.7,
    totalOrders: 920,
    address: 'Jl. Kalibaru No. 10',
    district: 'Arjawinangun',
    distanceKm: 1.8,
    isOpen: true,
    isFeatured: false,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=200&q=80',
    openHours: '07:00 - 21:00',
    minOrder: 18000,
    phone: '087812349876'
  },
  {
    id: 'm10',
    name: 'Apotek Kimia Mandiri RSUD Arjawinangun',
    category: 'Apotek',
    serviceType: 'pharmacy',
    rating: 4.9,
    totalOrders: 2150,
    address: 'Jl. By Pass Palimanan-Jakarta (Samping RSUD)',
    district: 'Jungjang',
    distanceKm: 1.4,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1586015555751-63c2eed2df76?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=200&q=80',
    openHours: '24 Jam Buka',
    minOrder: 10000,
    phone: '081211223344',
    activePromo: 'Layanan Resep Cepat'
  },
  {
    id: 'm11',
    name: 'Empal Gentong Mang Darma Cabang Arjawinangun',
    category: 'UMKM Lokal',
    serviceType: 'umkm',
    rating: 4.9,
    totalOrders: 2780,
    address: 'Jl. Raya Pantura Depan Polsek Arjawinangun',
    district: 'Arjawinangun',
    distanceKm: 1.7,
    isOpen: true,
    isFeatured: true,
    isPremiumMember: true,
    banner: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    openHours: '08:30 - 21:00',
    minOrder: 22000,
    phone: '081987654321',
    activePromo: 'Khas Cirebon Asli'
  },
  {
    id: 'm12',
    name: 'Warung Nasi Lengko & Tahu Gejrot Mbak Siti',
    category: 'UMKM Lokal',
    serviceType: 'food',
    rating: 4.7,
    totalOrders: 890,
    address: 'Jl. Stasiun Arjawinangun No. 3',
    district: 'Jungjang',
    distanceKm: 0.9,
    isOpen: false, // Closed for testing filter
    isFeatured: false,
    isPremiumMember: false,
    banner: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
    openHours: '06:00 - 13:00 (Tutup)',
    minOrder: 10000,
    phone: '085611224455'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Mas Gondrong (m1)
  {
    id: 'p1',
    merchantId: 'm1',
    name: 'Ayam Geprek Sambal Korek Super Pedas',
    category: 'Ayam',
    price: 18000,
    originalPrice: 22000,
    description: 'Ayam goreng renyah digeprek dengan sambal korek bawang asli rawit merah segar.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Best Seller'
  },
  {
    id: 'p2',
    merchantId: 'm1',
    name: 'Paket Hemat Ayam Geprek + Nasi + Es Teh',
    category: 'Ayam',
    price: 24000,
    originalPrice: 28000,
    description: 'Sudah lengkap nasi putih hangat, lalapan timun kol, dan es teh manis jumbo.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Hemat 4rb'
  },
  {
    id: 'p3',
    merchantId: 'm1',
    name: 'Ayam Bakar Madu Arjawinangun',
    category: 'Ayam',
    price: 20000,
    description: 'Ayam dibakar dengan bumbu madu khas manis gurih meresap sampai tulang.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Bakso Mas Joko (m2)
  {
    id: 'p4',
    merchantId: 'm2',
    name: 'Bakso Beranak Jumbo Jungjang',
    category: 'Bakso',
    price: 25000,
    originalPrice: 30000,
    description: 'Bakso sapi asli ukuran besar berisi bakso kecil, telur puyuh, dan cincang daging sapi gurih.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Favorit'
  },
  {
    id: 'p5',
    merchantId: 'm2',
    name: 'Mie Ayam Bakso Urat Spesial',
    category: 'Mie',
    price: 18000,
    description: 'Mie kenyal gurih dengan topping ayam kecap melimpah plus 2 butir bakso urat renyah.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Kopi Janji Roda (m3)
  {
    id: 'p6',
    merchantId: 'm3',
    name: 'Es Kopi Susu Gula Aren Arjawinangun',
    category: 'Kopi',
    price: 16000,
    description: 'Espresso biji kopi lokal Robusta Cirebon dipadu susu creamy dan gula aren organik.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Top 1'
  },
  {
    id: 'p7',
    merchantId: 'm3',
    name: 'Roti Toast Cokelat Keju Melt',
    category: 'Kopi',
    price: 14000,
    description: 'Roti panggang mentega dengan filling cokelat lumer dan parutan keju cheddar gurih.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Sate H. Apud (m5)
  {
    id: 'p8',
    merchantId: 'm5',
    name: 'Sate Kambing Muda 10 Tusuk',
    category: 'Sate',
    price: 38000,
    description: 'Daging kambing muda empuk tanpa bau prengus, disajikan bumbu kecap cabe rawit tomat.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Legendaris'
  },
  {
    id: 'p9',
    merchantId: 'm5',
    name: 'Gule Kambing Rempah Pesisir',
    category: 'Sate',
    price: 32000,
    description: 'Kuah gule gurih kental berempah khas Cirebon dengan potongan iga kambing empuk.',
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Martabak Istimewa (m6)
  {
    id: 'p10',
    merchantId: 'm6',
    name: 'Martabak Telur Daging Sapi Super',
    category: 'Martabak',
    price: 35000,
    description: 'Kulit martabak renyah dengan isian telur bebek, daun bawang segar dan daging sapi cincang lezat.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },
  {
    id: 'p11',
    merchantId: 'm6',
    name: 'Terang Bulan Cokelat Kacang Wijen',
    category: 'Martabak',
    price: 28000,
    description: 'Adonan manis bersarang tebal lembut dengan margarin wismann, cokelat meses, dan kacang sangrai.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Toko Sembako Berkah (m7)
  {
    id: 'p12',
    merchantId: 'm7',
    name: 'Beras Pandan Wangi Premium 5 KG',
    category: 'Sembako',
    price: 72000,
    originalPrice: 78000,
    description: 'Beras pulen harum alami tanpa pemutih dan tanpa pengawet kualitas super.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Harga Grosir'
  },
  {
    id: 'p13',
    merchantId: 'm7',
    name: 'Minyak Goreng Sawit Pouch 2 Liter',
    category: 'Sembako',
    price: 34000,
    description: 'Minyak goreng jernih 2x penyaringan untuk masakan renyah sempurna.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },
  {
    id: 'p14',
    merchantId: 'm7',
    name: 'Telur Ayam Ras Segar 1 KG',
    category: 'Sembako',
    price: 28000,
    description: 'Telur ayam negeri segar langsung dari peternakan lokal Arjawinangun.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Sayur Segar (m8)
  {
    id: 'p15',
    merchantId: 'm8',
    name: 'Paket Sayur Sop Komplit + Bumbu',
    category: 'Sayur',
    price: 10000,
    description: 'Isi: Wortel, kol, buncis, kentang, daun bawang, seledri dan racik sop.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },
  {
    id: 'p16',
    merchantId: 'm8',
    name: 'Mangga Gedong Gincu Asli Cirebon 1 KG',
    category: 'Buah',
    price: 30000,
    description: 'Manis legit wangi khas buah unggulan Cirebon baru dipetik.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Khas Daerah'
  },

  // Frozen & Galon (m9)
  {
    id: 'p17',
    merchantId: 'm9',
    name: 'Isi Ulang Galon Aqua 19L (Antar Sampai Dapur)',
    category: 'Air Galon',
    price: 21000,
    description: 'Tukar galon kosong dengan galon Aqua resmi segel asli.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },
  {
    id: 'p18',
    merchantId: 'm9',
    name: 'Nugget Ayam Fiesta Crispy 500g',
    category: 'Frozen Food',
    price: 45000,
    description: 'Nugget ayam berlapis bubble crumbs renyah disukai anak-anak.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80',
    inStock: true
  },

  // Apotek Kimia Mandiri (m10)
  {
    id: 'p19',
    merchantId: 'm10',
    name: 'Paracetamol 500mg Strip 10 Kaplet',
    category: 'Obat Bebas',
    price: 8500,
    description: 'Meredakan sakit kepala, sakit gigi, dan menurunkan demam.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    isHardMedicine: false
  },
  {
    id: 'p20',
    merchantId: 'm10',
    name: 'Multivitamin C 500mg + Vitamin D3 & Zinc',
    category: 'Vitamin',
    price: 32000,
    description: 'Menjaga daya tahan tubuh dan imunitas dari cuaca pancaroba.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    isHardMedicine: false,
    promoBadge: 'Imunitas'
  },
  {
    id: 'p21',
    merchantId: 'm10',
    name: 'Amoxicillin 500mg (Antibiotik Keras - Wajib Resep)',
    category: 'Obat Bebas',
    price: 15000,
    description: 'Antibiotik resep dokter. Pembeli WAJIB mengunggah foto resep asli untuk diverifikasi apoteker.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    isHardMedicine: true,
    promoBadge: 'Wajib Resep'
  },
  {
    id: 'p22',
    merchantId: 'm10',
    name: 'Tensimeter Digital Lengan Omron Asli',
    category: 'Alat Kesehatan',
    price: 420000,
    description: 'Alat ukur tekanan darah digital akurat bergaransi resmi.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    isHardMedicine: false
  },

  // Empal Gentong Mang Darma (m11)
  {
    id: 'p23',
    merchantId: 'm11',
    name: 'Empal Gentong Daging Sapi Istimewa',
    category: 'UMKM Lokal',
    price: 30000,
    originalPrice: 35000,
    description: 'Masakan khas Cirebon dimasak dalam gentong tanah liat dengan kayu asam selama berjam-jam.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    promoBadge: 'Kuliner Juara'
  },
  {
    id: 'p24',
    merchantId: 'm11',
    name: 'Empal Asam Segar Cirebonan',
    category: 'UMKM Lokal',
    price: 30000,
    description: 'Kuah bening asam belimbing wuluh segar dengan irisan daging sapi empuk dan babat gurih.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80',
    inStock: true
  }
];

export const INITIAL_COURIERS: CourierProfile[] = [
  {
    id: 'courier_1',
    name: 'Kang Asep Supriatna',
    phone: '085712348899',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    vehicle: 'Honda Vario 160 CBS (Hitam)',
    licensePlate: 'E 4521 AA',
    rating: 4.9,
    level: 'Gold',
    isOnline: true,
    isPremiumMember: true,
    earningsToday: 145000,
    completedOrdersToday: 9,
    walletBalance: 320000
  },
  {
    id: 'courier_2',
    name: 'Mas Dimas Bayu Express',
    phone: '081233994400',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    vehicle: 'Honda Beat Street (Hijau)',
    licensePlate: 'E 3219 BC',
    rating: 4.8,
    level: 'Silver',
    isOnline: true,
    isPremiumMember: false,
    earningsToday: 82000,
    completedOrdersToday: 5,
    walletBalance: 165000
  },
  {
    id: 'courier_3',
    name: 'Pak Budi Rejeki Arja',
    phone: '087800112233',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    vehicle: 'Yamaha NMAX 155 (Merah)',
    licensePlate: 'E 6789 DF',
    rating: 5.0,
    level: 'Platinum',
    isOnline: true,
    isPremiumMember: true,
    earningsToday: 210000,
    completedOrdersToday: 14,
    walletBalance: 680000
  }
];

export const INITIAL_ADS: BannerAd[] = [
  {
    id: 'ad_1',
    merchantId: 'm1',
    merchantName: 'Ayam Geprek Sambal Korek Mas Gondrong',
    title: 'Pesta Pedas Arjawinangun!',
    subtitle: 'Diskon 20% + Gratis Ongkir 2 KM Pertama',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    badge: 'Sponsored',
    actionUrl: 'merchant:m1',
    type: 'homepage',
    pricePaid: 50000,
    activeUntil: '2026-10-31'
  },
  {
    id: 'ad_2',
    merchantId: 'm11',
    merchantName: 'Empal Gentong Mang Darma Cabang Arjawinangun',
    title: 'Empal Gentong Asli Cirebon',
    subtitle: 'Sensasi Kuah Gurih Rempah Gentong Tanah Liat',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    badge: 'Khas Arjawinangun',
    actionUrl: 'merchant:m11',
    type: 'homepage',
    pricePaid: 150000,
    activeUntil: '2026-11-15'
  },
  {
    id: 'ad_3',
    merchantId: 'm7',
    merchantName: 'Toko Sembako Berkah Pasar Arjawinangun',
    title: 'Belanja Pasar Murah Tanpa Macet',
    subtitle: 'Sayur, Beras, Telur Fresh Diantar 30 Menit Sampai',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    badge: 'Belanja Cepat',
    actionUrl: 'merchant:m7',
    type: 'homepage',
    pricePaid: 50000,
    activeUntil: '2026-10-28'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_active_demo',
    orderNumber: 'ARJA-ORD-20261015-001',
    customerId: 'user_cust_1',
    customerName: 'Diva Ageng Nugraha',
    customerPhone: '081223344556',
    merchantId: 'm1',
    merchantName: 'Ayam Geprek Sambal Korek Mas Gondrong',
    courierId: 'courier_1',
    courierName: 'Kang Asep Supriatna',
    courierPhone: '085712348899',
    courierVehicle: 'Honda Vario 160 (E 4521 AA)',
    courierPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    serviceType: 'food',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        notes: 'Level pedas 5 ya mas, banyakin bawang gorengnya'
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        notes: 'Es teh manis dipisah plastiknya'
      }
    ],
    pickupAddress: 'Jl. Ki Buyut Roda No. 42 (Dekat Stasiun Arjawinangun)',
    destinationAddress: 'Griya Permata Arjawinangun Blok B4 No. 12, Jungjang',
    distanceKm: 2.4,
    status: 'on_delivery',
    paymentMethod: 'mitrapay',
    paymentStatus: 'paid',
    subtotal: 60000,
    deliveryFee: 8800,
    platformFee: 1500,
    discount: 5000,
    total: 65300,
    courierEarned: 8000,
    merchantEarned: 54000,
    platformCommission: 6000,
    createdAt: '2026-10-15 08:35',
    estimatedMinutes: 12,
    progressPercent: 75
  }
];

export const INITIAL_FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'fraud_1',
    type: 'voucher_abuse',
    severity: 'medium',
    description: 'Penggunaan kode promo referral yang sama dari 4 nomor baru dalam rentang 10 menit.',
    targetUser: '0895-xxxx-8812 (IP Desa Kebonturi)',
    timestamp: '2026-10-15 07:15',
    status: 'flagged'
  },
  {
    id: 'fraud_2',
    type: 'fake_order',
    severity: 'low',
    description: 'Order kirim barang dibatalkan 3x berturut-turut pada akun belum terverifikasi KTP.',
    targetUser: 'Akun Tamu (Device ID #90812)',
    timestamp: '2026-10-14 21:40',
    status: 'reviewed'
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  gmv: 148500000,
  platformRevenue: 17820000,
  netProfit: 12450000,
  totalUsers: 8420,
  totalMerchants: 265,
  totalCouriers: 142,
  totalOrders: 11240,
  activeOrdersCount: 18
};
