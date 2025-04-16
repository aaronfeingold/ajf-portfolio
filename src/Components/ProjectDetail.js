import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResumeContext } from './ResumeContext';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { resumeData } = useContext(ResumeContext);
  const project = resumeData?.portfolio?.projects?.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === projectId);

  if (!project) {
    return (
      <section id="project-detail" className="not-found">
        <div className="row">
          <div className="twelve columns">
            <h1>Project Not Found</h1>
            <Link to="/#portfolio" className="button">
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="project-detail">
      <div className="row">
        <div className="twelve columns">
          <h1>{project.title}</h1>
          <div className="project-content">
            <img src={`/images/portfolio/${project.image}`} alt={project.title} />
            <div className="project-description">
              <h2>About this Project</h2>
              <p>{project.category}</p>
              {/* More detailed content will be added later */}
              <div className="project-links">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="button">
                  View Live Project
                </a>
                <Link to="/#portfolio" className="button">
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
