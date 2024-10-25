import React from "react";
import { useNavigate } from "react-router-dom";



const JobUI = ({ job }) => {
  const navigate = useNavigate();
    console.log(job)
    return (
      <div className="w-80 h-100">
<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
    <div
      key={job.jid}
      className="flex flex-col bg-white overflow-auto shadow-md rounded-lg justify-center items-center hover:shadow-lg"
      >
        <div className="justify-center">
      <img
        src="https://5.imimg.com/data5/JG/BW/MY-64708915/jobs-in-greater-noida-500x500.jpg" // Placeholder image URL or job.companyLogo
        alt="Job"
        className="w-48 h-40 object-scale-fill"
        />
        </div>
      <div className="p-1">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{job.jobTitle}</h2>
        <p className="text-gray-600 text-md mb-2">{job.companyName}</p>
        <p className="text-gray-500 mb-1">{job.jobLocation.city}, {job.jobLocation.state}</p>
        <p className="text-gray-700 font-semibold mb-4">Salary: ₹{job.salary.min} - ₹{job.salary.max}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.jobDescription}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none" onClick={() => navigate(`/SubmitCV/${job.jid}`)} >
          Apply Now
        </button>
      </div>
    </div>
</div>
        </div>

      );
    };

export default JobUI;
