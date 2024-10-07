import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../consts';

const Navbar = ({ user, setUser, viewedUsername, setShowLogin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: 'include',
    });
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate('/auth');
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    navigate('/auth');
    setShowLogin(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="100" height="25">
            <rect x="0" y="0" width="200" height="50" fill="#24292f" />
            <text x="10" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">
              Contri<tspan fill="#2da44e">One</tspan>
            </text>
            <circle cx="175" cy="25" r="15" fill="#2da44e" />
            <path d="M170 25 L180 25 M175 20 L175 30" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </Link>
        <ul className="nav-links">
          <li><Link to="/#contribute" className="nav-item">Contribute</Link></li>
          {user && (
            <>
              <li><Link to={`/${viewedUsername}/overview`} className="nav-item">Overview</Link></li>
              <li><Link to={`/${viewedUsername}/repositories`} className="nav-item">Repositories</Link></li>
              {viewedUsername === user.username && (
                <li><Link to={`/${user.username}/editprofile`} className="nav-item">Edit Profile</Link></li>
              )}
            </>
          )}
        </ul>
        <ul className="nav-links auth-links">
          {user ? (
            <>
              <li><span className="nav-username">{user.username}</span></li>
              <li><button onClick={handleLogout} className="auth-btn">Logout</button></li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLoginClick} className="nav-item auth-btn">Login</button>
              </li>
              <li>
                <button onClick={handleRegisterClick} className="nav-item auth-btn">Register</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
