import React, { useState, useEffect } from 'react';
import './ProjectWorkbench.css'; // Include CSS for styling

const ProjectWorkbench = () => {
  const [messages, setMessages] = useState([]); // Messages for communication
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [tasks, setTasks] = useState([]); // Tasks list
  const [taskDescription, setTaskDescription] = useState(''); // New task description
  const [projectName, setProjectName] = useState(''); // Project name

  useEffect(() => {
    // Get project name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('projectName');
    if (name) {
      setProjectName(name);
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You', timestamp: new Date().toLocaleString() }]);
      setNewMessage('');
    }
  };

  const handleAddTask = () => {
    if (taskDescription.trim()) {
      setTasks([...tasks, { id: Date.now(), description: taskDescription, completed: false }]);
      setTaskDescription('');
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
