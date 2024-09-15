import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);  // Store JWT
        login();
        navigate('/admin_home');
      } else {
        setError(data.message || 'Invalid Admin ID or Password');
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-10 space-y-6 bg-white shadow-2xl border-2 border-gray-300 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Admin Login</h2>
        <p className="text-gray-700 text-center mb-4">Please enter your admin ID and password below</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="adminId" className="block text-gray-700 text-left">Admin ID</label>
            <input
              type="text"
              id="adminId"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter your Admin ID"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-left">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter your password"
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
            <label htmlFor="showPassword" className="text-gray-700">Show Password</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">Powered by <span className="font-semibold">Pooja Infotech</span></p>
      </div>
    </div>
  );
};

export default AdminLogin;
