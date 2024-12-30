import React, { useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Resume = ({ data }) => {
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger animation when 10% of the bars section is visible
    triggerOnce: true, // Animation will only run once
  });

  const skillsMessage =
    data.skillsMessage || "Loose Yourself to Dance \n - Pharrell Williams";

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
        <div key={`${job.company}-${job.title}`}>
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

  const skillsList = useMemo(
    () =>
      Array.isArray(data.skills)
        ? data.skills.map((skill) => {
            const className = `bar-expand ${skill.name.toLowerCase()}`;
            console.log(`className: ${className}`);
            return (
              <li key={skill.name}>
                <span
                  style={{ width: skill.level }}
                  className={className}
                ></span>
                <em>{skill.desc}</em>
              </li>
            );
          })
        : [],
    [data.skills]
  );

  useEffect(() => {
    console.log("inView:", inView);
    console.log("ref:", ref.current);
    if (inView && ref.current) {
      const items = ref.current.querySelectorAll("li span");
      items.forEach((span) => {
        span.classList.add("animate");
      });
    }
  }, [ref, inView]);

  return (
    <section id="resume">
      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          <p>{message}</p>
          <p>{quoteAuthor}</p>
          <div className="bars" ref={ref}>
            <ul className="skills">{skillsList}</ul>
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
    </section>
  );
};

export default Resume;
