const express = require('express');
const router = express.Router();
const Controller = require('../controllers/authController');

router.post('/login', Controller.login); // Import the authController
router.get('/get', Controller.getAllUsers);
router.get('/profile', Controller.getSuperAdminProfile);
// Import the authController

module.exports = router;