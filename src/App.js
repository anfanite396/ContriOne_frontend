import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Repositories from './components/Repositories';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import Auth from './components/Auth';
import HomePage from './components/Home';

const App = () => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [currentUsername, setCurrentUsername] = useState(null);

    // Check if a user is logged in on component mount
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    // Wrapper component to extract the username from URL params
    const UsernameWrapper = ({ Component, ...rest }) => {
        const { username } = useParams(); // Get the username from the URL params
        
        useEffect(() => {
            if (username) {
                setCurrentUsername(username); // Set the viewed profile's username in App's state
            }
            else if (user && user.username) {
                setCurrentUsername(user.username);
            }
        }, [username]);

        // Pass the current username and other props to the wrapped component
        return <Component {...rest} username={username} user={user} />;
    };

    return (
        <Router>
            <Navbar user={user} setUser={setUser} viewedUsername={currentUsername} setShowLogin={setShowLogin} /> 

            <Routes>
                <Route path="/" element={<UsernameWrapper user={user} Component={HomePage} />} />
                <Route path="/:username/overview" element={<UsernameWrapper Component={Overview} setUser={setUser} />} />
                <Route path="/:username/repositories" element={<UsernameWrapper Component={Repositories} setUser={setUser} />} />
                <Route 
                    path="/:username/editprofile" 
                    element={<UsernameWrapper Component={EditProfile} user={user} setUser={setUser} />} 
                />
                <Route path="/auth" element={<Auth user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;