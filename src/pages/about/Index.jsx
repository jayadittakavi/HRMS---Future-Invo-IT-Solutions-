import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1">
                <div className="container py-5 my-5">
                    <div className="row align-items-center gx-5">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold text-primary mb-4">About Future Invo</h1>
                            <p className="lead text-muted mb-4">
                                Future Invo IT Solutions is a forward-thinking technology company dedicated to simplifying business operations through innovative software solutions.
                            </p>
                            <p className="text-muted mb-4">
                                Founded in 2024, our mission is to empower organizations of all sizes with tools that enhance productivity, foster employee engagement, and drive growth. We believe that technology should be an enabler, not a barrier.
                            </p>
                            <p className="text-muted">
                                Our HRMS platform is the result of extensive research and collaboration with HR professionals to address the real-world challenges faced by modern teams.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-5 bg-light rounded-4 shadow-sm text-center">
                                <div className="display-1 text-primary mb-3">🚀</div>
                                <h3 className="fw-bold">Our Vision</h3>
                                <p className="text-muted">To be the global standard for intuitive and powerful workforce management solutions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 pt-5 text-center">
                        <div className="col-12 mb-5">
                            <h2 className="fw-bold">Our Core Values</h2>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-dark">Innovation</h4>
                                <p className="text-muted mt-2">Constantly evolving to meet the changing needs of the workplace.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-dark">Integrity</h4>
                                <p className="text-muted mt-2">Building trust through transparent and ethical business practices.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-dark">Customer Success</h4>
                                <p className="text-muted mt-2">Your growth and satisfaction are the ultimate measures of our success.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white py-4 mt-auto">
                <div className="container text-center">
                    <small>© 2024 Future Invo HRMS. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default About;
