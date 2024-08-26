import React from 'react';

const About = ({ data }) => {
  const { image, bio, email, resumeDownload } = data || {};

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
                <a
                  href={resumeDownload}
                  className="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-download"></i>Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
