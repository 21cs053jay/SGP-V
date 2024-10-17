import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import JobUI from './job_ui';  // Import the JobUI component for individual job display
import SearchNavbar from "./shared/search_navbar";

const JobTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {homeSearch} = useParams();

    useEffect(() => {
      if (homeSearch!==undefined) setSearchTerm(homeSearch);
    }, []);


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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredJobs = jobs.filter((job) => {
    const qualifications = job.qualification ? job.qualification.join(", ") : ''; 

    return (
      (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.keySkills && job.keySkills.toLowerCase().includes(searchTerm.toLowerCase())) ||
      // qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // (job.stream && job.stream.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobLocation &&
        job.jobLocation.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobLocation &&
        job.jobLocation.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      // (job.industryType && job.industryType.join(", ").toLowerCase().includes(searchTerm.toLowerCase())) ||
      // (job.experience &&
        (job.experience.min.toString().includes(searchTerm)) 
      //    job.experience.max.toString().includes(searchTerm))) ||
      // (job.jobDescription && job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="w-full flex flex-col" style={{ minHeight: "100vh", overflowY: "scroll" }}>
      {/* Pass handleSearchChange to SearchNavbar to update the search term */}
      <SearchNavbar onSearchChange={handleSearchChange} />

      <div className="flex items-stretch justify-center overflow-hidden pt-5">
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center align-middle items-stretch">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                console.log(job),
                <JobUI key={job.jid} job={job} /> // Pass the job object to the JobUI component
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
