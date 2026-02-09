import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaBook, FaCode, FaQuestionCircle, FaVideo } from 'react-icons/fa';

const Docs = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-dark text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Documentation</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Guides, tutorials, and API references.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaBook />, title: "User Guides", desc: "Step-by-step instructions for all features." },
                            { icon: <FaCode />, title: "API Reference", desc: "Integration details for developers." },
                            { icon: <FaVideo />, title: "Video Tutorials", desc: "Watch and learn how to use the HRMS." },
                            { icon: <FaQuestionCircle />, title: "FAQs", desc: "Answers to common questions." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-dark mb-3">{item.icon}</div>
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

export default Docs;
