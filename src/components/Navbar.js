import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../consts';

const Navbar = ({ user, setUser, viewedUsername }) => { // Receive the viewedUsername from props
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser){
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser); // Set user state
            setIsLoggedIn(true); // Set logged-in state
        }
    }, [setUser]);

    const handleLogout = async () => {
        localStorage.removeItem("user");
        setUser(null);  // Clear user state
        
        await fetch(`${BASE_URL}/logout`, { 
            method: "POST",
            credentials: 'include',
        });

        navigate("/login"); // Redirect to login
    };

    console.log("Viewed User", {viewedUsername});
    console.log("user", user);

    return (
        <nav>
            {!user ? (
                <ul className='auth-links' style={{ float: 'right' }}>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            ) : (
                <>
                    <ul>
                        <li><Link to={`/${viewedUsername}/overview`}>Overview</Link></li>
                        <li><Link to={`/${viewedUsername}/repositories`}>Repositories</Link></li>
                        
                        {/* Display "Edit Profile" only if the logged-in user matches the profile being viewed */}
                        {user && viewedUsername === user.username && (
                            <li><Link to={`/${user.username}/editprofile`}>Edit Profile</Link></li>
                        )}
                    </ul>
                    <ul className='auth-links' style={{ float: 'right' }}>
                        <li><span>{user.username}</span></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default Navbar;
