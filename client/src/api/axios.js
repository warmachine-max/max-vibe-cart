import axios from 'axios';

// Automatically shifts gears based on environment
const BACKEND_URL = import.meta.env.PROD 
    ? 'https://max-vibe-cart-server.onrender.com'  // Production backend
    : 'http://localhost:5000';                     // Local development backend

const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

export default API;