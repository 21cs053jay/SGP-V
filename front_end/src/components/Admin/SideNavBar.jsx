// src/components/Admin/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
        <Link
          to="/admin/logout"
          className="text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded transition block mt-2 border border-red-500"
        >
          Signout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
