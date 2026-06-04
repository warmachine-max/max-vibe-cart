import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const { user, loading } = useAuth();

    const BACKEND_URL = import.meta.env.PROD
        ? 'https://max-vibe-cart-server.onrender.com'
        : 'http://localhost:5000';

    if (loading) return <div className="flex h-screen items-center justify-center dark:bg-slate-900 text-white">Loading configuration...</div>;
    if (user) return <Navigate to="/dashboard" replace />;

    const handleGoogleSignup = () => {
        window.open(`${BACKEND_URL}/api/auth/google`, "_self");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-center max-w-sm w-full mx-4 border border-slate-100 dark:border-slate-700/50">
                
                <h1 className="text-3xl font-bold mb-2 tracking-tight">Max Vibe Cart</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                    Create your premium admin account to get started.
                </p>
                
                {/* Google Signup Trigger */}
                <button 
                    onClick={handleGoogleSignup} 
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                >
                    <span>Sign Up with Google</span>
                </button>

                {/* Router Link over to Login page */}
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline font-semibold">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;