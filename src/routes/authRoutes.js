import express from 'express';
import { loginHandler, signupHandler } from '../controllers/authController.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';
import { validateLogin, validateSignup } from '../middleware/userValidators.js';

const router = express.Router();

router.post('/signup', validateSignup, signupHandler);
router.post('/login', loginRateLimiter, validateLogin, loginHandler);

export default router;