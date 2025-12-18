import React, { useEffect, useState } from 'react';
import './Projects.css';
import { Github } from 'lucide-react';
import { withPublicUrl } from '../utils/publicUrl';

const WebsiteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
    <circle cx="6" cy="7" r="0.5" fill="currentColor"/>
    <circle cx="8" cy="7" r="0.5" fill="currentColor"/>
    <circle cx="10" cy="7" r="0.5" fill="currentColor"/>
  </svg>
);

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch(withPublicUrl('/data/projects.json'))
      .then(res => res.json())
      .then(setProjects)
      .catch(e => console.log(e));
  }, []);

  if (!projects) return <div className="loading">Loading...</div>;

  return (
    <div className="projects-container">
      <div className="projects-grid">
        {projects.projects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${project.thumbnail_image ? 'project-card-with-image' : ''}`}
            style={project.thumbnail_image ? { backgroundImage: `url(${withPublicUrl(project.thumbnail_image)})` } : {}}
          >
            <div className="project-card-content">
              <h2 className="project-card-title">{project.title}</h2>
              {project.description && (
                <p className="project-card-description">{project.description}</p>
              )}
              <div className="project-card-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Github size={20} />
                    <span>Github</span>
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <WebsiteIcon />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

