import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaCalendarTimes, FaPlane, FaHospitalUser, FaBabyCarriage } from 'react-icons/fa';

const LeavesInfo = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-warning text-dark py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Leave Management</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Automated leave tracking and approval workflows.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Simplify the leave application process. Employees can request leaves, check balances, and managers can approve or reject with a click.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaCalendarTimes />, title: "Leave Policies", desc: "Define custom leave policies for different roles." },
                            { icon: <FaPlane />, title: "Vacation Planning", desc: "Plan and approve long-term leaves efficiently." },
                            { icon: <FaHospitalUser />, title: "Sick Leaves", desc: "Manage medical leaves with document uploads." },
                            { icon: <FaBabyCarriage />, title: "Maternity/Paternity", desc: "Handle special leave types with ease." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-warning mb-3">{item.icon}</div>
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

export default LeavesInfo;
