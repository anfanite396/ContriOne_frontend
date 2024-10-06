import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import githubLogo from '../assets/images/github-mark/github-mark.png';
import gitlabLogo from '../assets/images/gitlab-logo-500.png';
import { fetchRepos } from '../api/api';
import UserInfo from '../components/UserInfo';  // Import the UserInfo component

const Repositories = () => {
    const { username } = useParams();  // Get the username from the URL
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Fetch repository data based on username
        const getRepoData = async () => {
            try {
                const repoData = await fetchRepos(username);
                setRepos(repoData.repos);
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };

        getRepoData();
    }, [username]);  // Re-run when the username changes

    return (
        <div className="repositories-container">
            {/* User Info (Left Section) */}
            <UserInfo />  {/* Reusing the UserInfo component */}
    
            {/* Repositories List (Right Section) */}
            <div className="repositories-section">
                <h1>{username}'s Repositories</h1>
                <ul>
                    {repos.map((repo) => (
                        <li key={repo.repo_id} className="repo-item">
                            <div className="repo-item-content">
                                {/* Conditional rendering of logos based on platform */}
                                {repo.platform === 'github' && (
                                    <img src={githubLogo} alt="GitHub Logo" className="platform-logo" />
                                )}
                                {repo.platform === 'gitlab' && (
                                    <img src={gitlabLogo} alt="GitLab Logo" className="platform-logo" />
                                )}
                                {/* Add more conditions for other platforms if necessary */}
    
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.repo_name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
      
};

export default Repositories;
