import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchNavbar = ({ onSearchChange }) => {
  const [isSearchVisible, setSearchVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to toggle the search bar visibility
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  // Function to handle search input change
  const handleSearchInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);  // Pass the search term back to the parent component
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow w-full">
      <div className="flex flex-row items-center justify-between p-4">
        {/* Logo */}
                <div className='flex justify-start pl-4'>
                    <a href="/" className="text-2xl font-bold">
                        <span className='text-orange-500'>Job</span><span className="text-purple-600">Portal</span>
                    </a>
                </div>

        <div className='text-md md:flex flex-row justify-end items-center w-1/2'>
          {/* Links */}
          <div className="md:flex flex-row items-center space-x-4">
            <a href="/home" className="w-20 py-2 rounded-full text-blue-600 transition duration-300">
              Home
            </a>
            {/* Additional Links */}
          </div>

          {/* Dropdown */}
          <div className="relative group">
                            <button className="py-2 rounded-full text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
                                Jobs
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Link to="/Browsejobs" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Browse Jobs
                                </Link>
                                <Link to="/SubmitCV" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Submit Your CV
                                </Link>
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="relative group">
                            <button className="py-2 rounded-full text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
                                About
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Link to="/clients" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Clients
                                </Link>
                                <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    About Us
                                </Link>
                                <Link to="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

          {/* Search Button to toggle the search input */}
          {/* {!isSearchVisible && (
            <div className="flex flex-row items-center ml-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 w-24 flex flex-row justify-around"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" placeholder="Search" strokeWidth="3" d="M19 21l-6-6m2-5a7 6 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
                Search
            </button>
          </div>
          )} */}

          {/* Conditionally rendered search bar */}
          {isSearchVisible && (
            <div className="ml-4 flex items-center">
              <input
                type="text"
                placeholder="Search jobs"
                className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchInput}  // Update the search term when input changes
              />
            </div>
          )}

          {/* Login and Signup Buttons */}
          <div className="relative group">
                            <button className="py-2 rounded-full text-blue-600 transition duration-300 w-28 flex flex-row justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" stroke='currentColor'></line> <line x1="3" y1="6" x2="21" y2="6" stroke='currentColor'></line><line x1="3" y1="18" x2="21" y2="18" stroke='currentColor'></line></svg>
                                
                            </button>
                            <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Link to="/clients" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Login
                                </Link>
                                <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Signup
                                </Link>
                            </div>
                        </div>
        </div>
        </div>
    </nav>
  );
};

export default SearchNavbar;
