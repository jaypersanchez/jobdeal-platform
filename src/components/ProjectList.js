import React, { useEffect, useState } from 'react';
import './ProjectList.css';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // Track the selected project
    const [analysis, setAnalysis] = useState({});
    const [taskDescriptions, setTaskDescriptions] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [modalContent, setModalContent] = useState(''); // Content for the modal
    const [newRepoName, setNewRepoName] = useState(''); // New repository name
    const [newRepoDescription, setNewRepoDescription] = useState(''); // New repository description
    const [isPrivate, setIsPrivate] = useState(false); // New repository privacy setting

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

            // Open modal and set content
            setModalContent(data.analysis);
            setIsModalOpen(true);

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

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const createNewRepo = async () => {
        try {
            const response = await fetch('http://localhost:4000/create-repo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newRepoName,
                    description: newRepoDescription,
                    private: isPrivate,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Repository created: ${data.name}`);
                // Reset the form
                setNewRepoName('');
                setNewRepoDescription('');
                setIsPrivate(false);
            } else {
                alert(`Error creating repository: ${data.error}`);
            }
        } catch (error) {
            console.error('Error creating repository:', error);
        }
    };

    return (
        <div className="project-list">
            <h2>Project Workbench</h2>

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

            {/* New Repository Creation Form */}
            <div className="new-repo-form">
                <h3>Create New Repository</h3>
                <input
                    type="text"
                    placeholder="Repository Name"
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Repository Description"
                    value={newRepoDescription}
                    onChange={(e) => setNewRepoDescription(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    Private
                </label>
                <button onClick={createNewRepo}>Create Repository</button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            &times;
                        </button>
                        <h3>AI Insights</h3>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectList;
