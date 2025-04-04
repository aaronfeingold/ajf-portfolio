import React, { useContext, useEffect } from "react";
import { ResumeProvider, ResumeContext } from "./Components/ResumeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";
import wetWilly from "./ASCII/wetWilly";

const App = () => {
  const {
    resumeData: { main, resume, portfolio },
    loading,
  } = useContext(ResumeContext);

  useEffect(() => {
    console.log(wetWilly); // shout out to millennial s8rs
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <img
              src="/images/loader.gif"
              alt="Loading..."
              className="loading-gif"
            />
            <p>Loading awesome content...</p>
          </div>
        </div>
      )}
      <Header data={main} />
      <About data={main} />
      <Resume data={resume} />
      <Portfolio data={portfolio} />
      <Footer data={main} />
    </div>
  );
};

// Wrap App component with ResumeProvider
const AppWrapper = () => (
  <ResumeProvider>
    <App />
  </ResumeProvider>
);

export default AppWrapper;
