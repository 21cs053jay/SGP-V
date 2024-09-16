import React, { useState, useEffect } from "react";
import MyNavbar from "./shared/navbar";

const JobTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Function to fetch jobs from backend
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobpost");
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
    const qualifications = job.qualifications ? job.qualifications.join(", ") : '';
    
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

  const handleReadMore = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

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
          <div className="max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Job Title</th>
                  <th className="px-4 py-2 border">Key Skills</th>
                  <th className="px-4 py-2 border">Qualifications</th>
                  <th className="px-4 py-2 border">Stream</th>
                  <th className="px-4 py-2 border">Job Location</th>
                  <th className="px-4 py-2 border">Industry Type</th>
                  <th className="px-4 py-2 border">Experience</th>
                  <th className="px-4 py-2 border">Job Description</th>
                  <th className="px-4 py-2 border">Apply Now</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.jid}>
                      <td className="px-4 py-2 border">{job.jobTitle || 'N/A'}</td>
                      <td className="px-4 py-2 border">{job.keySkills || 'N/A'}</td>
                      <td className="px-4 py-2 border">{job.qualifications?.join(", ") || 'N/A'}</td>
                      <td className="px-4 py-2 border">{job.stream || 'N/A'}</td>
                      <td className="px-4 py-2 border">
                        {(job.jobLocation?.state || 'N/A')}, {(job.jobLocation?.city || 'N/A')}
                      </td>
                      <td className="px-4 py-2 border">{job.industryType?.join(", ") || 'N/A'}</td>
                      <td className="px-4 py-2 border">
                        {job.experience ? `${job.experience.min} - ${job.experience.max} years` : 'N/A'}
                      </td>
                      <td className="px-4 py-2 border">
                        {job.jobDescription?.length > 100 ? (
                          <div>
                            {job.jobDescription.substring(0, 100)}...
                            <button
                              onClick={() => handleReadMore(job)}
                              className="text-blue-500 underline ml-2"
                            >
                              Read more
                            </button>
                          </div>
                        ) : (
                          job.jobDescription || 'N/A'
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-2 border" colSpan="9">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{selectedJob.jobTitle}</h2>
            <p className="mb-4">{selectedJob.jobDescription}</p>
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTable;
