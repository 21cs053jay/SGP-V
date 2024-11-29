import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideNavBar";
import { FaDownload } from "react-icons/fa";

const CvAgainstJob = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch job applications from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/apply/jobapplications");
        setFormData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    const filtered = formData.filter((data) =>
      data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, formData]);

  // Function to handle resume download
  const handleDownload = async (resumeFileId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/apply/resumes/${resumeFileId}`, {
        responseType: "blob", // Ensure we get binary data
      });

      // Create a temporary URL for the file
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf"); // Set default file name
      document.body.appendChild(link);
      link.click();

      // Clean up temporary objects
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-br from-purple-700 to-purple-500 text-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Applications</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by full name"
            className="w-full p-4 border border-purple-300 rounded-lg shadow-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white text-left border-b border-gray-200">
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Full Name</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">DOB</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Qualification</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Experience</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Industry</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Present Location</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Location Preference</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Mobile</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Email</th>
                <th className="py-4 px-6 font-semibold border-r border-gray-200">Apply For</th>
                <th className="py-4 px-6 font-semibold">Resume</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr key={data._id} className="border-t transition duration-300 ease-in-out hover:bg-purple-100">
                  <td className="py-4 px-6 border-r border-gray-200">
                    <div className="font-medium text-purple-600">{data.fullName}</div>
                  </td>
                  <td className="py-4 px-6 border-r border-gray-200">
                    {new Date(data.dob).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.qualification}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.experience} years</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.industry}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.presentLocation}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.locationPreference}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.mobile}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.email}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.applyFor}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDownload(data.resumeFileId)}
                      className="flex items-center justify-center bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600 transition duration-200"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </button>
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
