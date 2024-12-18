import React, { useEffect, useState } from 'react';
import './ProjectList.css';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // Track the selected project
    const [analysis, setAnalysis] = useState({});
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

    const deleteRepo = async () => {
        if (!selectedProject) {
            alert('Please select a project to delete.');
            return;
        }

        const { name, owner } = selectedProject; // Get the name and owner of the selected project
        try {
            const response = await fetch('http://localhost:4000/delete-repo', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ owner, repo: name }), // Send owner and repo name
            });

            if (response.ok) {
                alert(`Repository '${name}' deleted successfully!`);
                // Optionally, refresh the project list or remove the deleted project from state
                setProjects((prev) => prev.filter((project) => project.id !== selectedProject.id));
                setSelectedProject(null); // Clear the selected project
            } else {
                const errorData = await response.json();
                alert(`Error deleting repository: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error deleting repository:', error);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project); // Set the selected project
    };

    const openProjectWorkbench = () => {
        if (selectedProject) {
            const projectUrl = `/project-workbench?projectName=${encodeURIComponent(selectedProject.name)}&projectId=${selectedProject.id}&repoOwner=${encodeURIComponent(selectedProject.owner)}`;
            const newTab = window.open(projectUrl, '_blank');
            if (!newTab) {
                alert('Please allow popups for this website');
            }
        } else {
            alert('Please select a project first.');
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
                        handleProjectSelect(project); // Set the selected project
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

            {/* Button to open ProjectWorkbench */}
            <button onClick={openProjectWorkbench} disabled={!selectedProject}>
                Open Project Workbench
            </button>

            {/* Display selected project details */}
            {selectedProject && (
                <div className="selected-project project-details">
                    <h3>{selectedProject.name}</h3>
                    <p>{selectedProject.description}</p>
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                    <div>
                        <button className="button-spacing" onClick={() => analyzeProject(selectedProject)}>Get Insights</button>
                        <button onClick={deleteRepo}>Delete Repository</button>
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
                <div className="new-repo-button"><button onClick={createNewRepo}>Create Repository</button></div>
                
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
