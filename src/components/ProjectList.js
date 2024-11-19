import React, { useEffect, useState } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // Track the selected project
    const [analysis, setAnalysis] = useState({});
    const [taskDescriptions, setTaskDescriptions] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:4000/github-projects');
                const data = await response.json();

                // Sort projects alphabetically by name
                const sortedProjects = data.sort((a, b) => a.name.localeCompare(b.name));
                setProjects(sortedProjects);
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

    const handleTaskDescriptionChange = (value) => {
        if (selectedProject) {
            setTaskDescriptions((prev) => ({ ...prev, [selectedProject.id]: value }));
        }
    };

    const createTask = async () => {
        if (!selectedProject) {
            alert('Please select a project first.');
            return;
        }

        const taskDescription = taskDescriptions[selectedProject.id] || '';
        try {
            const response = await fetch('http://localhost:4000/create-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project: selectedProject, taskDescription }),
            });

            const data = await response.json();

            if (data.issueUrl) {
                alert(`Task created: ${data.task}\nGitHub Issue: ${data.issueUrl}`);
            } else {
                alert('Task created but no issue URL returned. Check the server logs.');
            }
        } catch (error) {
            console.error(`Error creating task for project ${selectedProject.id}:`, error);
        }
    };

    return (
        <div className="project-list">
            <h2>GitHub Repositories</h2>

            {/* Dropdown to select a project */}
            <div className="project-dropdown">
                <select
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        const project = projects.find((proj) => proj.id === parseInt(selectedId));
                        setSelectedProject(project);
                    }}
                    value={selectedProject?.id || ''}
                >
                    <option value="" disabled>
                        Select a project
                    </option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display selected project details */}
            {selectedProject && (
                <div className="selected-project">
                    <h3>{selectedProject.name}</h3>
                    <p>{selectedProject.description}</p>
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                    <button onClick={() => analyzeProject(selectedProject)}>Get Insights</button>
                    {analysis[selectedProject.id] && (
                        <div className="project-analysis">
                            <strong>AI Insights:</strong>
                            <p>{analysis[selectedProject.id]}</p>
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            placeholder="Enter task description"
                            value={taskDescriptions[selectedProject.id] || ''}
                            onChange={(e) => handleTaskDescriptionChange(e.target.value)}
                        />
                        <button onClick={createTask}>Create Task</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectList;
