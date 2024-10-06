import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>Welcome to ContriOne</h1>
        <p>Your one-stop platform for tracking all your open source contributions and projects</p>
        <Link to="/auth" className="cta-button">Get Started</Link>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Unified Dashboard</h2>
          <p>View all your contributions across multiple platforms in one place</p>
        </div>
        <div className="feature">
          <h2>Contribution Heatmap</h2>
          <p>Visualize your activity with an interactive contribution heatmap</p>
        </div>
        <div className="feature">
          <h2>Multi-Platform Support</h2>
          <p>Connect your GitHub, GitLab, and other accounts for a comprehensive overview</p>
        </div>
      </section>
      <section className="about">
        <h2>About ContriOne</h2>
        <p>ContriOne is designed for developers who contribute to multiple open source projects across various platforms. Our mission is to provide a centralized hub where you can track, showcase, and analyze your contributions, making it easier to manage your open source portfolio and highlight your impact in the developer community.</p>
      </section>
      <section id="contribute" className="contribute">
        <h2>Contribute to ContriOne</h2>
        <p>We welcome contributions to make ContriOne even better! Here's how you can get involved:</p>
        <ol>
          <li>Fork the repository you want to contribute to (frontend or backend).</li>
          <li>Create a new branch for your feature or bug fix.</li>
          <li>Make your changes and commit them with a clear, descriptive message.</li>
          <li>Push your changes to your fork.</li>
          <li>Submit a pull request to the main repository.</li>
        </ol>
        <p>For more detailed information, check out our contribution guidelines in the respective repositories:</p>
        <ul>
          <li><a href="https://github.com/yourusername/frontend-repo" target="_blank" rel="noopener noreferrer">Frontend Repository</a></li>
          <li><a href="https://github.com/yourusername/backend-repo" target="_blank" rel="noopener noreferrer">Backend Repository</a></li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;