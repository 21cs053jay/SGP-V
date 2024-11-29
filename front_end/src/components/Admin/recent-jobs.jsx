import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaInfoCircle, FaTimes } from "react-icons/fa";
import Sidebar from './SideNavBar';


const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobPost/jobPosts");
        const sortedJobs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobPosts(sortedJobs);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job posts");
        setLoading(false);
      }
    };
    fetchJobPosts();
  }, []);

  const handleFilterChange = (filter) => {
    const now = new Date();
    let filteredJobs = jobPosts;
    
    if (filter === "week") {
      const lastWeek = new Date(now.setDate(now.getDate() - 7));
      filteredJobs = jobPosts.filter((job) => new Date(job.createdAt) >= lastWeek);
    } else if (filter === "month") {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      filteredJobs = jobPosts.filter((job) => new Date(job.createdAt) >= lastMonth);
    }
    
    setJobPosts(filteredJobs);
    setFilterType(filter);
  };

  const handleSearchSubmit = () => {
    if (searchDate) {
      const filteredJobs = jobPosts.filter(
        (job) => new Date(job.createdAt).toISOString().split("T")[0] === searchDate
      );
      setJobPosts(filteredJobs);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-screen">
      <Sidebar/>
    <div className="flex-1  bg-gradient-to-br from-indigo-50 to-purple-100 p-8 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header and Filters */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Postings</h1>
          
          <div className="flex space-x-4">
            <select 
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Jobs</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSearchSubmit}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {jobPosts.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 hover:bg-indigo-50/50 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.jobTitle}</h2>
                    <div className="text-sm text-gray-600 space-x-4">
                      <span>{job.postedBy}</span>
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
                  >
                    <FaInfoCircle className="mr-2" /> Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedJob.jobTitle}</h2>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {[
                  { label: "Key Skill", value: selectedJob.keySkills },
                  { label: "Qualification", value: selectedJob.qualification },
                  { label: "Stream", value: selectedJob.stream },
                  { label: "Industry Type", value: selectedJob.industryType },
                  { label: "Posted By", value: selectedJob.postedBy },
                  { 
                    label: "Job Location", 
                    value: `${selectedJob.jobLocation.city}, ${selectedJob.jobLocation.state}` 
                  },
                  { 
                    label: "Salary Range", 
                    value: `${selectedJob.salary.min} - ${selectedJob.salary.max}` 
                  },
                  { 
                    label: "Experience", 
                    value: `${selectedJob.experience.min} - ${selectedJob.experience.max} years` 
                  },
                ].map((detail) => (
                  <div key={detail.label} className="flex justify-between border-b pb-2 last:border-b-0">
                    <span className="font-semibold text-gray-700">{detail.label}:</span>
                    <span className="text-gray-600">{detail.value}</span>
                  </div>
                ))}
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Job Description</h3>
                  <p className="text-gray-600">{selectedJob.jobDescription}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default JobList;