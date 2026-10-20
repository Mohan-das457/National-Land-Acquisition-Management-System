const express = require('express');
const router = express.Router();
const compensationController = require('../controllers/compensationController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

router.get('/', optionalAuth, compensationController.getCompensationCases);
router.post('/calculate', optionalAuth, compensationController.calculateAward);
router.post('/disburse/:caseId', authenticateToken, requireRole(['central', 'state', 'district']), compensationController.disburseCasePayment);

module.exports = router;
