import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaUserCheck, FaBookOpen, FaTasks, FaBullhorn } from 'react-icons/fa';

const OnboardingInfo = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-primary text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Seamless Onboarding</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Welcome your new hires with a digital-first experience.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Ensure a standardized and engaging process for every new employee. Automate paperwork, task assignments, and orientation.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaUserCheck />, title: "Pre-boarding", desc: "Engage candidates before they join." },
                            { icon: <FaBookOpen />, title: "Digital Handbook", desc: "Share company policies and culture instantly." },
                            { icon: <FaTasks />, title: "Task Checklists", desc: "Assign setup tasks to IT, HR, and Managers." },
                            { icon: <FaBullhorn />, title: "Team Announcements", desc: "Introduce new members to the whole team." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-primary mb-3">{item.icon}</div>
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p className="text-secondary small">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OnboardingInfo;
