import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MyNavbar from "./shared/navbar";
import JobUI from './job_ui';  // Import the JobUI component for individual job display

const JobTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch jobs from backend
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobPosts");
        const data = await response.json();
        console.log(data); // Check the structure here
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    // Initial fetch of jobs
    fetchJobs();

    // Polling - Fetch jobs every 5 seconds
    const intervalId = setInterval(() => {
      fetchJobs();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const qualifications = job.qualification ? job.qualification.join(", ") : ''; 

    return (
      (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.keySkills && job.keySkills.toLowerCase().includes(searchTerm.toLowerCase())) ||
      qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.stream && job.stream.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobLocation &&
        job.jobLocation.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobLocation &&
        job.jobLocation.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.industryType && job.industryType.join(", ").toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.experience &&
        (job.experience.min.toString().includes(searchTerm) ||
         job.experience.max.toString().includes(searchTerm))) ||
      (job.jobDescription && job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="w-full flex flex-col" style={{ minHeight: "100vh", overflowY: "scroll" }}>
      <MyNavbar />

      <input
        type="text"
        placeholder="Search by Job Title, Location, Industry, etc."
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                console.log(job),
                <JobUI key={job.jid} job ={job} /> // Pass the job object to the JobUI component
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTable;
