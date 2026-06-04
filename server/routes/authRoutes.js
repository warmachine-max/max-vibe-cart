import express from 'express';
import passport from 'passport';
import { googleAuthCallback, getMe, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Redirect to Google Consent Screen
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback redirect from Google
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleAuthCallback
);

// Fetch current logged-in session user profile
router.get('/me', getMe);

// Clean user session cookie on log out
router.post('/logout', logoutUser);

export default router;