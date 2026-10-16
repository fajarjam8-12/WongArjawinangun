import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDeliveryFee,
  checkProhibitedItem,
  calculateServiceFee,
  calculateMerchantCommission,
  calculateMitraPoints,
  getAutoDispatchRadius,
  WITHDRAWAL_FEE,
  REFERRAL_BONUS_POINTS
} from './pricing.ts';

test('calculateDeliveryFee calculates first 2km as Rp8.000', () => {
  const result1 = calculateDeliveryFee(1, 1);
  assert.equal(result1.deliveryFee, 8000);
  assert.equal(result1.isOverweight, false);

  const result2 = calculateDeliveryFee(2, 1);
  assert.equal(result2.deliveryFee, 8000);
});

test('calculateDeliveryFee adds Rp2.000 per subsequent km', () => {
  const result3km = calculateDeliveryFee(3, 2);
  assert.equal(result3km.deliveryFee, 10000); // 8000 + 1*2000

  const result5km = calculateDeliveryFee(5, 2);
  assert.equal(result5km.deliveryFee, 14000); // 8000 + 3*2000
});

test('calculateDeliveryFee flags overweight over 20kg', () => {
  const heavy = calculateDeliveryFee(2, 25);
  assert.equal(heavy.isOverweight, true);
});

test('checkProhibitedItem flags contraband items', () => {
  assert.equal(checkProhibitedItem('Paket narkoba jenis kristal').isProhibited, true);
  assert.equal(checkProhibitedItem('Senjata tajam replika').isProhibited, true);
  assert.equal(checkProhibitedItem('Bahan peledak pesta').isProhibited, true);
  assert.equal(checkProhibitedItem('Dokumen ijazah dan baju batik').isProhibited, false);
});

test('calculateServiceFee is within Rp1.000 to Rp2.500', () => {
  assert.equal(calculateServiceFee(15000), 1000);
  assert.equal(calculateServiceFee(50000), 1500);
  assert.equal(calculateServiceFee(200000), 2500);
});

test('calculateMerchantCommission enforces 10% rate', () => {
  assert.equal(calculateMerchantCommission(50000), 5000);
  assert.equal(calculateMerchantCommission(120000), 12000);
});

test('calculateMitraPoints awards 1 point per Rp10.000', () => {
  assert.equal(calculateMitraPoints(9900), 0);
  assert.equal(calculateMitraPoints(15000), 1);
  assert.equal(calculateMitraPoints(45000), 4);
});

test('auto dispatch escalation progresses correctly', () => {
  assert.equal(getAutoDispatchRadius(0), 1);
  assert.equal(getAutoDispatchRadius(1), 3);
  assert.equal(getAutoDispatchRadius(2), 5);
});

test('constants match business requirements', () => {
  assert.equal(WITHDRAWAL_FEE, 2500);
  assert.equal(REFERRAL_BONUS_POINTS, 100);
});
