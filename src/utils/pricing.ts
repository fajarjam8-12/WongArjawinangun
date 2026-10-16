/**
 * MITRAARJA - Core Pricing, Dispatch & Business Logic Rules
 * Pure calculation functions for Hyperlocal Marketplace
 */

export interface DeliveryCalculation {
  distanceKm: number;
  weightKg: number;
  deliveryFee: number;
  isOverweight: boolean;
  isProhibited: boolean;
  prohibitedReason?: string;
}

export const PROHIBITED_KEYWORDS = [
  'narkoba',
  'ganja',
  'shabu',
  'senjata',
  'pistol',
  'peluru',
  'hewan langka',
  'burung langka',
  'bahan peledak',
  'bom',
  'petasan ilegal'
];

/**
 * Delivery fee rule:
 * First 2 KM = Rp 8.000
 * Next each KM = Rp 2.000
 * Max weight = 20 KG
 */
export function calculateDeliveryFee(distanceKm: number, weightKg: number = 1): DeliveryCalculation {
  const safeDistance = Math.max(0.1, Number(distanceKm) || 1);
  const safeWeight = Math.max(0.1, Number(weightKg) || 1);
  const isOverweight = safeWeight > 20;

  let fee = 8000;
  if (safeDistance > 2) {
    const additionalKm = Math.ceil(safeDistance - 2);
    fee += additionalKm * 2000;
  }

  // Weight surcharge if between 10kg and 20kg (+Rp 3.000)
  if (safeWeight > 10 && safeWeight <= 20) {
    fee += 3000;
  }

  return {
    distanceKm: safeDistance,
    weightKg: safeWeight,
    deliveryFee: fee,
    isOverweight,
    isProhibited: false
  };
}

/**
 * Checks if goods description contains contraband / prohibited items
 */
export function checkProhibitedItem(description: string): { isProhibited: boolean; keyword?: string } {
  if (!description) return { isProhibited: false };
  const lower = description.toLowerCase();
  for (const word of PROHIBITED_KEYWORDS) {
    if (lower.includes(word)) {
      return { isProhibited: true, keyword: word };
    }
  }
  return { isProhibited: false };
}

/**
 * Platform service fee rule:
 * Rp 1.000 - Rp 2.500 based on order subtotal
 */
export function calculateServiceFee(subtotal: number): number {
  if (subtotal <= 25000) return 1000;
  if (subtotal <= 75000) return 1500;
  if (subtotal <= 150000) return 2000;
  return 2500;
}

/**
 * Merchant commission rule:
 * 10% from merchant subtotal
 */
export function calculateMerchantCommission(merchantSubtotal: number): number {
  return Math.round(merchantSubtotal * 0.1);
}

/**
 * Reward System:
 * Rp 10.000 = 1 Mitra Point
 */
export function calculateMitraPoints(amountPaid: number): number {
  if (amountPaid < 10000) return 0;
  return Math.floor(amountPaid / 10000);
}

/**
 * Referral reward:
 * Customer A invites Customer B = 100 points
 */
export const REFERRAL_BONUS_POINTS = 100;

/**
 * Withdrawal fee:
 * Rp 2.500 per cashout
 */
export const WITHDRAWAL_FEE = 2500;

/**
 * Auto Dispatch escalation radii:
 * 1 KM -> 3 KM -> 5 KM
 */
export function getAutoDispatchRadius(attemptIndex: number): number {
  if (attemptIndex === 0) return 1;
  if (attemptIndex === 1) return 3;
  return 5;
}

/**
 * PPOB pricing margin generator
 */
export function calculatePpobPrice(baseCost: number, serviceFee: number = 1500): number {
  return baseCost + serviceFee;
}
