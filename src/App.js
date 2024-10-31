import React, { useContext } from "react";
import { ResumeProvider, ResumeContext } from "./Components/ResumeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";

const App = () => {
  const {
    resumeData: { main, resume, portfolio },
    loading,
  } = useContext(ResumeContext);

  return (
    <div className="App">
      {loading && <div className="loading-overlay">Loading...</div>}
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
