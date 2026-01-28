import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-5 bg-dark text-white border-top border-secondary">
            <div className="container px-5 pt-4">
                <div className="row g-4 mb-5">
                    {/* Column 1: Quick Links */}
                    <div className="col-lg-3 col-6">
                        <h5 className="fw-bold mb-4">Quick Links</h5>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/docs" className="text-white-50 text-decoration-none hover-white">Documentation</Link></li>
                            <li className="mb-2"><Link to="/features" className="text-white-50 text-decoration-none hover-white">Features</Link></li>
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Blog</a></li>
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Sitemap</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Discover */}
                    <div className="col-lg-3 col-6">
                        <h5 className="fw-bold mb-4">Discover Future Invo</h5>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">What is Future Invo?</a></li>
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Success Stories</a></li>
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Compare Competitors</a></li>
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Client Locations</a></li>
                            <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none hover-white">Support</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Features */}
                    <div className="col-lg-3 col-6">
                        <h5 className="fw-bold mb-4">Features</h5>
                        <ul className="list-unstyled text-muted small">
                            <li className="mb-2"><Link to="/assets" className="text-white-50 text-decoration-none hover-white">Assets</Link></li>
                            <li className="mb-2"><Link to="/attendance" className="text-white-50 text-decoration-none hover-white">Attendance</Link></li>
                            <li className="mb-2"><Link to="/employees" className="text-white-50 text-decoration-none hover-white">Employee</Link></li>
                            <li className="mb-2"><Link to="/leaves" className="text-white-50 text-decoration-none hover-white">Leave</Link></li>
                            <li className="mb-2"><Link to="/onboarding" className="text-white-50 text-decoration-none hover-white">Onboarding</Link></li>
                            <li className="mb-2"><Link to="/payroll" className="text-white-50 text-decoration-none hover-white">Payroll</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Source & Legal */}
                    <div className="col-lg-3 col-6">
                        <h5 className="fw-bold mb-4">Source</h5>
                        <ul className="list-unstyled text-muted small mb-4">
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">GitHub</a></li>
                        </ul>

                        <h5 className="fw-bold mb-4">Legal</h5>
                        <ul className="list-unstyled text-muted small mb-4">
                            <li className="mb-2"><a href="#!" className="text-white-50 text-decoration-none hover-white">Privacy Policy</a></li>
                        </ul>

                        {/* App Store Buttons Placeholder */}
                        <div className="d-flex flex-column gap-2 mt-4">
                            <button className="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center" style={{ width: '140px', opacity: 0.8 }}>
                                <i className="fab fa-google-play me-2"></i> Google Play
                            </button>
                            <button className="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center" style={{ width: '140px', opacity: 0.8 }}>
                                <i className="fab fa-apple me-2"></i> App Store
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary opacity-25" />

                {/* Bottom Bar */}
                <div className="row align-items-center justify-content-between pt-3 pb-2">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <p className="small text-white-50 m-0">
                            © 2026 Future Invo HRMS. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <span className="fw-bold fs-5">⚡ Future Invo</span>
                        </div>
                    </div>
                    <div className="col-md-4 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3 text-white-50">
                            <a href="#!" className="text-white-50 hover-white"><i className="fab fa-facebook"></i> FB</a>
                            <a href="#!" className="text-white-50 hover-white"><i className="fab fa-twitter"></i> X</a>
                            <a href="#!" className="text-white-50 hover-white"><i className="fab fa-linkedin"></i> IN</a>
                            <a href="#!" className="text-white-50 hover-white"><i className="fab fa-github"></i> GH</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
