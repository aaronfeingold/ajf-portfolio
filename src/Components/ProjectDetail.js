import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ResumeContext } from './ResumeContext';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const { resumeData, loading: contextLoading } = useContext(ResumeContext);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get project from context if available
        if (!contextLoading && resumeData.portfolio.projects) {
            const foundProject = resumeData.portfolio.projects.find(
                (p) => p.id === String(projectId)
            );
            setProject(foundProject);
            setLoading(false);
        }

        // Fallback - fetch directly if context is loaded but project not found
        if (
            !contextLoading &&
            !resumeData.portfolio.projects.find(
                (p) => p.id === String(projectId)
            )
        ) {
            // Direct fetch fallback would go here
            // For now, just set loading to false since we've checked the context
            setLoading(false);
        }
    }, [projectId, resumeData, contextLoading]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.height = '100vh';

        return () => {
            document.body.style.height = 'auto';
        };
    }, []);

    const handleBackToPortfolio = () => {
        history.push('/');
        setTimeout(() => {
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    // Loading state
    if (loading || contextLoading) {
        return (
            <div className="project-detail">
                <div
                    className="loading-content"
                    style={{ paddingTop: '120px', textAlign: 'center' }}
                >
                    <img
                        src="/images/loader.gif"
                        alt="Loading..."
                        className="loading-gif"
                        style={{ maxWidth: '80px', margin: '0 auto 20px' }}
                    />
                    <h1 style={{ color: '#fff' }}>Loading Project...</h1>
                </div>
            </div>
        );
    }

    // Not found state
    if (!project) {
        return (
            <div className="project-detail">
                <div
                    className="row"
                    style={{ paddingTop: '120px', textAlign: 'center' }}
                >
                    <div className="twelve columns">
                        <h1 style={{ color: '#fff' }}>Project Not Found</h1>
                        <p style={{ color: '#7a7a7a', marginBottom: '30px' }}>
                            The project you're looking for doesn't exist or has
                            been removed.
                        </p>
                        <button
                            onClick={handleBackToPortfolio}
                            className="btn-secondary"
                        >
                            Back to Projects
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Properly format the image path
    const projectImage = `/images/portfolio/${project.image}`;

    return (
        <div className="project-detail">
            <div className="project-header">
                <h1>{project.title}</h1>
                <p className="category">{project.category}</p>
            </div>

            <div className="project-content">
                <div className="project-image">
                    <img src={projectImage} alt={project.title} />
                </div>

                <div className="project-info">
                    <section className="description">
                        <h2>About the Project</h2>
                        <p>{project.description}</p>
                    </section>

                    <section className="tech-stack">
                        <h2>Technology Stack</h2>
                        <ul>
                            {project.techStack.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </section>

                    {project.blogUrl && (
                        <section className="blog-link">
                            <h2>Read More</h2>
                            <a
                                href={project.blogUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Blog Post
                            </a>
                        </section>
                    )}

                    {project.businessIdea && (
                        <section className="business-idea">
                            <h2>Business Concept</h2>
                            <p>{project.businessIdea}</p>
                        </section>
                    )}

                    <div className="project-links">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Visit Project
                        </a>
                        <button
                            onClick={handleBackToPortfolio}
                            className="btn-secondary"
                        >
                            Back to Projects
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
