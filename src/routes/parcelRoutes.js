const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcelController');
const { optionalAuth } = require('../middleware/auth');

router.get('/', optionalAuth, parcelController.getParcels);
router.get('/:id', optionalAuth, parcelController.getParcelById);

module.exports = router;
