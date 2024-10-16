import React, { useState } from 'react';
import Sidebar from './SideNavBar'; // Ensure the import path is correct for your project

const CreateRePresentative = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic (e.g., sending data to backend)
    console.log('Form data:', formData);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Form section */}
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Representative</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Select Role */}
            <div>
              <label htmlFor="role" className="block text-gray-700">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* Enter Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700">Enter Name</label>
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
              <label htmlFor="email" className="block text-gray-700">Enter Email</label>
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
              <label htmlFor="password" className="block text-gray-700">Enter Password</label>
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Re-Presentative
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRePresentative;
