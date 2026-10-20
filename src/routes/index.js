const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const parcelRoutes = require('./parcelRoutes');
const workflowRoutes = require('./workflowRoutes');
const compensationRoutes = require('./compensationRoutes');
const signatureRoutes = require('./signatureRoutes');
const documentRoutes = require('./documentRoutes');
const citizenRoutes = require('./citizenRoutes');
const deadlineRoutes = require('./deadlineRoutes');
const db = require('../db');

// Health Check Endpoint
router.get('/health', async (req, res) => {
  const engine = db.getActiveEngine();
  let dbStatus = 'healthy';
  try {
    await db.query('SELECT 1');
  } catch (e) {
    dbStatus = 'degraded: ' + e.message;
  }

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'NLAMS Backend API',
    version: '3.0.0-sih2026',
    database: {
      engine,
      status: dbStatus
    },
    statutoryCompliance: 'RFCTLARR Act 2013'
  });
});

// Mount modular sub-routers
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/parcels', parcelRoutes);
router.use('/workflow', workflowRoutes);
router.use('/compensation', compensationRoutes);
router.use('/signatures', signatureRoutes);
router.use('/documents', documentRoutes);
router.use('/citizen', citizenRoutes);
router.use('/deadlines', deadlineRoutes);

module.exports = router;
