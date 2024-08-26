import React, { useContext } from "react";
import { ResumeProvider, ResumeContext } from "./ResumeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";

const App = () => {
  const { resumeData, loading } = useContext(ResumeContext);

  return (
    <div className="App">
      {loading && <div className="loading-overlay">Loading...</div>}
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Footer data={resumeData.main} />
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
