import React, { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [analysis, setAnalysis] = useState({}); // Store insights for each project

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

  const analyzeProject = async (project) => {
    try {
      const response = await fetch('http://localhost:4000/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project }),
      });
      const data = await response.json();
      setAnalysis((prev) => ({ ...prev, [project.id]: data.analysis }));
    } catch (error) {
      console.error(`Error analyzing project ${project.id}:`, error);
    }
  };

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
          <button onClick={() => analyzeProject(project)}>Get Insights</button>
          {analysis[project.id] && (
            <div className="project-analysis">
              <strong>AI Insights:</strong>
              <p>{analysis[project.id]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
