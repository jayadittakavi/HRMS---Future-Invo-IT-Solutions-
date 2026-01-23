import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from './Navbar'; // Changed import path to match local file structure if they are in same dir? No, wait. 
// Step 45 showed: import Navbar from '../../components/Navbar'; but Step 44 showed Navbar is in src/pages/home/Navbar.jsx
// Step 80 list_dir shows Navbar.jsx is in src/pages/home.
// The Index.jsx file in Step 45 had: import Navbar from '../../components/Navbar';
// We should check if ../../components/Navbar exists or if we should import from ./Navbar. 
// Given the output of Step 84 (Navbar in home dir) and Step 44, it seems Navbar is in the same directory.
// However, the original code imported it from components. 
// Let's stick to the original import unless it was wrong. 
// WAIT. Step 44 showed Navbar.jsx file path: src/pages/home/Navbar.jsx.
// Step 45 showed Index.jsx file path: src/pages/home/Index.jsx.
// So they are siblings. The import `../../components/Navbar` looks wrong if Navbar is in the same folder.
// But the user might have a duplicated Navbar or moved it.
// I will just preserve the existing import if it works, or safer: update style only.
// Actually, looking at Step 45 content: `import Navbar from '../../components/Navbar';`
// Check Step 80: components folder is not visible in `src/pages`. It should be in `src`.
// I'll trust the modification request scope which is CSS. I'll leave imports alone unless they break.
// But the user said "use vanilla css for all pages".
// I will stick to styles.

import './Home.css';

const Home = () => {
  return (
    <div className="home-container text-dark">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-header">
        <div className="container px-5">
          <div className="text-center mb-5">
            <h1 className="hero-title">
              Empower <span className="text-primary">your team</span><br />
              with Future Invo HRMS
            </h1>
            <p className="hero-subtitle">
              Join the ranks of teams who've transformed their productivity, improved communication, and exceeded their project goals. It's time to make every project a success story.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow-sm" to="/signup">Get Started</Link>
            </div>
          </div>

          {/* Floating Glass Cards Visualization */}
          <div className="floating-cards-container d-none d-lg-flex">

            {/* Card 1: Project Statistic */}
            <div className="glass-card project-stat">
              <div className="d-flex w-100 justify-content-between mb-2">
                <span className="glass-card-title">Attendance</span>
                <span className="small text-muted">Today</span>
              </div>
              <div className="circle-chart"></div>
              <h3 className="fw-bold mt-2">92%</h3>
              <p className="small text-muted mb-0">Present Today</p>
              <div className="d-flex justify-content-between w-100 mt-3 px-2">
                <div className="text-start">
                  <div className="small fw-bold">On Time</div>
                  <div className="small text-success">85%</div>
                </div>
                <div className="text-end">
                  <div className="small fw-bold">Late</div>
                  <div className="small text-warning">7%</div>
                </div>
              </div>
            </div>

            {/* Card 2: Main Featured Card (Usability Testing style) */}
            <div className="glass-card usability-testing p-4 shadow-lg">
              <div className="d-flex justify-content-between mb-4 text-white-50">
                <span className="small">Upcoming Events</span>
                <span>...</span>
              </div>
              <div className="d-flex gap-2 mb-3">
                <div className="bg-white bg-opacity-25 p-2 rounded text-center">
                  <div className="small">13 Mar</div>
                  <div className="fw-bold">Meeting</div>
                </div>
                <div className="bg-white bg-opacity-25 p-2 rounded text-center">
                  <div className="small">14 Mar</div>
                  <div className="fw-bold">Review</div>
                </div>
                <div className="bg-white bg-opacity-10 p-2 rounded text-center text-white-50">
                  <div className="small">15 Mar</div>
                  <div className="fw-bold">Holiday</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="small fw-bold text-decoration-line-through text-white-50">Sprint Planning</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="small fw-bold text-decoration-line-through text-white-50">Team Sync</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="border border-white border-2 rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                  <span className="small fw-bold">Project Review</span>
                </div>
              </div>
            </div>

            {/* Card 3: Design System / Stats */}
            <div className="d-flex flex-column gap-3">
              <div className="glass-card design-system">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="glass-card-title mb-0">System Status</span>
                  <span className="badge bg-danger bg-opacity-10 text-danger">High Load</span>
                </div>
                <p className="small text-muted">The HRMS system is running smoothly with high engagement.</p>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="glass-card team-meeting">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="glass-card-title mb-0">Team Meeting</span>
                  <button className="btn btn-sm btn-outline-dark rounded-pill px-3">Join</button>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="small text-muted me-auto">Google Meet</div>
                  <div className="small text-primary text-truncate" style={{ maxWidth: '100px' }}>meet.google.com/abc...</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Features Preview */}
      <section className="py-5 section-glass" id="features">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder text-dark">Everything you need</h2>
            <p className="lead fw-normal text-muted mb-0">Powerful features to manage your organization effectively</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-4 glass-card text-dark">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block feature-icon-wrapper">👥</div>
                  <h2 className="h4 fw-bold">Employee Management</h2>
                  <p className="mb-4 text-muted flex-grow-1">Centralized database for all your employee records, documents, and history.</p>
                  <Link to="/employees" className="text-primary text-decoration-none fw-bold small d-inline-flex align-items-center gap-1 hover-arrow">
                    Learn more <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-4 glass-card text-dark">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block feature-icon-wrapper">🏢</div>
                  <h2 className="h4 fw-bold">Company Structure</h2>
                  <p className="mb-4 text-muted flex-grow-1">Manage multiple branches, departments, and roles with ease and flexibility.</p>
                  <Link to="/setup-organization" className="text-primary text-decoration-none fw-bold small d-inline-flex align-items-center gap-1 hover-arrow">
                    Learn more <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-4 glass-card text-dark">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block feature-icon-wrapper">💻</div>
                  <h2 className="h4 fw-bold">Asset Tracking</h2>
                  <p className="mb-4 text-muted flex-grow-1">Keep track of company assets assigned to employees, from laptops to licenses.</p>
                  <Link to="/assets" className="text-primary text-decoration-none fw-bold small d-inline-flex align-items-center gap-1 hover-arrow">
                    Learn more <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark text-white">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Future Invo HRMS 2024</div></div>
            <div className="col-auto">
              <a className="link-light small" href="#!">Privacy</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Terms</a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
