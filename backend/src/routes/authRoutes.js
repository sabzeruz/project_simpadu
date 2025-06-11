import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Login route
router.post('/login', authController.login);

// Profile route
router.get('/profile', verifyToken, authController.profile);

export default router;