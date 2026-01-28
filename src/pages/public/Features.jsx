import React from 'react';
import Navbar from "../../components/layout/Navbar";
import { FaUsers, FaCalendarCheck, FaMoneyBillWave, FaUmbrellaBeach, FaLaptop, FaChartLine, FaLock, FaMobileAlt, FaChartPie } from 'react-icons/fa';
import Footer from "../../components/layout/Footer";

import featuresBg from "../../assets/images/features-bg.png";

const Features = () => {
    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1">
                <div
                    className="text-white py-5"
                    style={{
                        backgroundImage: `url(${featuresBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="container py-5 text-center">
                        <h1 className="display-4 fw-bold mb-3">Powerful HR Features</h1>
                        <p className="lead opacity-75 mb-0 max-w-2xl mx-auto">Discover the tools that will transform your workforce management.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4">
                        {[
                            { icon: <FaUsers />, title: "Employee Database", desc: "Securely store and manage comprehensive employee records, documents, and history in one place." },
                            { icon: <FaCalendarCheck />, title: "Attendance Tracking", desc: "Real-time attendance monitoring with geofencing, biometric integration support, and detailed reports." },
                            { icon: <FaMoneyBillWave />, title: "Payroll Processing", desc: "Automate salary calculations, tax deductions, and payslip generation with zero errors." },
                            { icon: <FaUmbrellaBeach />, title: "Leave Management", desc: "Streamline leave requests and approvals with automated balance tracking and calendar views." },
                            { icon: <FaLaptop />, title: "Asset Management", desc: "Track company assets, assign them to employees, and monitor their condition and return dates." },
                            { icon: <FaChartLine />, title: "Performance Reviews", desc: "Conduct 360-degree performance appraisals and set goals to boost employee growth." },
                            { icon: <FaLock />, title: "Role-Based Access", desc: "Granular permission controls ensure data security and appropriate access levels for every role." },
                            { icon: <FaMobileAlt />, title: "Mobile Friendly", desc: "Access the HRMS on the go with our fully responsive mobile-first design interface." },
                            { icon: <FaChartPie />, title: "Smart Analytics", desc: "Gain actionable insights into your workforce trends with interactive dashboards and custom reports." }
                        ].map((feature, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift transition-all">
                                    <div className="card-body p-4">
                                        <div className="display-6 mb-3 text-primary">{feature.icon}</div>
                                        <h3 className="h5 fw-bold text-dark mb-2">{feature.title}</h3>
                                        <p className="text-muted mb-0">{feature.desc}</p>
                                    </div>
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

export default Features;
