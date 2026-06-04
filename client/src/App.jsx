import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/authpages/SignupPage';
import LoginPage from './pages/authpages/LoginPage';
import HomePage from './pages/HomePage'; // Import the dedicated HomePage file

function App() {
    return (
        <Router>
            <Routes>
                {/* Onboarding Gateways */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Core Station (Successful redirects map here) */}
                <Route path="/dashboard" element={<HomePage />} />

                {/* Catch-all global security bounce */}
                <Route path="*" element={<Navigate to="/signup" replace />} />
            </Routes>
        </Router>
    );
}

export default App;