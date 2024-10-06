import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ setUser, showLogin, setShowLogin }) => {
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
