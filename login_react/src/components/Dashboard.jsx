import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-sky-800 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {user?.username}!</h1>
            <p className="text-white/70">You're successfully logged in</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
            <div className="space-y-3 text-white/80">
              <div><span className="font-medium">Email:</span> {user?.email}</div>
              <div><span className="font-medium">Username:</span> {user?.username}</div>
              {user?.number && <div><span className="font-medium">Phone:</span> {user.number}</div>}
              <div><span className="font-medium">User ID:</span> {user?.id}</div>
            </div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Session Info</h2>
            <div className="space-y-3 text-white/80">
              <div><span className="font-medium">Last Login:</span> {localStorage.getItem('lastLogin') ? new Date(localStorage.getItem('lastLogin')).toLocaleString() : 'N/A'}</div>
              <div><span className="font-medium">Total Users:</span> {JSON.parse(localStorage.getItem('registeredUsers') || '[]').length}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-medium text-white mb-2">🎯 Complete Profile</h3>
              <p className="text-white/70 text-sm">Add more details to your profile</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-medium text-white mb-2">🔒 Security</h3>
              <p className="text-white/70 text-sm">Set up two-factor authentication</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-medium text-white mb-2">📱 Mobile App</h3>
              <p className="text-white/70 text-sm">Download our mobile application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;