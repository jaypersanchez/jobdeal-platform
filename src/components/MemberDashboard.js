import React, { useState } from 'react';
import './Profile.css'; // Importing the CSS for the Profile component
import {
  Bell,
  Home,
  MessageSquare,
  Users,
  Search,
} from 'lucide-react';
import Modal from './Modal'; // Import the Modal component
import JobRecommendation from './JobRecommendation'; // Import the JobRecommendation component
import FeedSection from './FeedSection'; // Import the FeedSection component

const MemberDashboard = ({ name, title, imageUrl }) => {
  const [insight, setInsight] = useState('');
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  console.log("Rendering MemberDashboard:", name); // Debugging line

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
      <main className="profile-main flex-container">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="profile-image"
          />
          <h2 className="profile-name">{name}</h2>
          <p className="profile-title">{title}</p>
        </div>

        {/* Feed Section */}
        <FeedSection name={name} imageUrl={imageUrl} />

        {/* Job Recommendation Component */}
        <div className="job-recommendation scrollable">
          <JobRecommendation />
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;
