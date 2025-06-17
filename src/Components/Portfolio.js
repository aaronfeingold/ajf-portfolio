import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = ({ data }) => {
    const projects = Array.isArray(data.projects)
        ? data.projects.map((proj) => {
              let projectImage = `/images/portfolio/${proj.image}`;
              const projectId = proj.id;

              return (
                  <div key={proj.title} className="columns portfolio-item">
                      <div className="item-wrap">
                          <Link
                              to={`/project/${projectId}`}
                              title={proj.title}
                              className="router-link"
                              data-router="true"
                          >
                              <img alt={proj.title} src={projectImage} />
                              <div className="overlay">
                                  <div className="portfolio-item-meta">
                                      <h5>{proj.title}</h5>
                                      <p>{proj.category}</p>
                                  </div>
                              </div>
                              <div className="link-icon">
                                  <i className="fa fa-link"></i>
                              </div>
                          </Link>
                      </div>
                  </div>
              );
          })
        : [];

    return (
        <section id="portfolio">
            <div className="row">
                <div className="twelve columns collapsed">
                    <h1>Check Out Some of My Work.</h1>
                    <div
                        id="portfolio-wrapper"
                        className="bgrid-halves s-bgrid-thirds cf"
                    >
                        {projects}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
