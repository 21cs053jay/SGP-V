import React, { useState } from 'react';
import Sidebar from './SideNavBar'; // Ensure the import path is correct for your project
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRepresentative = () => {
  const [formData, setFormData] = useState({
    role: 'Representative', // Default role set to Representative (staff)
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // New field for confirming password
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Form section */}
      <div className="flex-1 p-8">
        <ToastContainer />
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-left">Create Representative</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Select Role */}
            <div>
              <label htmlFor="role" className="block text-gray-700 text-left">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Representative">Representative</option>
              </select>
            </div>

            {/* Enter Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 text-left">Enter Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter representative's name"
                required
              />
            </div>

            {/* Enter Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-left">Enter Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter representative's email"
                required
              />
            </div>

            {/* Enter Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-left">Enter Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter representative's password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-left">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Representative
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRepresentative;
