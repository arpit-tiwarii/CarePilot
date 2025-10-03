import express from 'express';
import { 
  register, 
  login, 
  getUsers, 
  verifyEmail, 
  resendVerification, 
  forgotPassword, 
  resetPassword, 
  getProfile, 
  updateProfile, 
  changePassword 
} from '../controllers/authController.js';
import { 
  validateUserRegistration, 
  validateUserLogin, 
  validateForgotPassword, 
  validateResetPassword, 
  validateChangePassword, 
  validateProfileUpdate 
} from '../middleware/validation.js';
import { authenticate as auth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateUserRegistration, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateUserLogin, login);

// @route   GET /api/auth/verify-email
// @desc    Verify email address
// @access  Public
router.get('/verify-email', verifyEmail);

// @route   POST /api/auth/resend-verification
// @desc    Resend email verification
// @access  Private
router.post('/resend-verification', auth, resendVerification);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', validateForgotPassword, forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', validateResetPassword, resetPassword);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, validateProfileUpdate, updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, validateChangePassword, changePassword);

// @route   GET /api/auth/users
// @desc    Get all users (for doctor dashboard)
// @access  Public (for demo purposes)
router.get('/users', getUsers);

export default router;
