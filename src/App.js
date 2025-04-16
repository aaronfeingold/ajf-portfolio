import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ResumeProvider, ResumeContext } from "./Components/ResumeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio";
import ProjectDetail from "./Components/ProjectDetail";
import wetWilly from "./ASCII/wetWilly";

const MainContent = () => {
  const {
    resumeData: { main, resume, portfolio },
    loading,
  } = useContext(ResumeContext);

  useEffect(() => {
    console.log(wetWilly); // shout out to millennial s8rs
  }, []);

  return (
    <>
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
    </>
  );
};

const App = () => {
  return (
    <ResumeProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route path="/project/:projectId" component={ProjectDetail} />
          </Switch>
        </div>
      </Router>
    </ResumeProvider>
  );
};

export default App;
