const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { calculateCompensation } = require('../src/services/rfctlarrCalculator');
const { seedDatabase } = require('../src/db/seed');

let districtToken = '';

beforeAll(async () => {
  await db.initDatabase();
  await seedDatabase();

  const districtLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'alby.john@tn.gov.in', password: 'Password@123' });
  districtToken = districtLogin.body.token;
});

describe('Compensation & Rehabilitation Engine', () => {
  it('should calculate RFCTLARR 2013 statutory compensation with 100% solatium and rural multiplier', () => {
    // 2.0 Ha @ ₹50,00,000/Ha, 12km from urban center (multiplier 1.50)
    // Raw Market Value: ₹1,00,00,000
    // Base Land with Multiplier (1.5x): ₹1,50,00,000
    // Trees + Structures: ₹2,00,000
    // Total Land & Assets: ₹1,52,00,000
    // 100% Solatium (Sec 30(1)): ₹1,52,00,000
    // Total Award before interest: ₹3,04,00,000
    const result = calculateCompensation({
      acquiredAreaHa: 2.0,
      guidelineValuePerHa: 5000000,
      distanceFromUrbanKm: 12,
      isUrban: false,
      treesValuation: 100000,
      structuresValuation: 100000
    });

    expect(result.rawMarketValue).toBe(10000000);
    expect(result.multiplier).toBe(1.50);
    expect(result.baseLandValue).toBe(15000000);
    expect(result.totalLandAndAssets).toBe(15200000);
    expect(result.solatium).toBe(15200000);
    expect(result.totalAward).toBe(30400000);
  });

  it('should prevent duplicate payments on reconciled compensation cases', async () => {
    // CMP-TN-142-1A is already marked 'reconciled' in seed data
    const res = await request(app)
      .post('/api/v1/compensation/disburse/CMP-TN-142-1A')
      .set('Authorization', `Bearer ${districtToken}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toContain('DUPLICATE_PAYMENT_REJECTED');
  });
});
