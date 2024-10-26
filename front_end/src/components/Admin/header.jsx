import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

const Header = ({ adminName, toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-indigo-600 text-white p-4 shadow-lg">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
        <HiMenu />
      </button>

      {/* Welcome Message */}
      <h1 className="text-lg font-bold">Welcome, {adminName}</h1>
    </header>
  );
};

export default Header;
