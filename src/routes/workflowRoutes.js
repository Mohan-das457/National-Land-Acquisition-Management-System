const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

router.get('/pipeline', authenticateToken, workflowController.getWorkflowPipeline);
router.post('/transition', authenticateToken, requireRole(['central', 'state', 'district', 'surveyor']), workflowController.transitionStage);

module.exports = router;
