import React, { useState, useEffect } from "react";
import MyNavbar from "./shared/navbar";

const JobTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://api.example.com/jobs");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keyskills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.industryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.areaOfWork.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.experienceFrom.toString().includes(searchTerm) ||
      job.experienceTo.toString().includes(searchTerm) ||
      job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleReadMore = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    // <div className="container mx-auto p-6" style={{ minHeight: "100vh", overflowY: "scroll" }}>
       <div className='w-full flex flex-col' style={{ minHeight: "100vh", overflowY: "scroll" }}>
       <MyNavbar/>

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
                  <th className="px-4 py-2 border">Keyskills</th>
                  <th className="px-4 py-2 border">Qualifications</th>
                  <th className="px-4 py-2 border">Stream</th>
                  <th className="px-4 py-2 border">Job Location</th>
                  <th className="px-4 py-2 border">Industry Type</th>
                  <th className="px-4 py-2 border">Area Of Work</th>
                  <th className="px-4 py-2 border">Experience From</th>
                  <th className="px-4 py-2 border">Experience To</th>
                  <th className="px-4 py-2 border">Job Description</th>
                  <th className="px-4 py-2 border">Apply Now</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{job.jobTitle}</td>
                      <td className="px-4 py-2 border">{job.keyskills}</td>
                      <td className="px-4 py-2 border">{job.qualifications}</td>
                      <td className="px-4 py-2 border">{job.stream}</td>
                      <td className="px-4 py-2 border">{job.jobLocation}</td>
                      <td className="px-4 py-2 border">{job.industryType}</td>
                      <td className="px-4 py-2 border">{job.areaOfWork}</td>
                      <td className="px-4 py-2 border">{job.experienceFrom}</td>
                      <td className="px-4 py-2 border">{job.experienceTo}</td>
                      <td className="px-4 py-2 border">
                        {job.jobDescription.length > 100 ? (
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
                          job.jobDescription
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
                    <td className="px-4 py-2 border" colSpan="11">
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
