import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "./SideNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jid: "",
    jobTitle: "",
    keySkills: "",
    qualification: [],
    stream: "",
    companyName: "",
    jobLocation: "",
    industryType: [],
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    jobDescription: "",
    postedBy: "",
    phoneNumber: "",
    email: "",
    areaOfWork: ""
  });

  const [isLoading, setIsLoading] = useState({
    locations: true,
    options: true
  });

  const [options, setOptions] = useState({
    industryTypes: [],
    areasOfWork: [],
    streams: [],
    qualifications: [],
    locations: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          industryTypesRes, 
          areasOfWorkRes, 
          streamsRes, 
          qualificationsRes,
          locationsRes
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/jobInfo/industrytype"),
          axios.get("http://localhost:5000/api/jobInfo/areaofwork"),
          axios.get("http://localhost:5000/api/jobInfo/stream"),
          axios.get("http://localhost:5000/api/jobInfo/qualification"),
          axios.get("http://localhost:5000/api/jobInfo/location")
        ]);

        setOptions({
          industryTypes: industryTypesRes.data.data,
          areasOfWork: areasOfWorkRes.data.data,
          streams: streamsRes.data.data,
          qualifications: qualificationsRes.data.data,
          locations: locationsRes.data.data.map(loc => `${loc.city}, ${loc.state}`)
        });

        setIsLoading({
          locations: false,
          options: false
        });
      } catch (error) {
        console.error("Error fetching options:", error);
        toast.error("Failed to fetch options. Please try again later.");
        setIsLoading({
          locations: false,
          options: false
        });
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value)
      }));
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
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

    // Validation checks
    const validationChecks = [
      { 
        condition: isNaN(formData.salaryMin) || isNaN(formData.salaryMax), 
        message: "Salary values must be numbers." 
      },
      { 
        condition: isNaN(formData.experienceMin) || isNaN(formData.experienceMax), 
        message: "Experience values must be numbers." 
      },
      { 
        condition: parseFloat(formData.salaryMin) > parseFloat(formData.salaryMax), 
        message: "Minimum salary cannot be greater than maximum salary." 
      },
      { 
        condition: parseFloat(formData.experienceMin) > parseFloat(formData.experienceMax), 
        message: "Minimum experience cannot be greater than maximum experience." 
      }
    ];

    for (let check of validationChecks) {
      if (check.condition) {
        toast.error(check.message, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    try {
      // Split location back into state and city
      const [city, state] = formData.jobLocation.split(', ');

      const formattedData = {
        ...formData,
        jobLocation: { city, state },
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

      toast.success("Job posting submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setFormData({
        jid: "",
        jobTitle: "",
        keySkills: "",
        qualification: [],
        stream: "",
        companyName: "",
        jobLocation: "",
        industryType: [],
        salaryMin: "",
        salaryMax: "",
        experienceMin: "",
        experienceMax: "",
        jobDescription: "",
        postedBy: "",
        phoneNumber: "",
        email: "",
        areaOfWork: ""
      });

    } catch (error) {
      console.error("Error submitting job posting:", error);
      toast.error("Failed to submit job posting.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="ml-64 flex-1 p-6 overflow-y-auto"
      >
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Add Company Job Posting Information
        </motion.h1>

        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-2xl border border-gray-300 max-w-3xl mx-auto"
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Job ID */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job ID</label>
              <input
                type="text"
                name="jid"
                placeholder="Enter Job ID"
                value={formData.jid}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Qualification</label>
              <div className="grid grid-cols-2 gap-2">
                {options.qualifications.map((qual, idx) => (
                  <label key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      name="qualification"
                      value={qual.qualification}
                      checked={formData.qualification.includes(qual.qualification)}
                      onChange={handleInputChange}
                      className="mr-2 text-blue-500 focus:ring-blue-500"
                    />
                    {qual.qualification}
                  </label>
                ))}
              </div>
            </div>

            {/* Stream */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Stream</label>
              <div className="grid grid-cols-2 gap-2">
                {options.streams.map((stream, idx) => (
                  <label key={idx} className="flex items-center">
                    <input
                      type="radio"
                      name="stream"
                      value={stream.stream}
                      checked={formData.stream === stream.stream}
                      onChange={handleInputChange}
                      className="mr-2 text-blue-500 focus:ring-blue-500"
                    />
                    {stream.stream}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Job Location */}
            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                Job Location
              </label>
              <select
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleInputChange}
                disabled={isLoading.locations}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                <option value="">
                  {isLoading.locations ? "Loading locations..." : "Select Location"}
                </option>
                {options.locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Type */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Industry Type</label>
              <div className="grid grid-cols-2 gap-2">
                {options.industryTypes.map((industry, idx) => (
                  <label key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      name="industryType"
                      value={industry.industrytype}
                      checked={formData.industryType.includes(industry.industrytype)}
                      onChange={handleInputChange}
                      className="mr-2 text-blue-500 focus:ring-blue-500"
                    />
                    {industry.industrytype}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Salary Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="Min Salary"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="Max Salary"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            {/* Experience Range */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Experience Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="experienceMin"
                  placeholder="Min Experience"
                  value={formData.experienceMin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
                <input
                  type="number"
                  name="experienceMax"
                  placeholder="Max Experience"
                  value={formData.experienceMax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            {/* Area of Work */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Area of Work</label>
              {isLoading.options ? (
                <div>Loading areas of work...</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {options.areasOfWork.map((area, idx) => (
                    <label key={idx} className="flex items-center">
                      <input
                        type="radio"
                        name="areaOfWork"
                        value={area.areaofwork}
                        checked={formData.areaOfWork === area.areaofwork}
                        onChange={handleInputChange}
                        className="mr-2 text-blue-500 focus:ring-blue-500"
                      />
                      {area.areaofwork}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Job Description</label>
              <textarea
                name="jobDescription"
                placeholder="Enter Job Description"
                value={formData.jobDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                rows="4"
              />
            </div>

            {/* Posted By */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Posted By</label>
              <input
                type="text"
                name="postedBy"
                placeholder="Enter Your Name"
                value={formData.postedBy}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                <FaPaperPlane className="inline-block mr-2" />
                Submit Job Posting
              </motion.button>
            </div>
          </div>
        </motion.form>

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default JobPosting;
