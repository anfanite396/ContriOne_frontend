import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../consts';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username && password){
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok){
                const user = {username};
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                navigate(`/${user.username}/overview`);
            } else{
                console.log(data);
                // console.log(data['error']);
            }
            
        } else{
            console.log('Invalid Login');
        }
    }

    return (
        <div>
            <h2> Login </h2>
            <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Updates state
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Updates state
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    )
};

export default Login;