import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js'; // 1. Import your new auth routes

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5173' 
        : 'https://max-vibe-cart.vercel.app',
    credentials: true
}));
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());
configurePassport();

// 2. Mount your Authentication Routes
app.use('/api/auth', authRoutes);

// Sample Test Route
app.get('/', (req, res) => {
    res.send('API is running smoothly...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});