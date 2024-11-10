// DownloadResumeButton.js
import React from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

const DownloadResumeButton = ({ resumeFileId }) => {
  const downloadResume = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/resumes/${resumeFileId}`, {
        responseType: "blob", // Ensures file is returned as a blob
      });
      
      // Check if the response has data before proceeding
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `resume-${resumeFileId}.pdf`); // Set the file name here
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error("No data found for the resume download.");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again later.");
    }
  };

  return (
    <button
      className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-all"
      onClick={downloadResume}
    >
      <FaDownload className="mr-2" />
      Download
    </button>
  );
};

export default DownloadResumeButton;
