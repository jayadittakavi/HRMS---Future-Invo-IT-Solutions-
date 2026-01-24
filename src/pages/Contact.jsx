import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1">
                <div className="container py-5 my-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center mb-5">
                            <h1 className="display-4 fw-bold text-dark mb-3">Get in Touch</h1>
                            <p className="lead text-muted">Have questions about our HRMS? We'd love to hear from you.</p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-5">
                                    <form>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">First Name</label>
                                                <input type="text" className="form-control bg-light" placeholder="John" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Last Name</label>
                                                <input type="text" className="form-control bg-light" placeholder="Doe" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Email Address</label>
                                                <input type="email" className="form-control bg-light" placeholder="john@example.com" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Message</label>
                                                <textarea className="form-control bg-light" rows="5" placeholder="How can we help you?"></textarea>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <button type="button" className="btn btn-primary btn-lg w-100 fw-bold rounded-pill">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mt-5 mt-lg-0 ps-lg-5">
                            <div className="mb-4">
                                <h4 className="fw-bold mb-3">Contact Information</h4>
                                <p className="text-muted mb-1">📍 123 Innovation Drive, Tech City, TC 90210</p>
                                <p className="text-muted mb-1">📧 support@futureinvo.com</p>
                                <p className="text-muted">📞 +1 (555) 123-4567</p>
                            </div>

                            <hr className="my-4" />

                            <div>
                                <h4 className="fw-bold mb-3">Office Hours</h4>
                                <p className="d-flex justify-content-between text-muted mb-1">
                                    <span>Monday - Friday:</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </p>
                                <p className="d-flex justify-content-between text-muted">
                                    <span>Saturday - Sunday:</span>
                                    <span>Closed</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
