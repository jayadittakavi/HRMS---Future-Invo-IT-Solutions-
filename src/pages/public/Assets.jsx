import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaLaptop, FaDesktop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Assets = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-primary text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Asset Management</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Track and manage your company's physical assets efficiently.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Keep track of laptops, monitors, software licenses, and other equipment assigned to employees. Ensure accountability and streamline asset allocation.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaLaptop />, title: "Laptop Tracking", desc: "Monitor laptop assignments and specifications." },
                            { icon: <FaDesktop />, title: "Desktop Management", desc: "Manage office desktops and peripherals." },
                            { icon: <FaTabletAlt />, title: "Mobile Devices", desc: "Track tablets and smartphones distributed to staff." },
                            { icon: <FaMobileAlt />, title: "Software Licenses", desc: "Manage software subscriptions and keys." }
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

export default Assets;
