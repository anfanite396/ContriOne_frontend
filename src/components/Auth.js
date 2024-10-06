import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = ({ user, setUser, showLogin, setShowLogin }) => {
    const navigate = useNavigate();

    // Redirect to the user's overview page if they are already logged in
    useEffect(() => {
        if (user) {
            navigate(`/${user.username}/overview`);
        }
    }, [user, navigate]);

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                {showLogin ? (
                    <>
                        <Login setUser={setUser} />
                        <p className="switch-auth">
                            Don't have an account?
                            <button onClick={() => setShowLogin(false)} className="link-button">Register</button>
                        </p>
                    </>
                ) : (
                    <>
                        <Register setUser={setUser} />
                        <p className="switch-auth">
                            Already have an account?
                            <button onClick={() => setShowLogin(true)} className="link-button">Login</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;
