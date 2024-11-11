import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Listings", 10, 10); // Positioned title closer to center
  
    // Define column widths and styles to prevent text overflow
    doc.autoTable({
      head: [
        [
          "Job Title",
          "Key Skill",
          "Qualification",
          "Stream",
          "Industry Type",
          "Posted By",
          "Job Location",
          "Salary Range",
          "Experience",
          "Job Description",
          "Posted On",
        ],
      ],
      body: jobPosts.map((job) => [
        job.jobTitle,
        job.keySkills || "N/A",
        job.qualification || "N/A",
        job.stream || "N/A",
        job.industryType || "N/A",
        job.postedBy || "N/A",
        `${job.jobLocation?.city}, ${job.jobLocation?.state}` || "N/A",
        `${job.salary?.min}\n${job.salary?.max}` || "N/A", // Split Salary Range into two rows
        `${job.experience?.min} - ${job.experience?.max} years` || "N/A",
        job.jobDescription || "N/A",
        new Date(job.createdAt).toLocaleString(),
      ]),
      startY: 20,
      margin: { left: 2, right: 2 }, // Set equal margins on both sides
      styles: {
        fontSize: 8,
        cellPadding: 1, // Reduced padding for a tighter fit
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Job Title
        1: { cellWidth: 17 }, // Key Skill
        2: { cellWidth: 20 }, // Qualification
        3: { cellWidth: 20 }, // Stream
        4: { cellWidth: 20 }, // Industry Type
        5: { cellWidth: 15 }, // Posted By
        6: { cellWidth: 20 }, // Job Location
        7: { cellWidth: 20 }, // Salary Range (splits into two rows)
        8: { cellWidth: 20 }, // Experience
        9: { cellWidth: 20 }, // Job Description
        10: { cellWidth: 15 }, // Posted On
      },
      didDrawCell: (data) => {
        // Ensures text wraps correctly in Job Description column
        if (data.section === 'body' && data.column.dataKey === 9) {
          data.cell.styles.lineHeight = 1.5;
        }
      }
    });
  
    doc.save("job_listings.pdf");
  };
  
  const downloadCSV = () => {
    const csvData = [
      [
        "Job Title",
        "Key Skill",
        "Qualification",
        "Stream",
        "Industry Type",
        "Posted By",
        "Job Location",
        "Salary Range",
        "Experience",
        "Job Description",
        "Posted On",
      ],
      ...jobPosts.map((job) => [
        job.jobTitle,
        job.keySkills || "N/A",
        job.qualification || "N/A",
        job.stream || "N/A",
        job.industryType || "N/A",
        job.postedBy || "N/A",
        `${job.jobLocation?.city}, ${job.jobLocation?.state}` || "N/A",
        `${job.salary?.min} - ${job.salary?.max}` || "N/A",
        `${job.experience?.min} - ${job.experience?.max} years` || "N/A",
        job.jobDescription || "N/A",
        new Date(job.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const csvFile = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvFile);
    link.download = "job_listings.csv";
    link.click();
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

        {/* Filter, Search, and Download Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
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

          <div className="flex space-x-4">
            <button
              onClick={downloadPDF}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download PDF
            </button>
            <button
              onClick={downloadCSV}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Job Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-2">Job Title</th>
                <th className="border border-gray-300 p-2">Posted By</th>
                <th className="border border-gray-300 p-2">Posted On</th>
                <th className="border border-gray-300 p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((job, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{job.jobTitle}</td>
                  <td className="border border-gray-300 p-2">{job.postedBy}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-center flex justify-center">
  <button
    onClick={() => handleShowDetails(job)}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
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

        {/* Job Details Popup */}
        {showPopup && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold mb-4">{selectedJob.jobTitle}</h2>
              <p><strong>Key Skill:</strong> {selectedJob.keySkills || "N/A"}</p>
              <p><strong>Qualification:</strong> {selectedJob.qualification || "N/A"}</p>
              <p><strong>Stream:</strong> {selectedJob.stream || "N/A"}</p>
              <p><strong>Industry Type:</strong> {selectedJob.industryType || "N/A"}</p>
              <p><strong>Posted By:</strong> {selectedJob.postedBy || "N/A"}</p>
              <p>
                <strong>Location:</strong>{" "}
                {selectedJob.jobLocation
                  ? `${selectedJob.jobLocation.city}, ${selectedJob.jobLocation.state}`
                  : "N/A"}
              </p>
              <p>
                <strong>Salary Range:</strong>{" "}
                {selectedJob.salary
                  ? `${selectedJob.salary.min} - ${selectedJob.salary.max}`
                  : "N/A"}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {selectedJob.experience
                  ? `${selectedJob.experience.min} - ${selectedJob.experience.max} years`
                  : "N/A"}
              </p>
              <p><strong>Job Description:</strong> {selectedJob.jobDescription || "N/A"}</p>
              <p>
                <strong>Posted On:</strong>{" "}
                {new Date(selectedJob.createdAt).toLocaleString()}
              </p>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
