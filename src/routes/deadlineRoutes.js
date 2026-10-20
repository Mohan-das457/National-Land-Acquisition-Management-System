const express = require('express');
const router = express.Router();
const deadlineController = require('../controllers/deadlineController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

router.get('/', optionalAuth, deadlineController.getDeadlines);
router.post('/extend/:id', authenticateToken, requireRole(['central', 'state']), deadlineController.requestExtension);

module.exports = router;
