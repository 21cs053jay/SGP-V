// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Assuming you use React Router for routing
// import MyNavbar from "./shared/navbar";

// const JobApplicationForm = () => {
//   const { jid } = useParams(); // Get job ID from the URL parameters
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch job details based on jid
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/jobpost/${jid}`);
//         const data = await response.json();
//         setJob(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching job details:", error);
//         setLoading(false);
//       }
//     };

//     if (jid) {
//       fetchJobDetails();
//     }
//   }, [jid]);

//   if (loading) {
//     return <p>Loading job details...</p>;
//   }

//   if (!job) {
//     return <p>Job not found.</p>;
//   }

//   return (
//     <div className="w-full flex flex-col">
//       <MyNavbar />
//       <div className="max-w-5xl mx-auto px-4 py-10">
//         <h2 className="text-2xl font-semibold text-blue-600 mb-2">Apply Now For Job Opening</h2>
//         <p className="text-gray-700 mb-4">Fill the following details that match your resume</p>
//         <p className="text-red-600 mb-8">* All Fields are Necessary.</p>

//         {/* Job Application Form */}
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div className="flex flex-col">
//             <label htmlFor="fullName" className="mb-2 text-sm font-semibold">Full Name *</label>
//             <input
//               type="text"
//               id="fullName"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Name"
//               required
//             />
//           </div>

//           {/* Date of Birth */}
//           <div className="flex flex-col">
//             <label htmlFor="dob" className="mb-2 text-sm font-semibold">DOB *</label>
//             <input
//               type="date"
//               id="dob"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Qualification */}
//           <div className="flex flex-col">
//             <label htmlFor="qualification" className="mb-2 text-sm font-semibold">Qualification *</label>
//             <input
//               type="text"
//               id="qualification"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Qualification"
//               required
//             />
//           </div>

//           {/* Experience */}
//           <div className="flex flex-col">
//             <label htmlFor="experience" className="mb-2 text-sm font-semibold">Experience *</label>
//             <input
//               type="text"
//               id="experience"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Experience in Years"
//               required
//             />
//           </div>

//           {/* Present Employer */}
//           <div className="flex flex-col">
//             <label htmlFor="presentEmployer" className="mb-2 text-sm font-semibold">Present Employer *</label>
//             <input
//               type="text"
//               id="presentEmployer"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Present Employer"
//               required
//             />
//           </div>

//           {/* Type of Industry */}
//           <div className="flex flex-col">
//             <label htmlFor="industry" className="mb-2 text-sm font-semibold">Type of Industry *</label>
//             <input
//               type="text"
//               id="industry"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., CHEMICAL, ENGG, FMCG, etc."
//               required
//             />
//           </div>

//           {/* Present Salary */}
//           <div className="flex flex-col">
//             <label htmlFor="presentSalary" className="mb-2 text-sm font-semibold">Present Salary *</label>
//             <input
//               type="text"
//               id="presentSalary"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Annual CTC"
//               required
//             />
//           </div>

//           {/* Functional Role */}
//           <div className="flex flex-col">
//             <label htmlFor="functionalRole" className="mb-2 text-sm font-semibold">Functional Role *</label>
//             <input
//               type="text"
//               id="functionalRole"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Maintenance, QC, QA, etc."
//               required
//             />
//           </div>

//           {/* Present Location */}
//           <div className="flex flex-col">
//             <label htmlFor="presentLocation" className="mb-2 text-sm font-semibold">Present Location *</label>
//             <input
//               type="text"
//               id="presentLocation"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Present Location"
//               required
//             />
//           </div>

//           {/* Location Preference */}
//           <div className="flex flex-col">
//             <label htmlFor="locationPreference" className="mb-2 text-sm font-semibold">Location Preference *</label>
//             <input
//               type="text"
//               id="locationPreference"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Location Preference"
//               required
//             />
//             <small className="text-gray-500 mt-1">(You can add more than one city by adding commas.)</small>
//           </div>

//           {/* Mobile */}
//           <div className="flex flex-col">
//             <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile *</label>
//             <input
//               type="text"
//               id="mobile"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., [0] - [9999999999]"
//               required
//             />
//           </div>

//           {/* E-Mail */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-2 text-sm font-semibold">E-Mail *</label>
//             <input
//               type="email"
//               id="email"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Email"
//               required
//             />
//           </div>

//           {/* Apply For - Pre-filled with the Job Title */}
//           <div className="flex flex-col">
//             <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
//             <input
//               type="text"
//               id="applyFor"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={job.jobTitle || "Job Title Not Found"}
//               readOnly
//             />
//           </div>

//           {/* CV Upload */}
//           <div className="md:col-span-2 flex flex-col items-center justify-center">
//             <label htmlFor="cvUpload" className="mb-2 text-sm font-semibold">CV Upload *</label>
//             <input
//               type="file"
//               id="cvUpload"
//               className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               accept=".pdf"
//               required
//             />
//             <small className="text-gray-500 mt-1">Only pdf files are allowed. (Maximum 5 MB)</small>
//           </div>

//           {/* Submit Button */}
//           <div className="md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="w-48 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
//             >
//               Apply Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "./shared/navbar";

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
  });
  const [applicationStatus, setApplicationStatus] = useState("");

  // Fetch job details based on jid
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobPosts/${jid}`);
        const data = await response.json();
        setJob(data);
        setLoading(false);
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
        setApplicationStatus("Application submitted successfully!");
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
            <small className="text-gray-500 mt-1">(You can add more than one city by adding commas.)</small>
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
              placeholder="e.g., [0] - [9999999999]"
              required
            />
          </div>

          {/* E-Mail */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-semibold">E-Mail *</label>
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

          {/* Apply For - Pre-filled with the Job Title */}
          <div className="flex flex-col">
            <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
            <input
              type="text"
              id="applyFor"
              value={job.jobTitle || "Job Title Not Found"}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>

          {/* CV Upload */}
          <div className="md:col-span-2 flex flex-col items-center justify-center">
            <label htmlFor="cvUpload" className="mb-2 text-sm font-semibold">CV Upload *</label>
            <input
              type="file"
              id="cvUpload"
              onChange={handleResumeChange}
              className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept=".pdf"
              required
            />
            <small className="text-gray-500 mt-1">Only pdf files are allowed. (Maximum 5 MB)</small>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-48 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Apply Now
            </button>
          </div>
        </form>
        {applicationStatus && <p className="mt-4 text-red-600">{applicationStatus}</p>}
      </div>
    </div>
  );
};

export default JobApplicationForm;
