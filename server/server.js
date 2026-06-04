import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'; // Import your database config

const app = express();

// 1. Connect to MongoDB Atlas
connectDB();

// 2. Essential Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://max-vibe-cart.vercel.app' 
        : 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is up, running, and connected to structured MongoDB!" });
});

// 4. Server Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});