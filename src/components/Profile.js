import React, { useState } from 'react';
import './Profile.css'; // Importing the CSS for the Profile component
import {
  Bell,
  Briefcase,
  Home,
  MessageSquare,
  Users,
  Search,
} from 'lucide-react';
import Modal from './Modal'; // Import the Modal component

const Profile = ({ name, title, imageUrl }) => {
  const [insight, setInsight] = useState('');
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleButtonClick = async () => {
    // Extract insights from the Resume component
    const resumeContent = `
      ${name} is a Fullstack Developer with expertise in JavaScript, React, and Node.js. 
      They have experience in building scalable web applications and are detail-oriented.
      Here are some key competencies:
      - Solidity with latest pragma
      - Hardhat and Truffle suite for smart contract development
      - DeFi libraries (Uniswap V2, ERC20 tokens, NFT ERC1155)
      - React and React Native for user interfaces
      - ExpressJS and Flask for server-side functionalities
      - SQL and NoSQL databases for data retention
      - Machine Learning tools (NumPy, BERT, PyTorch, OpenAI SDK)
      - DevOps for CI/CD on AWS and Google Cloud Platform
    `;

    try {
      const response = await fetch('http://localhost:4000/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure your API key is set in your environment
        },
        body: JSON.stringify({
          resumeContent, // Send the resume content to the new endpoint
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      setInsight(data.analysis);
      setModalOpen(true); // Open the modal with the insight
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setInsight('Failed to analyze resume.');
      setModalOpen(true); // Open the modal even if there's an error
    }
  };

  console.log("Rendering Profile:", name); // Debugging line

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <header className="profile-header">
        <div className="profile-header-container">
          <div className="profile-search-bar">
            <Search className="profile-search-icon" />
            <input
              className="profile-search-input"
              placeholder="Search"
              type="search"
            />
          </div>
          <nav className="profile-nav">
            <button className="profile-nav-button">
              <Home className="profile-nav-icon" />
              <span>Home</span>
            </button>
            <button className="profile-nav-button">
              <Users className="profile-nav-icon" />
              <span>My Network</span>
            </button>
            <button className="profile-nav-button">
              <Briefcase className="profile-nav-icon" />
              <span>Jobs</span>
            </button>
            <button className="profile-nav-button">
              <MessageSquare className="profile-nav-icon" />
              <span>Messaging</span>
            </button>
            <button className="profile-nav-button">
              <Bell className="profile-nav-icon" />
              <span>Notifications</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="profile-main">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="profile-image"
          />
          <h2 className="profile-name">{name}</h2>
          <p className="profile-title">{title}</p>
          <button className="connect-button" onClick={handleButtonClick}>
            Tell me about {name} work experience and skills
          </button>
        </div>

        {/* Modal for Insight */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h3>Insight:</h3>
          <p>{insight}</p>
        </Modal>

        {/* Feed Section */}
        <div className="profile-feed">
          <div className="profile-feed-input">
            <img
              src={imageUrl}
              alt={`${name}'s profile`}
              className="profile-feed-avatar"
            />
            <input
              className="profile-feed-textbox"
              placeholder="Start a post, try writing with AI"
            />
          </div>
          <div className="profile-feed-post">
            <div className="profile-feed-header">
              <img
                src={imageUrl}
                alt={`${name}'s profile`}
                className="profile-feed-avatar"
              />
              <div className="profile-feed-user">
                <h3 className="profile-feed-username">{name}</h3>
                <span className="profile-feed-timestamp">2h ago</span>
              </div>
            </div>
            <p className="profile-feed-content">This is a sample post...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
