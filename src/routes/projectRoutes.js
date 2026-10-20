const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

router.get('/', optionalAuth, projectController.getProjects);
router.get('/stats', optionalAuth, projectController.getDashboardStats);
router.get('/:id', optionalAuth, projectController.getProjectById);
router.post('/', authenticateToken, requireRole(['central', 'state']), projectController.createProject);

module.exports = router;
