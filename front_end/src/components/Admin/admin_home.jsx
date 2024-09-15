// src/components/Admin/admin_home.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "./SideNavBar";

const AdminHome = () => {
  // Example data fetched from the database
  const [data, setData] = useState([]);

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
      ];
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 h-screen overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Welcome</h1>
          <div className="borderrounded-lg p-2">
            <input
              type="text"
              placeholder="Search for Email"
              className="px-4 py-2 border  border-gray-500  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Table Container with scroll */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <table className="min-w-full table-auto  border border-gray-400">
            <thead className="sticky top-0 bg-blue-300 z-20">
              <tr className="text-gray-900 uppercase text-sm leading-normal">
                <th className="py-3 px-6 border border-gray-400 text-left">No</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Full Name</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Email</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Qualification</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Experience</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Present Location</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Location Reference</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Mobile</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Type of Industry</th>
                <th className="py-3 px-6 border border-gray-400 text-left">Functional Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-normal">
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id} className="border-b border-gray-500 hover:bg-gray-300">
                    <td className="py-3 px-6 border border-gray-500 text-left whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.fullName}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.email}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.qualification}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.experience}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.presentLocation}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.locationReference}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.mobile}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.industry}</td>
<td className="py-3 px-6 border border-gray-400 text-left text-black font-normal">{row.role}</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-6 border border-gray-300 text-left" colSpan="10">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
