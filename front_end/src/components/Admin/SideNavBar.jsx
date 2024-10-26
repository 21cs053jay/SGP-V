import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Adjust the import path if needed
import { HiOutlineDocumentText, HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineMap, HiOutlineKey, HiOutlineHome } from 'react-icons/hi';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // Load the theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Save theme to localStorage and apply to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSignOut = () => {
    setModalMessage('Are you sure you want to sign out?');
    setIsModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    setIsModalOpen(false); // Close the modal

    const token = localStorage.getItem('token');
    
    if (!token) {
      setModalMessage('No token found. Please log in again.');
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/admin/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('token');
        setModalMessage('Signed out successfully');
        setIsModalOpen(true);

        setTimeout(() => {
          navigate('/admin'); // Redirect to login page after 1.5 seconds
        }, 1500);
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} w-64 h-screen flex flex-col border-r shadow-2xl`}> 
      {/* Sidebar Header */}
      <div className="px-6 py-6 text-xl font-bold text-center bg-gradient-to-r from-dark-gray-500 to-black-600 text-white shadow-2xl border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700">
        <h2>Welcome Admin</h2>
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="mt-4 focus:outline-none text-xl">
          {theme === 'dark' ? <FiSun className="text-yellow-400" /> : <FiMoon />}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto hide-scrollbar">
        <Link to="/admin_home" className="flex items-center space-x-3 hover:bg-gray-500 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineHome className="text-xl" />
          <span>Home</span>
        </Link>
        <Link to="/admin/direct-cv" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineDocumentText className="text-xl" />
          <span>Direct CV Received</span>
        </Link>
        <Link to="/admin/recent-posted-jobs" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineBriefcase className="text-xl" />
          <span>Recent Posted Jobs</span>
        </Link>
        <Link to="/admin/cvagainstjob" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineUserGroup className="text-xl" />
          <span>CV Received Against Job Posting</span>
        </Link>
        <Link to="/admin/JobPosting" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineDocumentText className="text-xl" />
          <span>Job Posting</span>
        </Link>
        <Link to="/admin/job-locations" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineMap className="text-xl" />
          <span>Job Locations</span>
        </Link>
        <Link to="/admin/create-representative" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineUserGroup className="text-xl" />
          <span>Create Representative</span>
        </Link>
      </div>

      {/* Sidebar Footer */}
      <div className="px-6 py-4 border-t dark:border-gray-700">
        <Link to="/admin/changepassword" className="flex items-center space-x-3 hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl text-sm">
          <HiOutlineKey className="text-xl" />
          <span>Change Password</span>
        </Link>
        <button onClick={handleSignOut} className="flex items-center justify-center space-x-3 text-red-600 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 ease-in-out shadow-2xl mt-4 w-full text-sm">
          <FiLogOut className="text-xl" />
          <span>Signout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
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
