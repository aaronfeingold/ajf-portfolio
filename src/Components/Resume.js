import React from "react";

const Resume = ({ data }) => {
  const skillsMessage =
    data.skillsMessage ||
    "'I don't even have any good skills. You know, like nunchuck skills, bow hunting skills, computer hacking skills. [Employers] only want [employees] who have great skills!' \n - Napoleon Dynamite";

  const [message, quoteAuthor] = skillsMessage.split("\n");

  const educationList = Array.isArray(data.education)
    ? data.education.map((edu) => (
        <div key={edu.school}>
          <h3>{edu.school}</h3>
          <p className="info">
            {edu.degree} <span>&bull;</span>
            <em className="date">{edu.graduated}</em>
          </p>
        </div>
      ))
    : [];

  const workList = Array.isArray(data.work)
    ? data.work.map((job) => (
        <div key={job.company}>
          <h3>{job.company}</h3>
          <p className="info">
            {job.title}
            <span>&bull;</span> <em className="date">{job.years}</em>
            <span>&bull;</span> <em className="date">{job.location}</em>
          </p>
          <p>{job.description}</p>
        </div>
      ))
    : [];

  const skillsList = Array.isArray(data.skills)
    ? data.skills.map((skill) => {
        const className = `bar-expand ${skill.name.toLowerCase()}`;
        return (
          <li key={skill.name}>
            <span style={{ width: skill.level }} className={className}></span>
            <i className="fa fa-linkedin"></i>
            <em>{skill.desc}</em>
          </li>
        );
      })
    : [];

  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{educationList}</div>
          </div>
        </div>
      </div>
      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">{workList}</div>
      </div>
      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          <p>{message}</p>
          <p>{quoteAuthor}</p>
          <div className="bars">
            <ul className="skills">{skillsList}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
