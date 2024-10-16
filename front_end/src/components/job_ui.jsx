import React from "react";
import { useNavigate } from "react-router-dom";



const JobUI = ({ job }) => {
  const navigate = useNavigate();
    console.log(job)
    return (
      <div className="w-full h-100">
<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-rows-2">
    <div
      key={job.jid}
      className="flex flex-col bg-white overflow-clip shadow-md rounded-lg justify-center items-center hover:shadow-lg"
      >
        <div className="justify-center">
      <img
        src="Job_image.jpg" // Placeholder image URL or job.companyLogo
        alt="Job"
        className="w-60 h-40 object-fit"
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
