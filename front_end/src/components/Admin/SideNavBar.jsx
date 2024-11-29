import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {jwtDecode} from 'jwt-decode';
import ConfirmationModal from './ConfirmationModal';
import { 
  HiOutlineDocumentText, 
  HiOutlineBriefcase, 
  HiOutlineUserGroup, 
  HiOutlineKey, 
  HiOutlineHome 
} from 'react-icons/hi';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { LuPencilRuler } from 'react-icons/lu';
import { IoPersonAddOutline } from 'react-icons/io5';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [theme, setTheme] = useState('light');
  const [isExpanded, setIsExpanded] = useState(true);
  const [role, setRole] = useState(null); // Store user role
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Decode role from token stored in cookies
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSignOut = () => {
    setModalMessage('Are you sure you want to sign out?');
    setIsModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    setIsModalOpen(false);
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

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
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setModalMessage('Signed out successfully');
        setIsModalOpen(true);
        setTimeout(() => {
          navigate('/admin');
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
    setIsModalOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const MenuItem = ({ to, icon: Icon, text }) => {
    const isActive = location.pathname === to;
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          to={to}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-indigo-500 text-white'
              : 'hover:bg-indigo-100 dark:hover:bg-indigo-900'
          }`}
        >
          <Icon className={`text-xl ${isActive ? 'text-white' : ''}`} />
          <span className={`text-sm ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            {text}
          </span>
        </Link>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } h-screen flex flex-col border-r shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <motion.div
        className="px-6 py-6 flex flex-col items-center bg-gradient-to-r from-indigo-600 to-indigo-800 text-white"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          {theme === 'dark' ? (
            <FiSun className="text-xl text-yellow-300" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </motion.button>
      </motion.div>

      <div className="flex-1 py-4 space-y-2 overflow-y-auto hide-scrollbar px-3">
        {role === 'admin' && (
          <>
            <MenuItem to="/admin_home" icon={HiOutlineHome} text="Home" />
            <MenuItem to="/admin/direct-cv" icon={HiOutlineDocumentText} text="Direct CV" />
            <MenuItem to="/admin/recent-posted-jobs" icon={HiOutlineBriefcase} text="Posted Jobs" />
            <MenuItem to="/admin/cvagainstjob" icon={HiOutlineUserGroup} text="Applications" />
            <MenuItem to="/admin/JobPosting" icon={HiOutlineDocumentText} text="Job Posting" />
            <MenuItem to="/admin/job-locations" icon={LuPencilRuler} text="Job Fields" />
            <MenuItem to="/admin/create-representative" icon={IoPersonAddOutline} text="Create Rep" />
            <MenuItem to="/admin/manage-representative" icon={HiOutlineUserGroup} text="Manage Rep" />
          </>
        )}
        {role === 'Representative' && (
          <>
            <MenuItem to="/admin_home" icon={HiOutlineHome} text="Home" />
            <MenuItem to="/admin/cvagainstjob" icon={HiOutlineUserGroup} text="Applications" />
            <MenuItem to="/admin/JobPosting" icon={HiOutlineDocumentText} text="Job Posting" />
          </>
        )}
      </div>

      <div className="px-4 py-4 border-t dark:border-gray-700 space-y-2">
        <MenuItem to="/admin/changepassword" icon={HiOutlineKey} text="Change Password" />
        <motion.button
          onClick={handleSignOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span className="text-sm">Sign Out</span>
        </motion.button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmSignOut}
        onCancel={handleCancel}
        message={modalMessage}
        modalClass="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      />
    </motion.div>
  );
};

export default Sidebar;
