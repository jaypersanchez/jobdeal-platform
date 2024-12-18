import React, { useState, useEffect } from 'react';
import './ProjectWorkbench.css'; // Include CSS for styling

const ProjectWorkbench = () => {
  const [messages, setMessages] = useState([]); // Messages for communication
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [projectName, setProjectName] = useState(''); // Project name
  const [projectId, setProjectId] = useState(''); // Add state for project ID
  const [tasks, setTasks] = useState([]); // Tasks list
  const [taskDescription, setTaskDescription] = useState(''); // New task description
  const [repoOwner, setRepoOwner] = useState(''); // Add state for repository owner
  const [repoName, setRepoName] = useState(''); // Add state for repository name

  useEffect(() => {
    // Get project name, ID, and owner from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('projectName');
    const id = urlParams.get('projectId');
    const owner = urlParams.get('repoOwner'); // Get project owner
    if (name) {
      setProjectName(name);
    }
    if (id) {
      setProjectId(id);
    }
    if (owner) {
      setRepoOwner(owner); // Set the repo owner in state
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You', timestamp: new Date().toLocaleString() }]);
      setNewMessage('');
    }
  };

  const handleAddTask = async () => {
    if (taskDescription.trim()) {
      const newTask = { id: Date.now(), description: taskDescription, completed: false };
      setTasks([...tasks, newTask]);
      setTaskDescription('');

      // Call API to save the task in the repository
      try {
        const response = await fetch('http://localhost:4000/create-task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            project: { name: projectName, id: projectId, owner: repoOwner }, // Include project details
            taskDescription: newTask.description,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create task in repository');
        }

        const data = await response.json();
        console.log('Task created in repository:', data);
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="workbench-container">
      <h2>Project Workbench for {projectName || 'Selected Project'}</h2>
      <p>This is a standalone workbench for managing tasks and messages.</p>

      {/* Meeting Buttons */}
      <div className="meeting-buttons">
        <button>Meet Now</button>
        <button>Schedule Meeting</button>
      </div>

      {/* Tasks Section */}
      <section className="workbench-tasks">
        <h3>Tasks</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task-completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {task.description}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Add a new task"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </section>

      {/* Messages Section */}
      <section className="workbench-messages">
        <h3>Messages</h3>
        <div className="messages-list">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span className="message-sender">{message.sender}</span>: {message.text}{' '}
              <span className="message-timestamp">({message.timestamp})</span>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="workbench-files">
        <h3>Files</h3>
        <input type="file" />
      </section>
    </div>
  );
};

export default ProjectWorkbench;
