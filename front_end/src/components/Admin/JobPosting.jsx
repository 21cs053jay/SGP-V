import axios from "axios";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // For the submit button icon
import Sidebar from "./SideNavBar";

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

      await axios.post("http://localhost:5000/jobPost", formattedData);
      alert("Job posting submitted successfully!");
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
          <table className="table-auto w-full border-collapse border border-gray-500">
            <tbody>
              {/* Job ID */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Job ID
                </td>
                <td className="p-3 shadow-md">
                  <input
                    type="text"
                    name="jid"
                    placeholder="Enter Job ID"
                    value={formData.jid}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  />
                </td>
              </tr>

              {/* Job Title */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Job Title
                </td>
                <td className="p-3 shadow-md">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Enter Job Title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  />
                </td>
              </tr>

              {/* Key Skills */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Key Skills
                </td>
                <td className="p-3 shadow-md">
                  <input
                    type="text"
                    name="keySkills"
                    placeholder="Enter Key Skills"
                    value={formData.keySkills}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  />
                </td>
              </tr>

              {/* Qualification */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Qualification
                </td>
                <td className="p-3 shadow-md">
                  <div className="flex flex-col">
                    {["B COM / BBA / BA / BCA", "B Pharma / M Pharma", "BE / ME", "BSC / MSC"].map(
                      (qual, idx) => (
                        <label key={idx} className="flex items-center mb-2 shadow-sm">
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
                </td>
              </tr>

              {/* Stream */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Stream
                </td>
                <td className="p-3 shadow-md">
                  <div className="flex flex-col">
                    {["Agriculture", "Arts", "Chemicals", "Chemistry"].map((stream, idx) => (
                      <label key={idx} className="flex items-center mb-2 shadow-sm">
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
                </td>
              </tr>

              {/* Company Name */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Company Name
                </td>
                <td className="p-3 shadow-md">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  />
                </td>
              </tr>

              {/* Job Location */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Job Location(s)
                </td>
                <td className="p-3 shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    >
                      <option value="">Select State</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    >
                      <option value="">Select City</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>
                </td>
              </tr>

              {/* Industry Type */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Industry Type
                </td>
                <td className="p-3 shadow-md">
                  <div className="flex flex-col">
                    {["Agriculture", "Automobile", "Banking", "IT"].map((industry, idx) => (
                      <label key={idx} className="flex items-center mb-2 shadow-sm">
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
                </td>
              </tr>

              {/* Salary Range */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Salary Range
                </td>
                <td className="p-3 shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="salaryMin"
                      placeholder="Min Salary"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                    <input
                      type="text"
                      name="salaryMax"
                      placeholder="Max Salary"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                  </div>
                </td>
              </tr>

              {/* Experience Range */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Experience Range
                </td>
                <td className="p-3 shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="experienceMin"
                      placeholder="Min Experience"
                      value={formData.experienceMin}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                    <input
                      type="text"
                      name="experienceMax"
                      placeholder="Max Experience"
                      value={formData.experienceMax}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                  </div>
                </td>
              </tr>

              {/* Job Description */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Job Description
                </td>
                <td className="p-3 shadow-md">
                  <textarea
                    name="jobDescription"
                    placeholder="Enter Job Description"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  ></textarea>
                </td>
              </tr>

              {/* Posted By */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Posted By
                </td>
                <td className="p-3 shadow-md">
                  <input
                    type="text"
                    name="postedBy"
                    placeholder="Enter Your Name"
                    value={formData.postedBy}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-md"
                  />
                </td>
              </tr>

              {/* Contact Information */}
              <tr className="border-b border-gray-500">
                <td className="font-bold text-gray-700 p-3 border-r border-gray-500 shadow-lg">
                  Contact Information
                </td>
                <td className="p-3 shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    />
                  </div>
                </td>
              </tr>

              {/* Submit Button */}
              <tr>
                <td colSpan="2" className="p-3 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center justify-center focus:outline-none hover:bg-blue-600 shadow-md"
                  >
                    <FaPaperPlane className="mr-2" /> Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default JobPosting;
