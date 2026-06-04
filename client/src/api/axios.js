import axios from 'axios';

const API = axios.create({
    // Explicit fallback logic matching your updated backend structure
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://max-vibe-cart.vercel.app' // Replace with your actual live backend domain if different
        : 'http://localhost:5000', 
    
    withCredentials: true // CRITICAL: This forces Axios to include the JWT cookie on every request
});

export default API;