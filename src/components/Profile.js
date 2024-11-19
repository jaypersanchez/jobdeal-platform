import React from 'react';
import './Profile.css'; // Importing the CSS for the Profile component
import {
  Bell,
  Briefcase,
  Home,
  MessageSquare,
  Users,
  Search,
} from 'lucide-react';
import Resume from './Resume';

const Profile = ({ name, title, imageUrl }) => {
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
          <button className="connect-button">Connect</button>
        </div>

        <Resume />
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
