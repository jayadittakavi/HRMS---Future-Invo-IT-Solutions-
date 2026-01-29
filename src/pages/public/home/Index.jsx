import React from "react";
import "./Home.css";
import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import sideImage1 from "../../../assets/images/hrm image.jpg";
import sideImage2 from "../../../assets/images/hrms_what.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
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
              <Link to="/signup" className="btn primary-btn">
                Get Started
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

        {/* WHAT IS HRMS */}
        <section className="what-is-hrms">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img src={sideImage1} alt="What is HRMS" className="img-fluid rounded-4 shadow-lg" style={{ width: '50%', display: 'block', margin: '0 auto' }} />
              </div>
              <div className="col-lg-6">
                <h2>What is HRMS?</h2>
                <p className="lead text-dark">
                  Human Resource Management System (HRMS) is a suite of software applications used to manage human resources and related processes throughout the employee lifecycle.
                </p>
                <p className="text-dark opacity-75">
                  An HRMS enables companies to focus on their people, not just paperwork. It bridges the gap between human resource management and information technology, automating manual tasks and organizing employee information in central repository.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY FUTURE INVO HRMS */}
        <section className="future-invo-value">
          <div className="container">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-lg-6">
                <img src={sideImage2} alt="Future Invo Value" className="img-fluid rounded-4 shadow-lg" style={{ width: '50%', display: 'block', margin: '0 auto' }} />
              </div>
              <div className="col-lg-6">
                <h2>Why Future Invo HRMS?</h2>
                <p className="lead text-dark">
                  We deliver more than just software. We provide a complete ecosystem for organizational growth.
                </p>
                <ul className="value-list">
                  <li>
                    <strong>🚀 Scalability:</strong> Grows with your business, from 10 to 10,000 employees.
                  </li>
                  <li>
                    <strong>🔒 Enterprise-Grade Security:</strong> Your data is protected with state-of-the-art encryption.
                  </li>
                  <li>
                    <strong>🎨 User-Centric Design:</strong> An intuitive interface that requires zero training.
                  </li>
                  <li>
                    <strong>📊 Actionable Insights:</strong> Real-time analytics to make data-driven decisions.
                  </li>
                </ul>
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
                <p className="price">₹0 <span>/ month</span></p>
                <div className="features-list">
                  <ul>
                    <li>Up to 10 Employees</li>
                    <li>Basic Employee Management</li>
                    <li>Attendance Tracking</li>
                    <li>Community Support</li>
                  </ul>
                </div>
                <p className="terms-note">*Terms: Free forever for small teams.</p>
              </div>
              <div className="price-card highlight">
                <div className="popular-badge">Most Popular</div>
                <h4>Business</h4>
                <p className="price">₹999 <span>/ month</span></p>
                <div className="features-list">
                  <ul>
                    <li>Up to 200 Employees</li>
                    <li>Complete Payroll Automation</li>
                    <li>Leave & Expense Management</li>
                    <li>Priority Email Support</li>
                    <li>99.9% Uptime SLA</li>
                  </ul>
                </div>
                <p className="terms-note">*Terms: Billed annually. Cancel anytime.</p>
              </div>
              <div className="price-card">
                <h4>Enterprise</h4>
                <p className="price">Custom</p>
                <div className="features-list">
                  <ul>
                    <li>Unlimited Employees</li>
                    <li>Advanced Analytics & Reports</li>
                    <li>Dedicated Account Manager</li>
                    <li>Custom API Integrations</li>
                    <li>On-premise Deployment Option</li>
                  </ul>
                </div>
                <p className="terms-note">*Terms: Contract based. Custom SLA.</p>
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

        <Footer />
      </div>
    </>
  );
};

export default Home;
