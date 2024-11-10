import axios from "axios";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // For the submit button icon
import Sidebar from "./SideNavBar";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jid: "",
    jobTitle: "",
    keySkills: "",
    qualification: [],
    stream: "",
    companyName: "",
    state: "",
    city: "",
    industryType: [],
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    jobDescription: "",
    postedBy: "",
    phoneNumber: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const formattedData = {
            ...formData,
            jobLocation: {
                state: formData.state,
                city: formData.city,
            },
            salary: {
                min: formData.salaryMin,
                max: formData.salaryMax,
            },
            experience: {
                min: formData.experienceMin,
                max: formData.experienceMax,
            },
        };

        await axios.post("http://localhost:5000/api/jobPost/addJobPosting", formattedData);
        
        // Display success toast
        toast.success("Job posting submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
        });
        
        setFormData({
            jid: "",
            jobTitle: "",
            keySkills: "",
            qualification: [],
            stream: "",
            companyName: "",
            state: "",
            city: "",
            industryType: [],
            salaryMin: "",
            salaryMax: "",
            experienceMin: "",
            experienceMax: "",
            jobDescription: "",
            postedBy: "",
            phoneNumber: "",
            email: "",
        });
    } catch (error) {
        console.error("Error submitting job posting:", error);
        
        // Display error toast
        toast.error("Failed to submit job posting.", {
            position: "top-right",
            autoClose: 3000,
        });
    }
};
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      <div className="ml-64 flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Company Job Posting Information
        </h1>

        <form
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-3xl mx-auto"
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Job ID */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job ID</label>
              <input
                type="text"
                name="jid"
                placeholder="Enter Job ID"
                value={formData.jid}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Key Skills */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Key Skills</label>
              <input
                type="text"
                name="keySkills"
                placeholder="Enter Key Skills"
                value={formData.keySkills}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Qualification</label>
              <div className="flex flex-col">
                {["B COM / BBA / BA / BCA", "B Pharma / M Pharma", "BE / ME", "BSC / MSC"].map(
                  (qual, idx) => (
                    <label key={idx} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="qualification"
                        value={qual}
                        checked={formData.qualification.includes(qual)}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {qual}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Stream */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Stream</label>
              <div className="flex flex-col">
                {["Agriculture", "Arts", "Chemicals", "Chemistry"].map((stream, idx) => (
                  <label key={idx} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="stream"
                      value={stream}
                      checked={formData.stream === stream}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {stream}
                  </label>
                ))}
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Job Location */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job Location(s)</label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select City</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
            </div>

            {/* Industry Type */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Industry Type</label>
              <div className="flex flex-col">
                {["Agriculture", "Automobile", "Banking", "IT"].map((industry, idx) => (
                  <label key={idx} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="industryType"
                      value={industry}
                      checked={formData.industryType.includes(industry)}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {industry}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Salary Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="salaryMin"
                  placeholder="Min Salary"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                  type="text"
                  name="salaryMax"
                  placeholder="Max Salary"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Experience Range */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Experience Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="experienceMin"
                  placeholder="Min Experience"
                  value={formData.experienceMin}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                  type="text"
                  name="experienceMax"
                  placeholder="Max Experience"
                  value={formData.experienceMax}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job Description</label>
              <textarea
                name="jobDescription"
                placeholder="Enter Job Description"
                value={formData.jobDescription}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
              />
            </div>

            {/* Posted By */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Posted By</label>
              <input
                type="text"
                name="postedBy"
                placeholder="Enter Posted By"
                value={formData.postedBy}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center mt-6"
            >
              <FaPaperPlane className="mr-2" />
              Submit Job Posting
            </button>
          </div>
        </form>
        
        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default JobPosting;