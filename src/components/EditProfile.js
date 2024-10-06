import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../consts';

const EditProfile = ({ setUser, username }) => {
    const [user, setUserDetails] = useState(null);
    const [platforms, setPlatforms] = useState({
        github: '',
        gitlab: '',
        gerrit: ''
    });
    const [isPlatformLocked, setIsPlatformLocked] = useState({
        github: false,
        gitlab: false,
        gerrit: false
    });

    // Fetch user details from the API
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${username}`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserDetails(userData);

                    // Populate platforms based on the userData received
                    const newPlatforms = { github: '', gitlab: '', gerrit: '' };
                    userData.platforms.forEach(platform => {
                        newPlatforms[platform.platform] = platform.username;
                        setIsPlatformLocked((prev) => ({ ...prev, [platform.platform]: true }));
                    });
                    setPlatforms(newPlatforms); // Update the platforms state
                } else {
                    alert("Failed to load user data.");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [username]);

    const handlePlatformChange = (e, platform) => {
        setPlatforms({ ...platforms, [platform]: e.target.value });
    };

    const handleAddPlatform = async (platform) => {
        const platformValue = platforms[platform];
        if (!platformValue) {
            alert(`Please enter a valid ${platform} username.`);
            return;
        }

        // Ping the platform update API
        const response = await fetch(`${BASE_URL}/${user.username}/add-platform`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform, username: platformValue }),
            credentials: 'include'
        });

        if (response.ok) {
            setIsPlatformLocked((prev) => ({ ...prev, [platform]: true }));
            alert(`${platform} added successfully!`);
        } else {
            alert(`Failed to add ${platform}.`);
        }
    };

    const handleRemovePlatform = async (platform) => {
        const response = await fetch(`${BASE_URL}/${user.username}/remove-platform`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform }),
            credentials: 'include',
        });

        if (response.ok) {
            // Unlock the platform and clear its value
            setIsPlatformLocked((prev) => ({ ...prev, [platform]: false }));
            setPlatforms((prev) => ({ ...prev, [platform]: '' }));
            alert(`${platform} removed successfully.`);
        } else {
            alert(`Failed to remove ${platform}.`);
        }
    };

    const handleUpdateUserData = async () => {
        const response = await fetch(`${BASE_URL}/${user.username}/update-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platforms }),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            alert('User data updated successfully.');
        } else {
            alert('Failed to update user data.');
        }
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="edit-profile-container">
            <div className="edit-profile">
                <h2 className="edit-profile-heading">Edit Profile for {username}</h2>
    
                {/* Display User Info */}
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
    
                {/* Platform Fields */}
                <div className="platform-section">
                    <h3 className="platform-heading">Manage Platforms</h3>
    
                    {['github', 'gitlab'].map((platform) => (
                        <div key={platform} className="platform-input">
                            <label className="platform-label">
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                            </label>
                            <input
                                type="text"
                                className="platform-text-input"
                                value={platforms[platform]}
                                onChange={(e) => handlePlatformChange(e, platform)}
                                disabled={isPlatformLocked[platform]}
                            />
                            {!isPlatformLocked[platform] ? (
                                <button className="platform-button add-button" onClick={() => handleAddPlatform(platform)}>
                                    Add {platform}
                                </button>
                            ) : (
                                <button className="platform-button remove-button" onClick={() => handleRemovePlatform(platform)}>
                                    Remove {platform}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
    
                {/* Update User Data */}
                <div className="update-user-data">
                    <button className="update-button" onClick={handleUpdateUserData}>
                        Update User Data
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default EditProfile;
