const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');
const { optionalAuth } = require('../middleware/auth');

router.get('/khasra-search', optionalAuth, citizenController.searchPublicKhasra);
router.post('/objections', optionalAuth, citizenController.submitObjectionPetition);
router.get('/objections/:id', optionalAuth, citizenController.getObjectionStatus);

module.exports = router;
