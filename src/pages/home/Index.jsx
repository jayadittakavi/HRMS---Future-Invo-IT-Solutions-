import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <div className="bg-white text-dark">
      <Navbar />

      {/* Hero Section */}
      <header className="py-5 mb-5" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container px-5 my-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-4 fw-bolder text-dark mb-2">The Modern HR Solution for Growing Companies</h1>
                <p className="lead fw-normal text-muted mb-4">Streamline your workforce, manage assets, and boost productivity with our all-in-one HR Management System designed for the future of work.</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <Link className="btn btn-primary btn-lg px-4 me-sm-3 rounded-pill fw-bold" to="/signup">Get Started Free</Link>
                  <Link className="btn btn-outline-dark btn-lg px-4 rounded-pill" to="/login">View Demo</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <div className="p-4 rounded-circle bg-white shadow-lg mx-auto border" style={{ width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <div className="display-1 mb-2">🚀</div>
                  <h3 className="fw-bold text-primary">98%</h3>
                  <p className="text-muted">Efficiency Boost</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-5 border-bottom">
        <div className="container px-5 my-5">
          <div className="row gx-5 justify-content-center text-center">
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <div className="p-3">
                <h2 className="fw-bolder text-primary display-5">500+</h2>
                <p className="text-muted mb-0">Companies Trusted</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <div className="p-3">
                <h2 className="fw-bolder text-primary display-5">50k+</h2>
                <p className="text-muted mb-0">Employees Managed</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <div className="p-3">
                <h2 className="fw-bolder text-primary display-5">99.9%</h2>
                <p className="text-muted mb-0">Uptime Guaranteed</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="p-3">
                <h2 className="fw-bolder text-primary display-5">24/7</h2>
                <p className="text-muted mb-0">Premium Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-5 bg-light" id="features">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder text-dark">Everything you need</h2>
            <p className="lead fw-normal text-muted mb-0">Powerful features to manage your organization effectively</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow border-0 rounded-4 bg-white text-dark">
                <div className="card-body p-5">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block" style={{ fontSize: '2rem' }}>👥</div>
                  <h2 className="h4 fw-bold">Employee Management</h2>
                  <p className="mb-0 text-muted">Centralized database for all your employee records, documents, and history.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow border-0 rounded-4 bg-white text-dark">
                <div className="card-body p-5">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block" style={{ fontSize: '2rem' }}>🏢</div>
                  <h2 className="h4 fw-bold">Company Structure</h2>
                  <p className="mb-0 text-muted">Manage multiple branches, departments, and roles with ease and flexibility.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card h-100 shadow border-0 rounded-4 bg-white text-dark">
                <div className="card-body p-5">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block" style={{ fontSize: '2rem' }}>💻</div>
                  <h2 className="h4 fw-bold">Asset Tracking</h2>
                  <p className="mb-0 text-muted">Keep track of company assets assigned to employees, from laptops to licenses.</p>
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
