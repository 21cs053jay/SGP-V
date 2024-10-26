import React, { useState, useEffect } from "react";
import Sidebar from "./SideNavBar";
// import Header from "./header";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulating fetching data from database
  useEffect(() => {
    const fetchData = async () => {
      const result = [
        {
          id: 1,
          fullName: "John Doe",
          email: "john@example.com",
          qualification: "B. Tech",
          experience: "3 Years",
          presentLocation: "New York",
          locationReference: "LA",
          mobile: "1234567890",
          industry: "IT",
          role: "Developer",
        },
        {
          id: 2,
          fullName: "Jane Smith",
          email: "jane@example.com",
          qualification: "M. Tech",
          experience: "5 Years",
          presentLocation: "San Francisco",
          locationReference: "Seattle",
          mobile: "0987654321",
          industry: "Engineering",
          role: "Engineer",
        },
        // Add more mock data as needed
      ];
      setData(result);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((row) =>
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <Header /> */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 h-screen overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-700">Welcome</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Email"
              className="px-4 py-2 w-64 border border-gray-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Card View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <div
                key={row.id}
                className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{row.fullName}</h2>
                    <p className="text-gray-500">{row.email}</p>
                  </div>
                </div>
                <div className="text-gray-700">
                  <p>
                    <strong>Qualification:</strong> {row.qualification}
                  </p>
                  <p>
                    <strong>Experience:</strong> {row.experience}
                  </p>
                  <p>
                    <strong>Present Location:</strong> {row.presentLocation}
                  </p>
                  <p>
                    <strong>Location Reference:</strong> {row.locationReference}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {row.mobile}
                  </p>
                  <p>
                    <strong>Industry:</strong> {row.industry}
                  </p>
                  <p>
                    <strong>Role:</strong> {row.role}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
