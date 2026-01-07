import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';
import logo from '../../assets/images/fislogo1.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="HRMS Logo" className="nav-logo" />
          <span>Future Invo HRMS</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="btn outline">Login</Link>
          <Link to="/signup" className="btn primary">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="home">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>The Modern HR Solution for Growing Service Companies</h1>
            <p>Streamline your workforce, manage assets, and boost productivity with our all-in-one HR Management System.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn primary lg">Get Started Free</Link>
              <Link to="/login" className="btn outline lg">View Demo</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-circle"></div>
            <div className="visual-card-1 floating">
              <span>98%</span>
              <p>Employee Satisfaction</p>
            </div>
            <div className="visual-card-2 floating-delayed">
              <span>New</span>
              <p>Asset Tracking</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Companies Trusted</p>
          </div>
          <div className="stat-card">
            <h3>50k+</h3>
            <p>Employees Managed</p>
          </div>
          <div className="stat-card">
            <h3>99.9%</h3>
            <p>Uptime Guaranteed</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Premium Support</p>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need</h2>
            <p>Powerful features to manage your organization effectively</p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <h3>Employee Management</h3>
              <p>Centralized database for all your employee records and documents.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏢</div>
              <h3>Company Structure</h3>
              <p>Manage multiple branches and departments with ease.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💻</div>
              <h3>Asset Tracking</h3>
              <p>Keep track of company assets assigned to employees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer" id="contact">
        <div className="container footer-content">
          <div className="footer-brand">
            <h4>Future Invo HRMS</h4>
            <p>© 2024 Future Invo IT Solutions. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
