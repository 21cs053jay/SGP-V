import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideNavBar";
import { FaSearch, FaInfoCircle } from "react-icons/fa"; // Import icons

const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to latest first
  const [filterType, setFilterType] = useState(""); // State for dropdown filters

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobPosts");
        const sortedJobs = sortJobs(response.data, "desc");
        setJobPosts(sortedJobs);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job posts");
        setLoading(false);
      }
    };
    fetchJobPosts();
  }, []);

  const sortJobs = (jobs, order) => {
    return jobs.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
    const now = new Date();
    let filteredJobs = [];
    if (filter === "week") {
      const lastWeek = new Date(now.setDate(now.getDate() - 7));
      filteredJobs = jobPosts.filter((job) => new Date(job.createdAt) >= lastWeek);
    } else if (filter === "month") {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      filteredJobs = jobPosts.filter((job) => new Date(job.createdAt) >= lastMonth);
    } else {
      filteredJobs = jobPosts;
    }
    const sortedFilteredJobs = sortJobs(filteredJobs, sortOrder);
    setJobPosts(sortedFilteredJobs);
  };

  const handleSearchChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchDate) {
      const filteredJobs = jobPosts.filter(
        (job) => new Date(job.createdAt).toISOString().split("T")[0] === searchDate
      );
      setJobPosts(sortJobs(filteredJobs, sortOrder));
    } else {
      setJobPosts(sortJobs(jobPosts, sortOrder));
    }
  };

  const handleShowDetails = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  if (loading) {
    return <p>Loading job posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex h-screen">
      {/* Left SideNav */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-8 pb-2 border-b text-gray-700">
          All Job Postings
        </h1>

        {/* Filter and Search */}
        <div className="flex justify-end items-center space-x-4 mb-4">
          <div className="relative inline-block text-left">
            <select
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-md hover:bg-gray-300 focus:outline-none"
            >
              <option value="">Default</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div className="flex items-center bg-white shadow-md p-2 rounded">
            <input
              type="date"
              value={searchDate}
              onChange={handleSearchChange}
              className="border border-gray-300 p-2 rounded"
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 ml-2 flex items-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Job Cards as Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-2">Job Title</th>
                <th className="border border-gray-300 p-2">Posted By</th>
                <th className="border border-gray-300 p-2">Posted On</th>
                <th className="border border-gray-300 p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((job, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{job.jobTitle}</td>
                  <td className="border border-gray-300 p-2">{job.postedBy}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(job.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    <button
                      onClick={() => handleShowDetails(job)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                    >
                      <FaInfoCircle className="mr-2" />
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Job Details */}
      {showPopup && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Job Details</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Job Title:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.jobTitle}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Key Skill:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.keySkills}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Qualification:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.qualification}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Stream:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.stream}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Industry Type:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.industryType}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Posted By:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.postedBy}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Job Location:</strong></td>
                  <td className="border border-gray-300 p-2">
                    {selectedJob.jobLocation.city}, {selectedJob.jobLocation.state}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Salary Range:</strong></td>
                  <td className="border border-gray-300 p-2">
                    {selectedJob.salary.min} - {selectedJob.salary.max}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Experience:</strong></td>
                  <td className="border border-gray-300 p-2">
                    {selectedJob.experience.min} - {selectedJob.experience.max} years
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"><strong>Job Description:</strong></td>
                  <td className="border border-gray-300 p-2">{selectedJob.jobDescription}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
