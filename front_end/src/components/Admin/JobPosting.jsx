import axios from "axios"; // Import Axios
import React, { useState } from "react";
import Sidebar from "./SideNavBar";

const JobPosting = () => {
  // States to handle form input
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

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Format the data correctly for the backend
      const formattedData = {
        ...formData,
        jobLocation: {
          state: formData.state,
          city: formData.city
        },
        salary: {
          min: formData.salaryMin,
          max: formData.salaryMax
        },
        experience: {
          min: formData.experienceMin,
          max: formData.experienceMax
        }
      };

      // Make the POST request to the backend
      await axios.post("http://localhost:5000/jobPost", formattedData);
      alert("Job posting submitted successfully!");

      // Reset the form after submission
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
        email: ""
      });
    } catch (error) {
      console.error("Error submitting job posting:", error);
      alert("Failed to submit job posting.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left SideNav (Fixed Position) */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-8 pb-2 border-b text-gray-700">
          Add Company Job Posting Information
        </h1>

        {/* Form */}
        <form
          className="border p-6 rounded-md shadow-md bg-white max-w-4xl mx-auto"
          onSubmit={submitHandler}
        >
          <div className="space-y-4 border border-gray-300 p-4 bg-gray-50">
            {/* JID */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">JID</label>
              <input
                type="text"
                name="jid"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Job ID"
                value={formData.jid}
                onChange={handleInputChange}
              />
            </div>

            {/* Job Title */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
            </div>

            {/* KeySkills */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">KeySkills</label>
              <input
                type="text"
                name="keySkills"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Key Skills"
                value={formData.keySkills}
                onChange={handleInputChange}
              />
            </div>

            {/* Qualification (Checkboxes) */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Qualification</label>
              <div className="flex-1 space-y-2">
                {["B COM / BBA / BA / BCA", "B Pharma / M Pharma", "BE / ME", "BSC / MSC"].map(
                  (qual, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        id={qual}
                        name="qualification"
                        value={qual}
                        checked={formData.qualification.includes(qual)}
                        onChange={handleInputChange}
                      />
                      <label htmlFor={qual} className="ml-2">
                        {qual}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Stream (Radio Buttons) */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Stream</label>
              <div className="flex-1 space-y-2">
                {["Agriculture", "Arts", "Chemicals", "Chemistry"].map((stream, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      id={stream}
                      name="stream"
                      value={stream}
                      checked={formData.stream === stream}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={stream} className="ml-2">
                      {stream}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Name */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>

            {/* Job Location */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Job Location</label>
              <div className="flex-1 flex space-x-2">
                <select
                  name="state"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
                <select
                  name="city"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select City</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
            </div>

            {/* Industry Type */}
            <div className="flex items-start space-x-4">
              <label className="w-1/4 font-medium">Industry Type</label>
              <div className="flex-1 space-y-2">
                {["Automobile", "Chemical", "Electronics"].map((industry, idx) => (
                  <div key={idx}>
                    <input
                      type="checkbox"
                      id={industry}
                      name="industryType"
                      value={industry}
                      checked={formData.industryType.includes(industry)}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={industry} className="ml-2">
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Salary (INR/Annum)</label>
              <div className="flex-1 flex space-x-2">
                <input
                  type="number"
                  name="salaryMin"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Min Salary"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="salaryMax"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Max Salary"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Experience (Years)</label>
              <div className="flex-1 flex space-x-2">
                <input
                  type="number"
                  name="experienceMin"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Min Experience"
                  value={formData.experienceMin}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="experienceMax"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  placeholder="Max Experience"
                  value={formData.experienceMax}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Job Description</label>
              <textarea
                name="jobDescription"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Job Description"
                value={formData.jobDescription}
                onChange={handleInputChange}
              />
            </div>

            {/* Posted By */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Posted By</label>
              <input
                type="text"
                name="postedBy"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Name"
                value={formData.postedBy}
                onChange={handleInputChange}
              />
            </div>

            {/* Contact Information */}
            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-1/4 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-6"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPosting;
