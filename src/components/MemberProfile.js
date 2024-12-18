import React from 'react';
import './MemberProfile.css'; // Optional: Create a CSS file for styling

const MemberProfile = () => {
    // Sample profile data
    const profileData = {
        name: "John Doe",
        title: "Software Engineer",
        imageUrl: "https://robohash.org/johndoe.png" // Sample image URL
    };

    return (
        <div className="profile-card">
            <img
                src={profileData.imageUrl}
                alt={`${profileData.name}'s profile`}
                className="profile-image"
            />
            <h2 className="profile-name">{profileData.name}</h2>
            <p className="profile-title">{profileData.title}</p>
        </div>
    );
};

export default MemberProfile; 