import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Handles successful Google authentication and issues a JWT token in a cookie
// @route   GET /api/auth/google/callback
// @access  Public
export const googleAuthCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign(
            { id: req.user._id, role: req.user.role },
            process.env.JWT_SECRET || 'fallback_secret_key_for_now', 
            { expiresIn: '7d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.cookie('token', token, cookieOptions);

        const frontendUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : 'https://max-vibe-cart.vercel.app';

        res.redirect(`${frontendUrl}/dashboard`);
    } catch (error) {
        console.error('Error in googleAuthCallback controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// ==========================================
// NEW CONTROLLERS ADDED BELOW
// ==========================================

// @desc    Verify if user has a valid JWT cookie and return profile data
// @route   GET /api/auth/me
// @access  Private (We will verify the cookie token)
export const getMe = async (req, res) => {
    try {
        // 1. Grab the token from the incoming cookies
        // Note: For req.cookies to work, we need cookie-parser middleware in server.js (we'll add this next)
        const token = req.cookies?.token;

        if (!token) {
            return res.status(200).json({ success: false, message: 'No session token found' });
        }

        // 2. Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_now');
        
        // 3. Find the user in the database without returning sensitive database configurations
        const user = await User.findById(decoded.id).select('-googleId');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User no longer exists' });
        }

        // 4. Return the user payload to the frontend AuthContext
        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.error('Error in getMe controller:', error);
        // If token is expired or corrupt, return false so frontend wipes local user state safely
        return res.status(200).json({ success: false, message: 'Invalid or expired session token' });
    }
};

// @desc    Clear authentication cookie and log out user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res) => {
    try {
        // Clear the cookie by setting its expiration date to a time in the past
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        return res.status(200).json({ success: true, message: 'Log out successful' });
    } catch (error) {
        console.error('Error in logout controller:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};