import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

const defaultResumeData = {
  main: {
    name: "Default Profile",
    backgroundImages: [
      "/images/header-bg.jpg",
      "/images/header-bg-1.jpg",
      "/images/header-bg-2.jpg",
    ],
    social: [
      {
        name: "antisocial",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418",
        classname: "fa-folder-open",
      },
    ],
  },
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

  const getStoredData = () => {
    try {
      const storedData = localStorage.getItem('resumeData');
      const storedTimestamp = localStorage.getItem('resumeDataTimestamp');

      if (storedData && storedTimestamp) {
        const isDataFresh = Date.now() - parseInt(storedTimestamp) < 24 * 60 * 60 * 1000;

        if (isDataFresh) {
          return setResumeData(JSON.parse(storedData));
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const getResumeData = async () => {
    if (getStoredData()) return;

    setLoading(true);
    try {
      const response = await fetch("resumeData.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();

      if (data.main && !data.main.backgroundImages) {
        data.main.backgroundImages = defaultResumeData.main.backgroundImages;
      }

      setResumeData(data);
      localStorage.setItem('resumeData', JSON.stringify(data));
      localStorage.setItem('resumeDataTimestamp', Date.now().toString());
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
