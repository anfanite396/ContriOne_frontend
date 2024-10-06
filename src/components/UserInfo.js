// src/components/UserInfo.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import githubLogo from '../assets/images/github-mark/github-mark.png';
import gitlabLogo from '../assets/images/gitlab-logo-500.png';
import { fetchUser } from '../api/api';

const UserInfo = () => {
    const { username } = useParams(); // Extract username from URL params
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Fetch user data when the component is mounted
        const getUserData = async () => {
            try {
                const userData = await fetchUser(username);
                setUserInfo(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, [username]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-info">
            <h1>{userInfo.username}'s Overview</h1>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Username:</strong> {userInfo.username}</p>
    
            {/* Display Linked Platforms */}
            <div className="linked-platforms">
                <h3>Linked Platforms</h3>
                <ul>
                    {userInfo.platforms && userInfo.platforms.map((platform) => (
                        <li key={platform.id} className="platform-item">
                            {/* Conditional rendering of logos based on platform */}
                            {platform.platform === 'github' && (
                                <img src={githubLogo} alt="GitHub Logo" className="platform-logo" />
                            )}
                            {platform.platform === 'gitlab' && (
                                <img src={gitlabLogo} alt="GitLab Logo" className="platform-logo" />
                            )}
                            {/* {platform.platform === 'gerrit' && (
                                <img src={gerritLogo} alt="Gerrit Logo" className="platform-logo" />
                            )} */}
                            {/* Add more conditions for other platforms if necessary */}
    
                            <span className="platform-text">
                                {platform.platform}: {platform.username}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
};

export default UserInfo;
