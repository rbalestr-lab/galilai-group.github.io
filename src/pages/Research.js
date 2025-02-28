import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiArxiv } from 'react-icons/si';
import { GlobeIcon } from 'lucide-react';
import './Research.css';

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.378 2H21.5L14.872 10.406L22 21.5H15.935L11.262 14.962L5.936 21.5H2.814L9.91 12.528L3 2H9.221L13.467 8.028L18.378 2ZM17.254 19.836H18.883L7.392 3.609H5.675L17.254 19.836Z"
      fill="currentColor"
    />
  </svg>
);

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150;
  const truncatedDescription =
    project.description.length > maxLength
      ? project.description.slice(0, maxLength) + '...'
      : project.description;

  const toggleExpand = () => setExpanded(!expanded);

  // Use the "categories" array if available; otherwise fallback to a single category.
  const categories = project.categories || (project.category ? [project.category] : []);

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/fallback-image.png';
          }}
        />
        {project.formula && (
          <div className="project-formula">{project.formula}</div>
        )}
      </div>
      <div className="project-details">
        <div className="project-main">
          <div className="project-header">
            <h2>{project.title}</h2>
          </div>
          <div className="project-categories">
            {categories.map((cat, index) => (
              <span key={index} className="project-category">
                {cat}{index < categories.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <p className="project-description">
            {expanded ? project.description : truncatedDescription}
          </p>
        </div>
        <div className="project-footer">
          <span className="project-date">{project.date}</span>
          <div className="footer-right">
            <div className="link-icons">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {project.arxiv && (
                <a
                  href={project.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  title="arXiv"
                >
                  <SiArxiv />
                </a>
              )}
              {project.twitter && (
                <a
                  href={project.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  title="Twitter"
                >
                  <XIcon />
                </a>
              )}
              {project.webpage && (
                <a
                  href={project.webpage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  title="Webpage"
                >
                  <GlobeIcon />
                </a>
              )}
            </div>
            <div className="buttons">
              <button className="continue-reading" onClick={toggleExpand}>
                {expanded ? 'Show Less' : 'Continue Reading'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Research = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/research.json')
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Update filter to check title, description, and categories.
  const filteredProjects = data
    ? data.projects.filter((project) => {
        const lowerTerm = searchTerm.toLowerCase();
        const projectCategories = project.categories || (project.category ? [project.category] : []);
        return (
          project.title.toLowerCase().includes(lowerTerm) ||
          project.description.toLowerCase().includes(lowerTerm) ||
          projectCategories.join(' ').toLowerCase().includes(lowerTerm)
        );
      })
    : [];

  // Compute categories dynamically from the projects array, taking into account multiple categories per project.
  const computedCategories = data
    ? data.projects.reduce((acc, project) => {
        const projectCategories = project.categories || (project.category ? [project.category] : []);
        projectCategories.forEach((cat) => {
          acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
      }, {})
    : {};

  const categoriesArray = Object.entries(computedCategories).map(
    ([name, count]) => ({ name, count })
  );

  // Sort projects by date (latest first).
  const sortedProjects = filteredProjects
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="research-container">
      <div className="research-grid">
        <div className="projects-section">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="categories">
            <h3>CATEGORIES</h3>
            {categoriesArray.map((category, index) => (
              <button
                key={index}
                className={`category-item ${
                  searchTerm.toLowerCase() === category.name.toLowerCase()
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setSearchTerm(
                    searchTerm.toLowerCase() === category.name.toLowerCase()
                      ? ''
                      : category.name
                  )
                }
              >
                <span>{category.name}</span>
                <span>({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
