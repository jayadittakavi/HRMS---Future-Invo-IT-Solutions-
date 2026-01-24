import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1>
            Empower Your Team with <br /> <span>Future Invo HRMS</span>
          </h1>
          <p>
            Manage employees, payroll, attendance, performance, and growth —
            all from one powerful HRMS platform.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn primary-btn">
              Login
            </Link>
            <Link to="/contact" className="btn secondary-btn">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* WHY HRMS */}
      <section className="why-hrms">
        <div className="container">
          <h2>Why Choose Our HRMS?</h2>
          <div className="card-grid">
            <div className="info-card">
              <h4>Employee Management</h4>
              <p>Centralized employee data with role-based access.</p>
            </div>
            <div className="info-card">
              <h4>Payroll Automation</h4>
              <p>Accurate salary, tax, deductions & payslips.</p>
            </div>
            <div className="info-card">
              <h4>Leave & Attendance</h4>
              <p>Track leaves, attendance & approvals in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
          <h2>Core Features</h2>
          <div className="card-grid">
            <div className="feature-card">Role Based Dashboards</div>
            <div className="feature-card">Company & Branch Setup</div>
            <div className="feature-card">HR & Manager Controls</div>
            <div className="feature-card">Secure Authentication</div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section">
        <div className="container">
          <h2>Simple Pricing</h2>
          <div className="card-grid">
            <div className="price-card">
              <h4>Starter</h4>
              <p>₹0 / month</p>
              <span>Up to 10 Employees</span>
            </div>
            <div className="price-card highlight">
              <h4>Business</h4>
              <p>₹999 / month</p>
              <span>Up to 200 Employees</span>
            </div>
            <div className="price-card">
              <h4>Enterprise</h4>
              <p>Custom</p>
              <span>Unlimited Employees</span>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="subscribe-section">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe for HRMS updates & new features</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Future Invo IT Solutions — HRMS Platform</p>
      </footer>
    </>
  );
};

export default Home;
