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

        // Explicit production flag lookup
        const isProduction = process.env.NODE_ENV === 'production';

        const cookieOptions = {
            httpOnly: true,
            secure: isProduction, // Evaluates to false on localhost so Chrome accepts it over HTTP
            sameSite: isProduction ? 'none' : 'lax', // 'lax' permits the cross-port cookie handoff (5000 -> 5173)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.cookie('token', token, cookieOptions);

        // Fallback target URL routing assignment
        const frontendUrl = isProduction
            ? 'https://max-vibe-cart.vercel.app'
            : 'http://localhost:5173';

        res.redirect(`${frontendUrl}/dashboard`);
    } catch (error) {
        console.error('Error in googleAuthCallback controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Verify if user has a valid JWT cookie and return profile data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(200).json({ success: false, message: 'No session token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_now');
        const user = await User.findById(decoded.id).select('-googleId');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User no longer exists' });
        }

        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.error('Error in getMe controller:', error);
        return res.status(200).json({ success: false, message: 'Invalid or expired session token' });
    }
};

// @desc    Clear authentication cookie and log out user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax'
        });

        return res.status(200).json({ success: true, message: 'Log out successful' });
    } catch (error) {
        console.error('Error in logout controller:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};