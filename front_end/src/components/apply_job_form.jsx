import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "./shared/navbar";
import { useNavigate } from "react-router-dom";

const JobApplicationForm = () => {
  const { jid } = useParams(); // Get job ID from the URL parameters
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    qualification: "",
    experience: "",
    presentEmployer: "",
    industry: "",
    presentSalary: "",
    functionalRole: "",
    presentLocation: "",
    locationPreference: "",
    mobile: "",
    email: "",
    applyFor: "", // Added applyFor to formData
  });
  const [applicationStatus, setApplicationStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  // Fetch job details based on jid
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobPosts/${jid}`);
        const data = await response.json();
        setJob(data);
        setLoading(false);
        // Set the applyFor field to the job title when job data is fetched
        setFormData((prevData) => ({
          ...prevData,
          applyFor: data.jobTitle || "Job Title Not Found",
        }));
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    if (jid) {
      fetchJobDetails();
    }
  }, [jid]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setApplicationStatus("Please upload your resume.");
      return;
    }

    const data = new FormData();
    data.append("resume", resume);
    data.append("jobDetails", JSON.stringify(formData));

    try {
      const response = await fetch("http://localhost:5000/api/submitApplication", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // setApplicationStatus("Application submitted successfully!");
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
            navigate("/Browsejobs"); // Redirect to home page
          }, 2000);
        
      } else {
        setApplicationStatus("Error submitting application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setApplicationStatus("Error submitting application.");
    }
  };

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="w-full flex flex-col">
      <MyNavbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Apply Now For Job Opening</h2>
        <p className="text-gray-700 mb-4">Fill in the following details that match your resume</p>
        <p className="text-red-600 mb-8">* All Fields are Necessary.</p>

        {/* Job Application Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-2 text-sm font-semibold">Full Name *</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-2 text-sm font-semibold">DOB *</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Qualification */}
          <div className="flex flex-col">
            <label htmlFor="qualification" className="mb-2 text-sm font-semibold">Qualification *</label>
            <input
              type="text"
              id="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Qualification"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="mb-2 text-sm font-semibold">Experience *</label>
            <input
              type="text"
              id="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Experience in Years"
              required
            />
          </div>

          {/* Present Employer */}
          <div className="flex flex-col">
            <label htmlFor="presentEmployer" className="mb-2 text-sm font-semibold">Present Employer *</label>
            <input
              type="text"
              id="presentEmployer"
              value={formData.presentEmployer}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Present Employer"
              required
            />
          </div>

          {/* Type of Industry */}
          <div className="flex flex-col">
            <label htmlFor="industry" className="mb-2 text-sm font-semibold">Type of Industry *</label>
            <input
              type="text"
              id="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CHEMICAL, ENGG, FMCG, etc."
              required
            />
          </div>

          {/* Present Salary */}
          <div className="flex flex-col">
            <label htmlFor="presentSalary" className="mb-2 text-sm font-semibold">Present Salary *</label>
            <input
              type="text"
              id="presentSalary"
              value={formData.presentSalary}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Annual CTC"
              required
            />
          </div>

          {/* Functional Role */}
          <div className="flex flex-col">
            <label htmlFor="functionalRole" className="mb-2 text-sm font-semibold">Functional Role *</label>
            <input
              type="text"
              id="functionalRole"
              value={formData.functionalRole}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Maintenance, QC, QA, etc."
              required
            />
          </div>

          {/* Present Location */}
          <div className="flex flex-col">
            <label htmlFor="presentLocation" className="mb-2 text-sm font-semibold">Present Location *</label>
            <input
              type="text"
              id="presentLocation"
              value={formData.presentLocation}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Present Location"
              required
            />
          </div>

          {/* Location Preference */}
          <div className="flex flex-col">
            <label htmlFor="locationPreference" className="mb-2 text-sm font-semibold">Location Preference *</label>
            <input
              type="text"
              id="locationPreference"
              value={formData.locationPreference}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Location Preference"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile *</label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Mobile"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-semibold">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Apply for */}
          <div className="flex flex-col">
            <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
            <input
              type="text"
              id="applyFor"
              value={formData.applyFor} // Display job title in the form
              readOnly
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col">
            <label htmlFor="resume" className="mb-2 text-sm font-semibold">Upload Resume *</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Application Status Message */}
        {applicationStatus && (
          <p className="text-center text-lg mt-4 text-green-500">{applicationStatus}</p>
        )}
          {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-teal-600">Application Submitted Successfully!</h2>
              <p className="text-gray-700 mt-2">Thank you for applying.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;
