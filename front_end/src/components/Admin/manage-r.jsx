import React, { useState, useEffect } from 'react';
import Sidebar from './SideNavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageRepresentatives = () => {
  const [representatives, setRepresentatives] = useState([]);

  useEffect(() => {
    // Fetch all representatives on component mount
    const fetchRepresentatives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/handleRepresentative/all');
        const data = await response.json();
        if (response.ok) {
          // Add loggedIn status to each representative
          const repsWithStatus = data.map((rep) => ({ ...rep, loggedIn: true }));
          setRepresentatives(repsWithStatus);
        } else {
          toast.error('Failed to fetch representatives.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching representatives.');
      }
    };

    fetchRepresentatives();
  }, []);

  const handleLogin = (id) => {
    setRepresentatives((prev) =>
      prev.map((rep) => (rep._id === id ? { ...rep, loggedIn: true } : rep))
    );
    toast.success(`Representative with ID: ${id} logged in successfully.`);
  };

  const handleLogout = (id) => {
    setRepresentatives((prev) =>
      prev.map((rep) => (rep._id === id ? { ...rep, loggedIn: false } : rep))
    );
    toast.info(`Representative with ID: ${id} logged out successfully.`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Representative Management Section */}
      <div className="flex-1 p-8">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-6 text-left">Manage Representatives</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {representatives.map((rep) => (
            <div
              key={rep._id}
              className={`bg-white p-6 border border-gray-300 rounded-lg shadow-md relative ${
                !rep.loggedIn ? 'opacity-50' : 'opacity-100'
              } transition-opacity`}
            >
              <h3 className="text-xl font-semibold mb-2">{rep.name}</h3>
              <p className="text-gray-700">Email: {rep.email}</p>
              <p className="text-gray-700">Role: {rep.role}</p>
              
              {/* Logged-out overlay */}
              {!rep.loggedIn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                  <p className="text-red-500 font-semibold">Logged out</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleLogin(rep._id)}
                  disabled={rep.loggedIn} // Enabled only when logged out
                  className={`flex-1 px-4 py-2 rounded-md transition ${
                    rep.loggedIn
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleLogout(rep._id)}
                  disabled={!rep.loggedIn} // Enabled only when logged in
                  className={`flex-1 px-4 py-2 rounded-md transition ${
                    !rep.loggedIn
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRepresentatives;
