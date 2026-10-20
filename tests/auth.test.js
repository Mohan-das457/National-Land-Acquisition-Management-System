const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { seedDatabase } = require('../src/db/seed');

beforeAll(async () => {
  await db.initDatabase();
  await seedDatabase();
});

describe('Authentication & Access Control', () => {
  it('should successfully log in with valid credentials and return JWT', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'ramesh.kumar@dolr.gov.in',
        password: 'Password@123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('central');
    expect(res.body.user.fullName).toBe('Dr. Ramesh Kumar IAS');
  });

  it('should reject login with invalid password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'ramesh.kumar@dolr.gov.in',
        password: 'WrongPassword999'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('INVALID_CREDENTIALS');
  });

  it('should retrieve current authenticated user details via /api/v1/auth/me', async () => {
    // 1. Login
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'alby.john@tn.gov.in',
        password: 'Password@123'
      });

    const token = loginRes.body.token;

    // 2. Query /me
    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.user.role).toBe('district');
    expect(meRes.body.user.district).toBe('Tiruvallur');
  });

  it('should reject unauthenticated access to protected routes', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('AUTHENTICATION_REQUIRED');
  });
});
