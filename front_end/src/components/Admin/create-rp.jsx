import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserTie, 
  FaEnvelope, 
  FaLock, 
  FaCheckCircle 
} from 'react-icons/fa';
import Sidebar from './SideNavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRepresentative = () => {
  const [formData, setFormData] = useState({
    role: 'Representative',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/handleRepresentative/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Representative created successfully!');
        setFormData({ role: 'Representative', name: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast.error(data.message || 'Failed to create representative.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 from-slate-50 via-white to-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Form section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 flex items-center justify-center"
      >
        <ToastContainer />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-slate-100"
        >
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600"
          >
            Create Representative
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Role */}
            <motion.div 
              variants={inputVariants}
              initial="initial"
              animate="animate"
            >
              <label className="block text-slate-700 font-semibold mb-2 flex items-center">
                <FaUserTie className="mr-2 text-emerald-500" />
                Select Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 appearance-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                  required
                >
                  <option value="Representative">Representative</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Name Input */}
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
            >
              <label className="block text-slate-700 font-semibold mb-2 flex items-center">
                <FaUserTie className="mr-2 text-blue-500" />
                Enter Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Representative's name"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
            >
              <label className="block text-slate-700 font-semibold mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-orange-500" />
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Representative's email"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-400 transition-all duration-300"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
            >
              <label className="block text-slate-700 font-semibold mb-2 flex items-center">
                <FaLock className="mr-2 text-purple-500" />
                Enter Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              />
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
            >
              <label className="block text-slate-700 font-semibold mb-2 flex items-center">
                <FaCheckCircle className="mr-2 text-pink-500" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform shadow-lg"
            >
              Create Representative
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateRepresentative;