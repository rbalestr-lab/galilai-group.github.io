import React, { useState, useEffect, useMemo } from 'react';
import './Publications.css';
import { withPublicUrl } from '../utils/publicUrl';

const ProjectCard = ({ project }) => {
  const categories = project.categories || (project.category ? [project.category] : []);
  const authors = Array.isArray(project.authors) ? project.authors.join(', ') : project.authors;
  const publication =
    project.publication ||
    project.venue ||
    project.conference ||
    project.date ||
    project.year ||
    '';

  const paperLink = project.paper || project.arxiv;
  const codeLink = project.code || project.github;
  const projectLink = project.projectPage || project.blog || project.webpage;

  const isGif = project.image && project.image.toLowerCase().endsWith('.gif');

  return (
    <li className="publication-entry">
      <div className="publication-image-container">
        {project.image ? (
          <img
            src={withPublicUrl(project.image)}
            alt={project.title}
            className={`publication-image ${isGif ? 'publication-image-gif' : ''}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = withPublicUrl('/assets/images/fallback_image.png');
            }}
          />
        ) : null}
      </div>
      <div className="publication-details">
        <h2 className="publication-title">{project.title}</h2>
        {authors && <p className="publication-authors">{authors}</p>}
        {publication && <p className="publication-venue">{publication}</p>}
        <div className="publication-links">
          {paperLink && (
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-link"
            >
              [Paper]
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-link"
            >
              [Code]
            </a>
          )}
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-link"
            >
              [Blog]
            </a>
          )}
        </div>
        {!!categories.length && (
          <div className="publication-tags">
            {[...categories].sort().map((cat, index) => (
              <span key={index} className="publication-tag">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

const Publications = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch(withPublicUrl('/data/publications.json'))
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const { yearOptions, categoryOptions, sortedProjects } = useMemo(() => {
    if (!data) {
      return { yearOptions: [], categoryOptions: [], sortedProjects: [] };
    }

    const sortedProjects = data.projects
      .slice()
      .sort((a, b) => new Date(b.date || b.year || 0) - new Date(a.date || a.year || 0));

    const yearsSet = new Set();
    const categoriesSet = new Set();

    sortedProjects.forEach((project) => {
      const projectYear = project.year || (project.date ? new Date(project.date).getFullYear().toString() : null);
      if (projectYear) {
        yearsSet.add(projectYear);
      }
      const projectCategories = project.categories || (project.category ? [project.category] : []);
      projectCategories.forEach((cat) => categoriesSet.add(cat));
    });

    const yearOptions = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
    const categoryOptions = Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));

    return { yearOptions, categoryOptions, sortedProjects };
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!sortedProjects.length) return [];

    return sortedProjects.filter((project) => {
      const projectYear = project.year || (project.date ? new Date(project.date).getFullYear().toString() : null);
      const projectCategories = project.categories || (project.category ? [project.category] : []);

      const matchesYear = selectedYear === 'All' || projectYear === selectedYear;
      const matchesCategory =
        selectedCategory === 'All' || projectCategories.includes(selectedCategory);

      return matchesYear && matchesCategory;
    });
  }, [sortedProjects, selectedYear, selectedCategory]);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="publication-container">
      <div className="filter-bar">
        <div className="filter-group">
          <p className="filter-label">Year</p>
          <div className="filter-chips">
            {['All', ...yearOptions].map((year) => (
              <button
                key={year}
                className={`filter-chip ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <p className="filter-label">Research Topics</p>
          <div className="filter-chips">
            {['All', ...categoryOptions].map((topic) => (
              <button
                key={topic}
                className={`filter-chip ${selectedCategory === topic ? 'active' : ''}`}
                onClick={() => setSelectedCategory(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="publication-list-wrapper">
        <ul className="publication-list">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Publications;
