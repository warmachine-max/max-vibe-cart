import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    const { user, logout, loading } = useAuth();

    // 1. Show loading screen while verifying the backend cookie
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-sm font-medium">Verifying admin credentials...</p>
                </div>
            </div>
        );
    }

    // 2. Route Guard: Unauthenticated visitors are booted back to onboarding
    if (!user) {
        return <Navigate to="/signup" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            
            {/* Premium Top Navigation Control Bar */}
            <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
                
                {/* User Identity Details */}
                <div className="flex items-center gap-3">
                    {user.avatar ? (
                        <img 
                            src={user.avatar} 
                            alt="Admin Profile" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50"
                            referrerPolicy="no-referrer" // Ensures Google images load smoothly
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h2 className="text-sm font-bold leading-tight">{user.name}</h2>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{user.role}</span>
                    </div>
                </div>

                {/* Branded Middle Title */}
                <div className="hidden sm:block text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    MAX VIBE CART
                </div>

                {/* Functional Top Action Logout Button */}
                <button 
                    onClick={logout}
                    className="px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/40 transition-all duration-150 shadow-sm active:scale-95"
                >
                    Log Out
                </button>
            </header>

            {/* Dashboard Workspace Context Panel */}
            <main className="p-6 max-w-4xl mx-auto mt-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800/60">
                    <h1 className="text-2xl font-extrabold tracking-tight mb-3">Admin Control Station</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        Database connection is running securely. You have successfully authenticated via Google Gmail verification.
                    </p>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                        <div><span className="font-semibold text-slate-400">Account Mail:</span> {user.email}</div>
                        <div><span className="font-semibold text-slate-400">System ID:</span> <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-red-500">{user._id}</code></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;