const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { seedDatabase } = require('../src/db/seed');

let centralToken = '';
let surveyorToken = '';

beforeAll(async () => {
  await db.initDatabase();
  await seedDatabase();

  const centralLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'ramesh.kumar@dolr.gov.in', password: 'Password@123' });
  centralToken = centralLogin.body.token;

  const surveyorLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'k.soundar@tn.gov.in', password: 'Password@123' });
  surveyorToken = surveyorLogin.body.token;
});

describe('RFCTLARR Act 2013 Workflow Lifecycle', () => {
  it('should retrieve workflow pipeline status with stage counts', async () => {
    const res = await request(app)
      .get('/api/v1/workflow/pipeline')
      .set('Authorization', `Bearer ${centralToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stageCounts).toBeDefined();
  });

  it('should prevent illegal stage skipping (e.g., jumping from stage 4 to stage 6 directly)', async () => {
    const res = await request(app)
      .post('/api/v1/workflow/transition')
      .set('Authorization', `Bearer ${centralToken}`)
      .send({
        projectId: 'PRJ-AP-AMR-01', // Currently stage 4
        targetStage: 6,
        decision: 'approved',
        comments: 'Attempting invalid jump directly to possession'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('INVALID_STAGE_TRANSITION');
  });

  it('should prevent unauthorized roles from executing stage approvals', async () => {
    // Surveyor role cannot sign off on Stage 5 Award Determination
    const res = await request(app)
      .post('/api/v1/workflow/transition')
      .set('Authorization', `Bearer ${surveyorToken}`)
      .send({
        projectId: 'PRJ-TN-CPRR-02',
        targetStage: 5,
        decision: 'approved',
        comments: 'Surveyor attempting quasi-judicial award'
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('ROLE_UNAUTHORIZED_FOR_STAGE');
  });
});
