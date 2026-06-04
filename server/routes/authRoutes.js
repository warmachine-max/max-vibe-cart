import express from 'express';
import passport from 'passport';
import { googleAuthCallback } from '../controllers/authController.js';

const router = express.Router();

// @desc    Initial step: Redirects the user to Google's consent screen
// @route   GET /api/auth/google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Callback step: Google sends the user here with a code, Passport verifies it, then our controller fires
// @route   GET /api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleAuthCallback
);

export default router;