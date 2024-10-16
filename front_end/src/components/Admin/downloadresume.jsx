import React from 'react';

const DownloadResumeButton = ({ resumeFileId }) => {
  const handleDownload = async () => {
    const response = await fetch(`/api/resume/${resumeFileId}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume_${resumeFileId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return <button onClick={handleDownload}>Download Resume</button>;
};

export default DownloadResumeButton;
