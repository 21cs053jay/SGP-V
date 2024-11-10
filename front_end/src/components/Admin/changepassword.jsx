import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideNavBar';

const ChangePassword = () => {
  const [adminId, setAdminId] = useState('');
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
        body: JSON.stringify({ adminId, newPassword }),
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
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-10 bg-gray-200">
        <div className="w-full max-w-lg p-10 space-y-6 bg-white shadow-2xl rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Change Password</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div>
              <label htmlFor="adminId" className="block text-gray-700 text-left font-medium">Admin ID</label>
              <input
                type="text"
                id="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Enter your Admin ID"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-gray-700 text-left font-medium">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Enter your new password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-left font-medium">Re-enter Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Re-enter your new password"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-gray-700 text-sm">Show Password</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 text-sm"
            >
              Change Password
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Powered by <span className="font-semibold">Pooja Infotech</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
