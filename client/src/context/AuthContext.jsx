import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios'; // Make sure this path correctly leads to your api file!

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            // Using your clean centralized API instance
            const response = await API.get('/api/auth/me');
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log("Not authenticated or session expired.");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const logout = async () => {
        try {
            await API.post('/api/auth/logout');
            setUser(null);
            window.location.href = '/signup';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);