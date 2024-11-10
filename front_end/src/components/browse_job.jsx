import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import JobUI from './job_ui'; // Enhanced JobUI component for job cards
import SearchNavbar from "./shared/search_navbar";

const JobTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { homeSearch } = useParams();

  useEffect(() => {
    if (homeSearch !== undefined) setSearchTerm(homeSearch);
  }, [homeSearch]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobPost/jobPosts");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
    const intervalId = setInterval(fetchJobs, 5000);
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
      (job.jobLocation && job.jobLocation.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobLocation && job.jobLocation.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.experience && job.experience.min.toString().includes(searchTerm))
    );
  });

  return (
    <div className="w-full flex flex-col min-h-screen overflow-y-auto bg-gray-100">
      <SearchNavbar onSearchChange={handleSearchChange} />
      <div className="flex items-center justify-center p-6">
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobUI key={job.jid} job={job} />
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