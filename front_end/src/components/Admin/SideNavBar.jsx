import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Adjust the import path as needed

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setModalMessage('Are you sure you want to sign out?');
    setIsModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    setIsModalOpen(false); // Close the modal first

    // Fetch token from local storage
    const token = localStorage.getItem('token');
    
    if (!token) {
      setModalMessage('No token found. Please log in again.');
      setIsModalOpen(true);
      return;
    }

    try {
      // Send sign-out request to server
      const response = await fetch('http://localhost:5000/admin/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Clear token from local storage
        localStorage.removeItem('token');
        setModalMessage('Signed out successfully');
        setIsModalOpen(true);

        // Delay navigation to allow message display
        setTimeout(() => {
          navigate('/admin'); // Redirect to login page
        }, 2500); // 1.5 seconds delay
      } else {
        setModalMessage(data.message || 'Failed to sign out');
        setIsModalOpen(true);
      }
    } catch (err) {
      setModalMessage('Failed to sign out. Please try again later.');
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col border-r border-gray-700">
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
        <h2>Welcome Admin</h2>
      </div>
      <div className="flex-1 px-6 py-4 space-y-4">
        <Link
          to="/admin/direct-cv"
          className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition border border-gray-700"
        >
          <span>📥</span>
          <span>Direct CV Received</span>
        </Link>
        <Link
          to="/admin/recent-jobs"
          className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition border border-gray-700"
        >
          <span>📅</span>
          <span>Recent Posted Jobs</span>
        </Link>
        <Link
          to="/admin/cv-against-jobs"
          className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition border border-gray-700"
        >
          <span>📊</span>
          <span>CV Received Against Job Posting</span>
        </Link>
        <Link
          to="/admin/JobPosting"
          className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition border border-gray-700"
        >
          <span>📝</span>
          <span>Job Posting</span>
        </Link>
        <Link
          to="/admin/job-locations"
          className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition border border-gray-700"
        >
          <span>🌍</span>
          <span>Job Locations</span>
        </Link>
      </div>
      <div className="px-6 py-4 border-t border-gray-700">
        <Link
          to="/admin/changepassword"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition block border border-gray-700"
        >
          Change Password
        </Link>
        <button
          onClick={handleSignOut}
          className="text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded transition block mt-2 border border-red-500 w-full text-center"
        >
          Signout
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmSignOut}
        onCancel={handleCancel}
        message={modalMessage}
      />
    </div>
  );
};

export default Sidebar;
