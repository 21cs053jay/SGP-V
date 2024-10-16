// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const [searchTerm, setSearchTerm] = useState("");


// const SearchNavbar = () => {
//     return (
//         <nav className="sticky top-0 z-50 bg-white shadow w-full">
//             <div className="flex flex-row items-center justify-between py-4">
//                 {/* Logo */}
//                 <div className='flex justify-start pl-4'>
//                     <a href="/" className="text-2xl font-bold">
//                         Job<span className="text-[#F83002]">Portal</span>
//                     </a>
//                     <input
//         type="text"
//         placeholder="Search by Job Title, Location, Industry, etc."
//         className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//                 </div>
//                 <div className='md:flex flex-row justify-end items-center w-1/2'>
//                     {/* Links */}
//                     <div className="md:flex flex-row items-center space-x-4">
//                         <Link to="/home" className="border border-blue-600 hover:bg-blue-600 w-20 py-2 rounded-full hover:text-white text-blue-600 transition duration-300">
//                             Home
//                         </Link>

//                         {/* Dropdown */}
//                         <div className="relative group">
//                             <button className="border border-blue-600 hover:bg-blue-600 py-2 rounded-full hover:text-white text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
//                                 Jobs
//                                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                                 </svg>
//                             </button>
//                             <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                 <Link to="/Browsejobs" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
//                                     Browse Jobs
//                                 </Link>
//                                 <Link to="/SubmitCV" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
//                                     Submit Your CV
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Dropdown */}
//                         <div className="relative group">
//                             <button className="border border-blue-600 hover:bg-blue-600 py-2 rounded-full hover:text-white text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
//                                 About
//                                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                                 </svg>
//                             </button>
//                             <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                 <Link to="/clients" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
//                                     Clients
//                                 </Link>
//                                 <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
//                                     About Us
//                                 </Link>
//                                 <Link to="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
//                                     Contact Us
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Login and Signup Buttons */}
//                     <div className="flex flex-row justify-center items-center space-x-4 pl-4 pr-4">
//                         <Link to="/login" className="w-20 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-full transition duration-300">
//                             Login
//                         </Link>
//                         <Link to="/signup" className="border border-blue-600 hover:bg-blue-100 w-20 py-2 rounded-full hover:text-blue-600 text-blue-600 transition duration-300">
//                             Signup
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default SearchNavbar;
