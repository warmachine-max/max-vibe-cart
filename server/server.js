import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// 1. Essential Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend.vercel.app' : 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is up and running smoothly using ES Modules!" });
});

// 3. Server Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});