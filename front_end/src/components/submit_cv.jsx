import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyNavbar from "./shared/navbar";

const SubmitCV = () => {
  const [cvFile, setCvFile] = useState(null);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    qualification: "",
    experience: "",
    presentEmployer: "",
    industryType: "",
    presentSalary: "",
    functionalRole: "",
    presentLocation: "",
    locationPreference: "",
    mobile: "",
    email: "",
  });
  const [applicationStatus, setApplicationStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => prevPage - 1);

  const handleFileChange = (e) => setCvFile(e.target.files[0]); // Update CV file

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setApplicationStatus("Please upload your CV.");
      return;
    }

    const data = new FormData();
    data.append("cvFile", cvFile); // Attach file
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/directCv", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/BrowseJobs");
        }, 2000);
      } else {
        setApplicationStatus(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setApplicationStatus("Failed to submit your application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MyNavbar />
      <div className="max-w-lg mx-auto px-6 py-7 bg-white shadow-2xl rounded-lg mt-5">
        <h2 className="text-3xl font-semibold text-purple-600 text-center mb-1">Submit Your Details</h2>
        <h6 className="text-sm text-orange-500 font-semibold mb-4">* indicates Mandatory Fields</h6>

        {page === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-6">Step 1 of 2: Personal Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="mb-2 text-sm font-medium">Full Name *</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dob" className="mb-2 text-sm font-medium">Date of Birth *</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              {/* Additional fields */}
              <div className="flex flex-col">
                <label htmlFor="qualification" className="mb-2 text-sm font-medium">Qualification *</label>
                <input type="text" id="qualification" value={formData.qualification} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile" className="mb-2 text-sm font-medium">Mobile *</label>
                <input type="tel" id="mobile" value={formData.mobile} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm font-medium">Email *</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvFile" className="mb-2 text-sm font-medium">Upload CV *</label>
                <input type="file" id="cvFile" onChange={handleFileChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
            </form>
            <div className="flex justify-end mt-8">
              <button onClick={handleNextPage} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-all duration-200">Next</button>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-6">Step 2 of 2: Job Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="experience" className="mb-2 text-sm font-medium">Experience (in Years)*</label>
                <input type="number" id="experience" value={formData.experience} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="presentEmployer" className="mb-2 text-sm font-medium text-gray-700">Present Employer *</label>
                <input type="text" id="presentEmployer" value={formData.presentEmployer} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="industryType" className="mb-2 text-sm font-medium text-gray-700">Industry *</label>
                <input type="text" id="industryType" value={formData.industryType} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="presentSalary" className="mb-2 text-sm font-medium text-gray-700">Present Salary *</label>
                <input type="text" id="presentSalary" value={formData.presentSalary} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="functionalRole" className="mb-2 text-sm font-medium text-gray-700">Functional Role *</label>
                <input type="text" id="functionalRole" value={formData.functionalRole} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="presentLocation" className="mb-2 text-sm font-medium text-gray-700">Present Location *</label>
                <input type="text" id="presentLocation" value={formData.presentLocation} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="locationPreference" className="mb-2 text-sm font-medium text-gray-700">Location Preference *</label>
                <input type="text" id="locationPreference" value={formData.locationPreference} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              {/* <div className="flex flex-col">
                <label htmlFor="applyFor" className="mb-2 text-sm font-medium text-gray-700">Apply For *</label>
                <input type="text" id="applyFor" value={formData.applyFor} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" disabled />
              </div> */}
              {/* Additional fields */}
            </form>
            <div className="flex justify-between mt-8">
              <button onClick={handlePreviousPage} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">Previous</button>
              <button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg">Submit</button>
            </div>
          </>
        )}

        {applicationStatus && <p className="text-red-600 mt-6">{applicationStatus}</p>}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <p className="text-lg font-semibold text-green-600">Application submitted successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitCV;
