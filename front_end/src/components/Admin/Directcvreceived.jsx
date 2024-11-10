// /src/components/AdminCvManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./SideNavBar";
import { FaDownload } from 'react-icons/fa';

const AdminCvManagement = () => {
  const [cvs, setCvs] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/directcv');
        setCvs(response.data);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      }
    };

    fetchCvs();
  }, []);

  const handleShowMore = (cv) => {
    setSelectedCv(cv);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownload = (filePath) => {
    const fileName = filePath.split('\\').pop(); // Extract the file name from the path
    window.open(`http://localhost:5000/uploads/${fileName}`, '_blank');
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Submitted CVs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-5 border-b text-gray-700 text-left font-semibold">Name</th>
                <th className="py-3 px-5 border-b text-gray-700 text-left font-semibold">Email</th>
                <th className="py-3 px-5 border-b text-gray-700 text-left font-semibold">Experience</th>
                <th className="py-3 px-5 border-b text-gray-700 text-left font-semibold">Present Location</th>
                <th className="py-3 px-5 border-b text-gray-700 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cvs.map((cv) => (
                <tr key={cv._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5">{cv.fullName}</td>
                  <td className="py-4 px-5">{cv.email}</td>
                  <td className="py-4 px-5">{cv.experience}</td>
                  <td className="py-4 px-5">{cv.presentLocation}</td>
                  <td className="py-4 px-5 flex space-x-2">
                    <button
                      onClick={() => handleShowMore(cv)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                    >
                      Show More
                    </button>
                    <button
                      onClick={() => handleDownload(cv.cvFilePath)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300 flex items-center"
                    >
                      <FaDownload className="mr-1" /> Download CV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for showing more details */}
        {showModal && selectedCv && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">CV Details</h3>
              <table className="w-full text-left border-collapse">
                <tbody>
                  {[
                    { label: "Full Name", value: selectedCv.fullName },
                    { label: "DOB", value: selectedCv.dob },
                    { label: "Qualification", value: selectedCv.qualification },
                    { label: "Experience", value: `${selectedCv.experience} years` },
                    { label: "Present Location", value: selectedCv.presentLocation },
                    { label: "Location Preference", value: selectedCv.locationPreference },
                    { label: "Mobile", value: selectedCv.mobile },
                    { label: "Present Designation", value: selectedCv.presentDesignation },
                    { label: "Present Employer", value: selectedCv.presentEmployer },
                    { label: "Industry Type", value: selectedCv.industryType },
                    { label: "Salary", value: selectedCv.salary },
                    { label: "Functional Role", value: selectedCv.functionalRole },
                  ].map(({ label, value }) => (
                    <tr key={label} className="border-t">
                      <td className="py-2 pr-4 font-semibold text-gray-700">{label}:</td>
                      <td className="py-2 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCvManagement;
