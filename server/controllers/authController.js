import jwt from 'jsonwebtoken';

// @desc    Handles successful Google authentication and issues a JWT token in a cookie
// @route   GET /api/auth/google/callback (Handled after Passport finishes)
// @access  Public
export const googleAuthCallback = async (req, res) => {
    try {
        // Passport automatically places the authenticated user inside req.user
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // 1. Generate a JWT Token containing the User's ID and Role
        const token = jwt.sign(
            { id: req.user._id, role: req.user.role },
            process.env.JWT_SECRET || 'fallback_secret_key_for_now', 
            { expiresIn: '7d' } // Token lasts for 7 days
        );

        // 2. Configure Cookie Options
        const cookieOptions = {
            httpOnly: true, // Prevents XSS attacks (JavaScript cannot read this cookie)
            secure: process.env.NODE_ENV === 'production', // true over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Crucial for cross-domain cookies
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        };

        // 3. Set the cookie containing our token
        res.cookie('token', token, cookieOptions);

        // 4. Redirect the user back to your frontend dashboard/home page!
        const frontendUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : 'https://max-vibe-cart.vercel.app';

        // Redirecting directly so the frontend app wakes up and knows the user is logged in
        res.redirect(`${frontendUrl}/dashboard`);

    } catch (error) {
        console.error('Error in googleAuthCallback controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};