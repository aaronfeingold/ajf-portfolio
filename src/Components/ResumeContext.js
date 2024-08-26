import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

const defaultResumeData = {
  main: {
    name: "Default Profile",
  },
  resume: {},
  resume: {
    education: [],
    work: [],
    skills: [],
  },
  portfolio: {
    projects: [],
  },
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [loading, setLoading] = useState(false);

  const getResumeData = async () => {
    setLoading(true);
    try {
      const response = await fetch("resumeData.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResumeData();
  }, []);

  return (
    <ResumeContext.Provider value={{ resumeData, loading }}>
      {children}
    </ResumeContext.Provider>
  );
};
