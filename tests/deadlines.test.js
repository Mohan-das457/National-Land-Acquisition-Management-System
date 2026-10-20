const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { seedDatabase } = require('../src/db/seed');

let centralToken = '';

beforeAll(async () => {
  await db.initDatabase();
  await seedDatabase();

  const centralLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'ramesh.kumar@dolr.gov.in', password: 'Password@123' });
  centralToken = centralLogin.body.token;
});

describe('Section 25 Statutory Deadline Engine', () => {
  it('should list active deadlines with days remaining and legal authority metadata', async () => {
    const res = await request(app)
      .get('/api/v1/deadlines');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    const deadline = res.body.data[0];
    expect(deadline.section_ref).toBe('Section 25');
    expect(deadline.legalAuthorityNotice).toContain('RFCTLARR Act 2013 Section 25');
    expect(deadline.daysRemaining).toBeDefined();
  });

  it('should allow authorized officers to record an extension under Section 25 Proviso', async () => {
    const res = await request(app)
      .post('/api/v1/deadlines/extend/DEADLINE-CPRR-SEC25')
      .set('Authorization', `Bearer ${centralToken}`)
      .send({
        extensionMonths: 6,
        authorityOrderRef: 'GO.Ms.No. 402/Rev/2026',
        extensionReason: 'Pendente lite: Writ petition disposed in High Court of Madras. Extension granted under Sec 25 Proviso.'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.extension.statutoryBasis).toContain('RFCTLARR Act 2013 Section 25 Proviso');
  });
});
