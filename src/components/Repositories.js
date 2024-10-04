import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepos } from '../api/api';

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
        <div>
            <h1>{username}'s Repositories</h1>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.repo_id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.repo_name} ({repo.platform})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;
