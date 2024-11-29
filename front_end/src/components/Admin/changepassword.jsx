import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import Sidebar from './SideNavBar';

const ChangePassword = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/admin/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminEmail,newPassword }),
        credentials:'include'
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Password changed successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(data.message || 'Error changing password');
      }
    } catch (err) {
      setError('Failed to change password. Please try again later.');
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl 
          rounded-2xl border border-white/30 
          transform transition-all duration-300 hover:scale-[1.02] 
          hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]
          p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Change Password
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Secure your account with a new password
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 
              p-3 rounded-lg text-center animate-shake">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 
              p-3 rounded-lg text-center animate-bounce">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="adminId"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 
                  rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500/50 
                  transition duration-300"
                placeholder="Enter your Admin Email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 
                  rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500/50 
                  transition duration-300"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 
                  rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500/50 
                  transition duration-300"
                placeholder="Re-enter your new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                text-white font-bold rounded-lg 
                hover:from-blue-700 hover:to-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                transition duration-300 transform hover:scale-[1.02] 
                active:scale-[0.98]"
            >
              Change Password
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Powered by <span className="font-semibold text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-600 to-indigo-600">
                Pooja Infotech
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;