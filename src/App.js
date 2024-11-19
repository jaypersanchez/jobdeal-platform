import React from 'react';
import Profile from './components/Profile';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChatComponent } from './components/CopilotChatComponent';
import ProjectList from './components/ProjectList';
import '@copilotkit/react-ui/styles.css';

function App() {
  return (
    <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
      <div>
        <h1>JobDeal Platform</h1>
        <Profile name="John Doe" title="Software Engineer" imageUrl="https://robohash.org/johndoe.png" />
        { /* <CopilotChatComponent /> */ }
        <ProjectList className="scrollable" />
      </div>
    </CopilotKit>
  );
}

export default App;
