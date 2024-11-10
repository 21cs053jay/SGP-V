import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './SideNavBar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      
      const checkResponse = await fetch('http://localhost:5000/api/forgot/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const checkData = await checkResponse.json();
      if (!checkResponse.ok) {
        toast.error(checkData.message || 'Email not registered');
        return;
      }

      const response = await fetch('http://localhost:5000/api/forgot/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials:"include"
      });

      const data = await response.json();
    
      if (response.ok) {
        setOtpSent(true);
        toast.success('OTP sent to your email. Please check your inbox.');
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error('Failed to send OTP. Please try again later.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/forgot/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
        credentials:"include"
      });
      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        toast.success('OTP verified. You can now reset your password.');
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again later.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/forgot/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Password reset successfully!');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <ToastContainer />
      <div className="min-h-screen flex-1 flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md p-10 space-y-6 bg-white shadow-2xl border-2 border-gray-300 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Forgot Password</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!otpSent ? (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-left">Enter Your Registered Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md"
                  placeholder="Enter your registered email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Send OTP
              </button>
            </form>
          ) : !otpVerified ? (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label htmlFor="otp" className="block text-gray-700 text-left">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md"
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="newPassword" className="block text-gray-700 text-left">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md"
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
