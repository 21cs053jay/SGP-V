// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MyNavbar from "./shared/navbar";
// import { useNavigate } from "react-router-dom";

// const JobApplicationForm = () => {
//   const { jid } = useParams(); // Get job ID from the URL parameters
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [resume, setResume] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     qualification: "",
//     experience: "",
//     presentEmployer: "",
//     industry: "",
//     presentSalary: "",
//     functionalRole: "",
//     presentLocation: "",
//     locationPreference: "",
//     mobile: "",
//     email: "",
//     applyFor: "", // Added applyFor to formData
//   });
//   const [applicationStatus, setApplicationStatus] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const navigate = useNavigate();

//   // Fetch job details based on jid
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/jobPosts/${jid}`);
//         const data = await response.json();
//         setJob(data);
//         setLoading(false);
//         // Set the applyFor field to the job title when job data is fetched
//         setFormData((prevData) => ({
//           ...prevData,
//           applyFor: data.jobTitle || "Job Title Not Found",
//         }));
//       } catch (error) {
//         console.error("Error fetching job details:", error);
//         setLoading(false);
//       }
//     };

//     if (jid) {
//       fetchJobDetails();
//     }
//   }, [jid]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleResumeChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       setApplicationStatus("Please upload your resume.");
//       return;
//     }

//     const data = new FormData();
//     data.append("resume", resume);
//     data.append("jobDetails", JSON.stringify(formData));

//     try {
//       const response = await fetch("http://localhost:5000/api/submitApplication", {
//         method: "POST",
//         body: data,
//       });

//       if (response.ok) {
//         // setApplicationStatus("Application submitted successfully!");
//         setIsModalOpen(true);
//         setTimeout(() => {
//             setIsModalOpen(false);
//             navigate("/Browsejobs"); // Redirect to home page
//           }, 2000);
        
//       } else {
//         setApplicationStatus("Error submitting application.");
//       }
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       setApplicationStatus("Error submitting application.");
//     }
//   };

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
//         <p className="text-gray-700 mb-4">Fill in the following details that match your resume</p>
//         <p className="text-red-600 mb-8">* All Fields are Necessary.</p>

//         {/* Job Application Form */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div className="flex flex-col">
//             <label htmlFor="fullName" className="mb-2 text-sm font-semibold">Full Name *</label>
//             <input
//               type="text"
//               id="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
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
//               value={formData.dob}
//               onChange={handleInputChange}
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
//               value={formData.qualification}
//               onChange={handleInputChange}
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
//               value={formData.experience}
//               onChange={handleInputChange}
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
//               value={formData.presentEmployer}
//               onChange={handleInputChange}
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
//               value={formData.industry}
//               onChange={handleInputChange}
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
//               value={formData.presentSalary}
//               onChange={handleInputChange}
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
//               value={formData.functionalRole}
//               onChange={handleInputChange}
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
//               value={formData.presentLocation}
//               onChange={handleInputChange}
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
//               value={formData.locationPreference}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Location Preference"
//               required
//             />
//           </div>

//           {/* Mobile */}
//           <div className="flex flex-col">
//             <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile *</label>
//             <input
//               type="text"
//               id="mobile"
//               value={formData.mobile}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Mobile"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-2 text-sm font-semibold">Email *</label>
//             <input
//               type="email"
//               id="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Email"
//               required
//             />
//           </div>

//           {/* Apply for */}
//           <div className="flex flex-col">
//             <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
//             <input
//               type="text"
//               id="applyFor"
//               value={formData.applyFor} // Display job title in the form
//               readOnly
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Resume Upload */}
//           <div className="flex flex-col">
//             <label htmlFor="resume" className="mb-2 text-sm font-semibold">Upload Resume *</label>
//             <input
//               type="file"
//               id="resume"
//               accept=".pdf,.doc,.docx"
//               onChange={handleResumeChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-1 md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-3 px-8 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
//             >
//               Submit Application
//             </button>
//           </div>
//         </form>

//         {/* Application Status Message */}
//         {applicationStatus && (
//           <p className="text-center text-lg mt-4 text-green-500">{applicationStatus}</p>
//         )}
//           {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold text-teal-600">Application Submitted Successfully!</h2>
//               <p className="text-gray-700 mt-2">Thank you for applying.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import MyNavbar from "./shared/navbar";

// const JobApplicationForm = () => {
//   const { jid } = useParams(); // Get job ID from the URL parameters
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [resume, setResume] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     qualification: "",
//     experience: "",
//     presentEmployer: "",
//     industry: "",
//     presentSalary: "",
//     functionalRole: "",
//     presentLocation: "",
//     locationPreference: "",
//     mobile: "",
//     email: "",
//     applyFor: "", // Job title will be set when job data is fetched
//   });
//   const [applicationStatus, setApplicationStatus] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   // Fetch job details based on jid
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/jobPosts/${jid}`);
//         const data = await response.json();
//         setJob(data);
//         setLoading(false);
//         setFormData((prevData) => ({
//           ...prevData,
//           applyFor: data.jobTitle || "Job Title Not Found",
//         }));
//       } catch (error) {
//         console.error("Error fetching job details:", error);
//         setLoading(false);
//         setApplicationStatus("Error fetching job details.");
//       }
//     };

//     if (jid) {
//       fetchJobDetails();
//     }
//   }, [jid]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleResumeChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       setApplicationStatus("Please upload your resume.");
//       return;
//     }

//     const data = new FormData();
//     data.append("resume", resume);
//     data.append("jobDetails", JSON.stringify(formData));

//     try {
//       const response = await fetch("http://localhost:5000/api/submitApplication", {
//         method: "POST",
//         body: data,
//       });

//       if (response.ok) {
//         setIsModalOpen(true);
//         setTimeout(() => {
//           setIsModalOpen(false);
//           navigate("/Browsejobs");
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         setApplicationStatus(`Error submitting application: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       setApplicationStatus("Error submitting application.");
//     }
//   };

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
//         <p className="text-gray-700 mb-4">Fill in the following details that match your resume</p>
//         <p className="text-red-600 mb-8">* All Fields are Necessary.</p>

//         {/* Job Application Form */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div className="flex flex-col">
//             <label htmlFor="fullName" className="mb-2 text-sm font-semibold">Full Name *</label>
//             <input
//               type="text"
//               id="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Name"
//               required
//             />
//           </div>

        //   {/* Date of Birth */}
        //   <div className="flex flex-col">
        //     <label htmlFor="dob" className="mb-2 text-sm font-semibold">DOB *</label>
        //     <input
        //       type="date"
        //       id="dob"
        //       value={formData.dob}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       required
        //     />
        //   </div>

        //   {/* Qualification */}
        //   <div className="flex flex-col">
        //     <label htmlFor="qualification" className="mb-2 text-sm font-semibold">Qualification *</label>
        //     <input
        //       type="text"
        //       id="qualification"
        //       value={formData.qualification}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Qualification"
        //       required
        //     />
        //   </div>

        //   {/* Experience */}
        //   <div className="flex flex-col">
        //     <label htmlFor="experience" className="mb-2 text-sm font-semibold">Experience *</label>
        //     <input
        //       type="text"
        //       id="experience"
        //       value={formData.experience}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Experience in Years"
        //       required
        //     />
        //   </div>

        //   {/* Present Employer */}
        //   <div className="flex flex-col">
        //     <label htmlFor="presentEmployer" className="mb-2 text-sm font-semibold">Present Employer *</label>
        //     <input
        //       type="text"
        //       id="presentEmployer"
        //       value={formData.presentEmployer}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Present Employer"
        //       required
        //     />
        //   </div>

        //   {/* Type of Industry */}
        //   <div className="flex flex-col">
        //     <label htmlFor="industry" className="mb-2 text-sm font-semibold">Type of Industry *</label>
        //     <input
        //       type="text"
        //       id="industry"
        //       value={formData.industry}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="e.g., CHEMICAL, ENGG, FMCG, etc."
        //       required
        //     />
        //   </div>

        //   {/* Present Salary */}
        //   <div className="flex flex-col">
        //     <label htmlFor="presentSalary" className="mb-2 text-sm font-semibold">Present Salary *</label>
        //     <input
        //       type="text"
        //       id="presentSalary"
        //       value={formData.presentSalary}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Annual CTC"
        //       required
        //     />
        //   </div>

        //   {/* Functional Role */}
        //   <div className="flex flex-col">
        //     <label htmlFor="functionalRole" className="mb-2 text-sm font-semibold">Functional Role *</label>
        //     <input
        //       type="text"
        //       id="functionalRole"
        //       value={formData.functionalRole}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="e.g., Maintenance, QC, QA, etc."
        //       required
        //     />
        //   </div>

        //   {/* Present Location */}
        //   <div className="flex flex-col">
        //     <label htmlFor="presentLocation" className="mb-2 text-sm font-semibold">Present Location *</label>
        //     <input
        //       type="text"
        //       id="presentLocation"
        //       value={formData.presentLocation}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Present Location"
        //       required
        //     />
        //   </div>

        //   {/* Location Preference */}
        //   <div className="flex flex-col">
        //     <label htmlFor="locationPreference" className="mb-2 text-sm font-semibold">Location Preference *</label>
        //     <input
        //       type="text"
        //       id="locationPreference"
        //       value={formData.locationPreference}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Location Preference"
        //       required
        //     />
        //   </div>

        //   {/* Mobile */}
        //   <div className="flex flex-col">
        //     <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile *</label>
        //     <input
        //       type="text"
        //       id="mobile"
        //       value={formData.mobile}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Mobile Number"
        //       required
        //     />
        //   </div>

        //   {/* Email */}
        //   <div className="flex flex-col">
        //     <label htmlFor="email" className="mb-2 text-sm font-semibold">Email *</label>
        //     <input
        //       type="email"
        //       id="email"
        //       value={formData.email}
        //       onChange={handleInputChange}
        //       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter Email"
        //       required
        //     />
        //   </div>

        //     {/* Apply for */}
        //    <div className="flex flex-col">
        //     <label htmlFor="applyFor" className="mb-2 text-sm font-semibold">Apply For *</label>
        //      <input
        //        type="text"
        //        id="applyFor"
        //        value={formData.applyFor} // Display job title in the form
        //        readOnly
        //        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //        required
        //      />
        //    </div>

//           {/* Resume Upload */}
//           <div className="flex flex-col">
//             <label htmlFor="resume" className="mb-2 text-sm font-semibold">Upload Resume *</label>
//             <input
//               type="file"
//               id="resume"
//               accept=".pdf,.doc,.docx"
//               onChange={handleResumeChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-1 md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-3 px-8 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
//             >
//               Submit Application
//             </button>
//           </div>
//         </form>

//         {/* Application Status Message */}
//         {applicationStatus && (
//           <p className="text-center text-lg mt-4 text-red-500">{applicationStatus}</p>
//         )}

//         {/* Success Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold text-teal-600">Application Submitted Successfully!</h2>
//               <p className="text-gray-700 mt-2">Thank you for applying.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MyNavbar from "./shared/navbar";

const JobApplicationForm = () => {
  const { jid } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [page, setPage] = useState(1);
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
    applyFor: "",
  });
  const [applicationStatus, setApplicationStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobPost/jobPosts/${jid}`);
        const data = response.data;
        setJob(data);
        setLoading(false);
        setFormData((prevData) => ({
          ...prevData,
          applyFor: data.jobTitle || "Job Title Not Found",
        }));
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
        setApplicationStatus("Error fetching job details.");
      }
    };

    if (jid) fetchJobDetails();
  }, [jid]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => prevPage - 1);

  const handleFileChange = (e) => setResume(e.target.files[0]); // Set resume file

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
      const response = await axios.post("http://localhost:5000/api/apply/submitApplication", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/Browsejobs");
        }, 2000);
      } else {
        setApplicationStatus(`Error submitting application: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setApplicationStatus("Error submitting application.");
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MyNavbar />
      <div className="max-w-3xl mx-auto px-6 py-7 bg-white shadow-2xl rounded-lg mt-5">
        <h2 className="text-3xl font-semibold text-purple-600 text-center mb-1">Job Application Form</h2>
        <h6 className="text-sm text-orange-500 font-semibold text-gray-700 mb-4">* indicates Mandatory Fields</h6>

        {page === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-6">Step 1 of 2: Personal Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="mb-2 text-sm font-medium text-gray-700">Full Name *</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dob" className="mb-2 text-sm font-medium text-gray-700">Date of Birth *</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="qualification" className="mb-2 text-sm font-medium text-gray-700">Qualification *</label>
                <input type="text" id="qualification" value={formData.qualification} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile" className="mb-2 text-sm font-medium text-gray-700">Mobile *</label>
                <input type="tel" id="mobile" value={formData.mobile} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email *</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="resume" className="mb-2 text-sm font-medium text-gray-700">Upload Resume *</label>
                <input type="file" id="resume" onChange={handleFileChange} className="p-3 w-52 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
            </form>
            <div className="flex justify-end mt-8">
              <button onClick={handleNextPage} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 shadow-lg hover:shadow-2xl rounded-lg transition-all duration-200 shadow-md">Next</button>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-6">Step 2 of 2: Job Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="experience" className="mb-2 text-sm font-medium text-gray-700">Experience (in Years)*</label>
                <input type="Number" id="experience" value={formData.experience} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="presentEmployer" className="mb-2 text-sm font-medium text-gray-700">Present Employer *</label>
                <input type="text" id="presentEmployer" value={formData.presentEmployer} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="industry" className="mb-2 text-sm font-medium text-gray-700">Industry *</label>
                <input type="text" id="industry" value={formData.industry} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
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
              <div className="flex flex-col">
                <label htmlFor="applyFor" className="mb-2 text-sm font-medium text-gray-700">Apply For *</label>
                <input type="text" id="applyFor" value={formData.applyFor} onChange={handleInputChange} className="p-3 border shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" disabled />
              </div>
            </form>
            <div className="flex justify-between mt-8">
              <button onClick={handlePreviousPage} className="bg-gray-500 shadow-lg hover:shadow-2xl hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-all duration-200 shadow-md">Previous</button>
              <button onClick={handleSubmit} className="bg-purple-500 shadow-lg hover:shadow-2xl hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-all duration-200 shadow-md">Submit</button>
            </div>
          </>
        )}

        {applicationStatus && <p className="text-red-600 mt-6">{applicationStatus}</p>}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold text-green-600">Application submitted successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;

