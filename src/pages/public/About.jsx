import React from 'react';
import Navbar from "../../components/layout/Navbar";
import hrmsImage from "../../assets/images/hrms_what.png";

import Footer from "../../components/layout/Footer";

const About = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1">
                <div className="container py-5 my-5">
                    <div className="row align-items-center gx-5">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold text-primary mb-4">About Future Invo</h1>
                            <p className="lead text-secondary mb-4">
                                Future Invo IT Solutions is a forward-thinking technology company dedicated to simplifying business operations through innovative software solutions.
                            </p>
                            <p className="text-secondary mb-4">
                                Founded in 2024, our mission is to empower organizations of all sizes with tools that enhance productivity, foster employee engagement, and drive growth. We believe that technology should be an enabler, not a barrier.
                            </p>
                            <p className="text-secondary">
                                Our HRMS platform is the result of extensive research and collaboration with HR professionals to address the real-world challenges faced by modern teams.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img
                                src={hrmsImage}
                                alt="Future Invo HRMS"
                                className="img-fluid rounded-4 shadow-lg hover-scale"
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="row mt-5 pt-5 text-center">
                        <div className="col-12 mb-5">
                            <h2 className="fw-bold">Our Core Values</h2>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-main">Innovation</h4>
                                <p className="text-secondary mt-2">Constantly evolving to meet the changing needs of the workplace.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-main">Integrity</h4>
                                <p className="text-secondary mt-2">Building trust through transparent and ethical business practices.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="h-100 p-4 border rounded-4">
                                <h4 className="fw-bold text-main">Customer Success</h4>
                                <p className="text-secondary mt-2">Your growth and satisfaction are the ultimate measures of our success.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
