import React, { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/github-projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>GitHub Repositories</h2>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
