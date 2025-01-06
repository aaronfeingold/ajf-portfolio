import React, { useState } from "react";

const ResumeDownload = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch("resume-worker.ajfeingold88.workers.dev");
      const data = await response.json();
      if (data.url) {
        // Redirect to the signed URL to download the file
        window.location.href = data.url;
      } else {
        console.error("Failed to fetch signed URL");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Preparing Download..." : "Download Resume"}
    </button>
  );
};

export default ResumeDownload;
