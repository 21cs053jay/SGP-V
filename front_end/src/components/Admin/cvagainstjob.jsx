// CvAgainstJob.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideNavBar";
import { FaDownload } from "react-icons/fa";
import DownloadResumeButton from "./DownloadResumeButton";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CvAgainstJob = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobapplications");
        setFormData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = formData.filter((data) =>
      data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, formData]);

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      margin: 2
    });
    doc.text("Job Applications", 10, 10);
    doc.autoTable({
      head: [[
        "Full Name", "DOB", "Qualification", "Experience", "Industry",
        "Present Location", "Location Preference", "Mobile", "Email", "Apply For"
      ]],
      body: filteredData.map((data) => [
        data.fullName,
        new Date(data.dob).toLocaleDateString(),
        data.qualification,
        `${data.experience} years`,
        data.industry,
        data.presentLocation,
        data.locationPreference,
        data.mobile,
        data.email,
        data.applyFor
      ]),
      startY: 15,
      margin: { left: 5, right: 5 },
      styles: { fontSize: 10, cellPadding: 1 },
      columnStyles: { 10: { cellWidth: 30 } }
    });
    doc.save("job_applications.pdf");
  };

  const downloadCSV = () => {
    const csvHeader = [
      "Full Name", "DOB", "Qualification", "Experience", "Industry",
      "Present Location", "Location Preference", "Mobile", "Email", "Apply For", "Resume Link"
    ];
    const csvRows = filteredData.map((data) => [
      data.fullName,
      new Date(data.dob).toLocaleDateString(),
      data.qualification,
      `${data.experience} years`,
      data.industry,
      data.presentLocation,
      data.locationPreference,
      data.mobile,
      data.email,
      data.applyFor,
      `http://localhost:5000/uploads/${data.resumeFileId}`
    ]);

    const csvContent = [
      csvHeader.join(","),
      ...csvRows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "job_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        {/* Download Buttons */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center"
          >
            <FaDownload className="mr-1" /> Download PDF
          </button>
          <button
            onClick={downloadCSV}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center"
          >
            <FaDownload className="mr-1" /> Download CSV
          </button>
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
                  <td className="py-4 px-6 border-r border-gray-200">{data.fullName}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{new Date(data.dob).toLocaleDateString()}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.qualification}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.experience} years</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.industry}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.presentLocation}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.locationPreference}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.mobile}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.email}</td>
                  <td className="py-4 px-6 border-r border-gray-200">{data.applyFor}</td>
                  <td className="py-4 px-6">
                    <DownloadResumeButton resumeFileId={data.resumeFileId} />
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
