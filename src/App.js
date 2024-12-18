import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import MemberDashboard from './components/MemberDashboard';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChatComponent } from './components/CopilotChatComponent';
import ProjectList from './components/ProjectList';
import ProjectWorkbench from './components/ProjectWorkbench';
import '@copilotkit/react-ui/styles.css';
import MemberProfile from './components/MemberProfile';
import './App.css';

const App = () => {
  return (
    <Router>
      <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
        <div className="app-container">
          <div className="main-content">
            <Routes>
              {/* Route for Member Dashboard */}
              <Route 
                path="/" 
                element={
                  <>
                    
                    <MemberDashboard 
                      name="John Doe" 
                      title="Software Engineer" 
                      imageUrl="https://robohash.org/johndoe.png" 
                    />
                    <ProjectList className="scrollable" />
                  </>
                } 
              />

              {/* Route for Project Workbench */}
              <Route 
                path="/project-workbench" 
                element={<ProjectWorkbench />} 
              />
            </Routes>
          </div>
          
        </div>
      </CopilotKit>
    </Router>
  );
};

export default App;
