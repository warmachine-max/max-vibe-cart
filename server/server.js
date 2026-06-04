import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // 1. Import cookie-parser
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5173' 
        : 'https://max-vibe-cart.vercel.app',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // 2. Activate cookie parsing functionality

// Initialize Passport
app.use(passport.initialize());
configurePassport();

// Mount Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});