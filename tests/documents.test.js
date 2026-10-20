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

describe('Secure Document Vault & Cryptographic Verification', () => {
  it('should list vaulted documents with SHA-256 checksums', async () => {
    const res = await request(app)
      .get('/api/v1/documents')
      .set('Authorization', `Bearer ${centralToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should securely upload a document, compute checksum, and index it', async () => {
    const buffer = Buffer.from('%PDF-1.4 Mock Gazette Notification under Section 19 RFCTLARR Act 2013');

    const res = await request(app)
      .post('/api/v1/documents/upload')
      .set('Authorization', `Bearer ${centralToken}`)
      .field('title', 'Section 19 Gazette Notification CPRR')
      .field('category', 'Gazette Notification')
      .field('projectId', 'PRJ-TN-CPRR-02')
      .attach('file', buffer, 'gazette_sec19_cprr.pdf');

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.checksum).toBeDefined();
    expect(res.body.checksum.length).toBe(64); // SHA-256 hex length
  });
});
