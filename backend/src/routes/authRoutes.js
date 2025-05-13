const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

// Login route
router.post('/login', authController.login);

// Profile route
router.get('/profile', verifyToken, authController.profile);

module.exports = router;