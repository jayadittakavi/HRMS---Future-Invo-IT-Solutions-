import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaUserPlus, FaFileContract, FaUserTie, FaAddressCard } from 'react-icons/fa';

const EmployeesInfo = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-info text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Employee Directory</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Centralized database for all employee records.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Manage employee profiles, contracts, benefits, and personal details securely. Access key information anytime, anywhere.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaUserTie />, title: "Detailed Profiles", desc: "Store comprehensive employee data, from contact info to skills." },
                            { icon: <FaFileContract />, title: "Contract Management", desc: "Manage employment contracts, renewals, and terminations." },
                            { icon: <FaAddressCard />, title: "Digital ID Cards", desc: "Generate and manage digital identification cards." },
                            { icon: <FaUserPlus />, title: "Recruitment Pipeline", desc: "Track applicants and streamline the hiring process." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-info mb-3">{item.icon}</div>
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

export default EmployeesInfo;
