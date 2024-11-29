import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Eye, EyeOff, Lock, Mail, UserCog } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response;
      const endpoint =
        role === 'admin'
          ? 'http://localhost:5000/admin/login'
          : 'http://localhost:5000/api/handleRepresentative/login';

      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        login();
        navigate('/admin_home');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 
        bg-white 
        rounded-2xl 
        shadow-2xl 
        border 
        border-gray-100 
        transition-all 
        duration-300 
        hover:shadow-4xl 
        transform 
        hover:-translate-y-2
        relative 
        overflow-hidden
      ">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 -z-10"></div>
        
        <div className="text-center">
          <h2 className="text-4xl pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Login
          </h2>
          <p className="text-gray-500 mb-6">
            Access your admin dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="relative">
              <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                  transition duration-300 
                  appearance-none"
                required
              >
                <option value="admin">Admin</option>
                <option value="representative">Representative</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                  transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                  transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 
              bg-gradient-to-r from-blue-600 to-purple-600 
              text-white font-bold rounded-lg 
              hover:from-blue-700 hover:to-purple-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              transition duration-300 
              transform hover:scale-[1.02] 
              active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pooja Infotech</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;