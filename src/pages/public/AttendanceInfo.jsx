import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaFingerprint, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const AttendanceInfo = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1 pt-5">
                <div className="bg-success text-white py-5 mb-5">
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Attendance System</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Real-time attendance tracking for a productive workforce.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <p className="lead text-secondary mb-5">
                                Ensure smooth operations with biometric integration, geo-fencing, and manual overrides. Simplify attendance reporting and payroll accuracy.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {[
                            { icon: <FaFingerprint />, title: "Biometric Integration", desc: "Seamlessly integrate with biometric devices for punch-in." },
                            { icon: <FaMapMarkerAlt />, title: "Geo-Fencing", desc: "Restrict attendance marking to designated office zones." },
                            { icon: <FaClock />, title: "Overtime Tracking", desc: "Automatically calculate and approve overtime hours." },
                            { icon: <FaCalendarAlt />, title: "Work Schedules", desc: "Manage shifts, holidays, and weekly offs effortlessly." }
                        ].map((item, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card h-100 border-0 shadow-sm p-4 text-center">
                                    <div className="display-6 text-success mb-3">{item.icon}</div>
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

export default AttendanceInfo;
