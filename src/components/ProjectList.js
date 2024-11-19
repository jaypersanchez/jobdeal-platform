import React, { useEffect, useState } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [analysis, setAnalysis] = useState({});
    const [taskDescriptions, setTaskDescriptions] = useState({});

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

    const handleTaskDescriptionChange = (projectId, value) => {
        setTaskDescriptions((prev) => ({ ...prev, [projectId]: value }));
    };

    const createTask = async (project) => {
        const taskDescription = taskDescriptions[project.id] || '';
        try {
            const response = await fetch('http://localhost:4000/create-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project, taskDescription }),
            });

            const data = await response.json();

            if (data.issueUrl) {
                alert(`Task created: ${data.task}\nGitHub Issue: ${data.issueUrl}`);
            } else {
                alert('Task created but no issue URL returned. Check the server logs.');
            }
        } catch (error) {
            console.error(`Error creating task for project ${project.id}:`, error);
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
                    <div>
                        <input
                            type="text"
                            placeholder="Enter task description"
                            value={taskDescriptions[project.id] || ''}
                            onChange={(e) => handleTaskDescriptionChange(project.id, e.target.value)}
                        />
                        <button onClick={() => createTask(project)}>Create Task</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectList;
