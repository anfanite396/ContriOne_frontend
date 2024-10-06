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
    const [currentUsername, setCurrentUsername] = useState(null); // For the viewed profile's username

    // Check if a user is logged in on component mount
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    // Wrapper component to extract the username from URL params and pass it to the wrapped component
    const UsernameWrapper = ({ Component, ...rest }) => {
        const { username } = useParams(); // Get the username from the URL params
        useEffect(() => {
            setCurrentUsername(username); // Set the viewed profile's username in App's state
        }, [username]);

        // Pass the current username and other props to the wrapped component
        return <Component {...rest} username={username} />;
    };

    return (
        <Router>
            {/* Pass the logged-in user and setUser as props to Navbar */}
            <Navbar user={user} setUser={setUser} viewedUsername={currentUsername} setShowLogin={setShowLogin} /> 

            <Routes>
                {/* Wrap each component in UsernameWrapper to extract and pass the username */}
                <Route path="/" element={<HomePage />} />
                <Route path="/:username/overview" element={<UsernameWrapper Component={Overview} />} />
                <Route path="/:username/repositories" element={<UsernameWrapper Component={Repositories} />} />
                
                {/* For EditProfile, pass user, setUser, and other props */}
                <Route 
                    path="/:username/editprofile" 
                    element={<UsernameWrapper Component={EditProfile} user={user} setUser={setUser} />} 
                />

                {/* Login and Register routes */}
                {/* <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} /> */}
                {/* <Route path="/login" element={<Auth setUser={setUser} />} />
                <Route path="/register" element={<Auth setUser={setUser} />} /> */}

                <Route path="/auth" element={<Auth setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;
