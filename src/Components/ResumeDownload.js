import React, { useState } from "react";

const ResumeDownload = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_R2_WORKER_URL);
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
      <i className="fa fa-download"></i>{" "}
      {loading ? "Preparing Download..." : "Download Resume"}
    </button>
  );
};

export default ResumeDownload;
