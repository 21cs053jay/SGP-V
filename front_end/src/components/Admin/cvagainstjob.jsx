import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideNavBar"; // Importing Sidebar

const CvAgainstJob = () => {
  const [formData, setFormData] = useState([]); // State for holding form data
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  // Fetching form data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobapplications");
        setFormData(response.data);
        setFilteredData(response.data); // Initial filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Search functionality to filter data based on searchTerm
  useEffect(() => {
    const filtered = formData.filter((data) =>
      data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, formData]);

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-8 pb-2 border-b">Job Applications</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by full name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">DOB</th>
                <th className="py-2 px-4 border-b">Qualification</th>
                <th className="py-2 px-4 border-b">Experience</th>
                <th className="py-2 px-4 border-b">Present Employer</th>
                <th className="py-2 px-4 border-b">Industry</th>
                <th className="py-2 px-4 border-b">Present Salary</th>
                <th className="py-2 px-4 border-b">Functional Role</th>
                <th className="py-2 px-4 border-b">Present Location</th>
                <th className="py-2 px-4 border-b">Location Preference</th>
                <th className="py-2 px-4 border-b">Mobile</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Apply For</th>
                <th className="py-2 px-4 border-b">Resume</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{data.fullName}</td>
                  <td className="py-2 px-4 border-b">{data.dob}</td>
                  <td className="py-2 px-4 border-b">{data.qualification}</td>
                  <td className="py-2 px-4 border-b">{data.experience}</td>
                  <td className="py-2 px-4 border-b">{data.presentEmployer}</td>
                  <td className="py-2 px-4 border-b">{data.industry}</td>
                  <td className="py-2 px-4 border-b">{data.presentSalary}</td>
                  <td className="py-2 px-4 border-b">{data.functionalRole}</td>
                  <td className="py-2 px-4 border-b">{data.presentLocation}</td>
                  <td className="py-2 px-4 border-b">{data.locationPreference}</td>
                  <td className="py-2 px-4 border-b">{data.mobile}</td>
                  <td className="py-2 px-4 border-b">{data.email}</td>
                  <td className="py-2 px-4 border-b">{data.applyFor}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={data.resumeUrl}
                      className="text-blue-600 hover:underline"
                      download
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CvAgainstJob;
