import React from 'react';

const FeedSection = ({ name, imageUrl }) => {
  return (
    <div className="profile-feed scrollable">
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
      {/* Add more posts here to test scrolling */}
    </div>
  );
};

export default FeedSection;