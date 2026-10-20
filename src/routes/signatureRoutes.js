const express = require('express');
const router = express.Router();
const signatureController = require('../controllers/signatureController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

router.post('/sign', authenticateToken, requireRole(['central', 'state', 'district', 'surveyor']), signatureController.signEntity);
router.post('/verify/:signatureId', signatureController.verifySignature);
router.get('/', signatureController.getEntitySignatures);

module.exports = router;
