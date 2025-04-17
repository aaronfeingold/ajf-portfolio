import React, { useMemo, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const Resume = ({ data }) => {
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2, // Trigger animation when 10% of the bars section is visible
    triggerOnce: true, // Animation will only run once
  });

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

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

  const addSkillAnimation = (skillName, skillLevel) => {
    const keyframes = `
            @keyframes ${skillName} {
            0% { width: 0; }
            100% { width: ${skillLevel}; }
            }
        `;
    const styleSheet = Array.from(document.styleSheets).find(
      (sheet) => sheet.href && sheet.href.includes("layout.css")
    );
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  };

  const skillsList = useMemo(
    () =>
      Array.isArray(data.skills)
        ? data.skills.map((skill) => {
            const animationName = `${skill.name.toLowerCase()}-bar`;
            addSkillAnimation(animationName, skill.level);
            return (
              <li key={skill.name}>
                <span
                  style={{
                    width: skill.level,
                    animationName,
                  }}
                  className="bar-expand"
                ></span>
                <em>{skill.desc}</em>
              </li>
            );
          })
        : [],
    [data.skills]
  );

  useEffect(() => {
    if (inView && ref?.current) {
      const items = ref.current.querySelectorAll("li span");
      items.forEach((span) => {
        span.classList.add("animate");
      });
    }
  }, [ref, inView]);

  return (
    <section id="resume">


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
        <div className="nine columns main-col" ref={setRefs}>
          <p>{message}</p>
          <p>{quoteAuthor}</p>
          <div className="bars">
            <ul className="skills">{skillsList}</ul>
          </div>
        </div>
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
