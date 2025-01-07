import React from 'react';
import ResumeDownload from "./ResumeDownload";

const About = ({ data }) => {
  const { image, bio, email } = data || {};

  let profilepic = `images/${image}`;

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src={profilepic}
            alt="Aaron Feingold Profile Pic"
          />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>
          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <ResumeDownload />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
