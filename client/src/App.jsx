import React from 'react';

function App() {
  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_NODE_ENV === 'production'
      ? 'https://your-backend.onrender.com'
      : 'http://localhost:5000';

    window.open(`${backendUrl}/auth/google`, "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-center max-w-sm w-full mx-4">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">E-Commerce</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Welcome back! Please sign in to continue.</p>
        
        <button 
          onClick={handleGoogleLogin} 
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default App;