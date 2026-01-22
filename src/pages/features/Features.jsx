import React from 'react';
import './Features.css';
import Navbar from '../home/Navbar';
import featuresBg from '../../assets/images/features-bg.png';

const Features = () => {
    return (
        <div className="features-container d-flex flex-column" style={{
            backgroundImage: `url(${featuresBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            <Navbar />

            <main className="flex-grow-1">
                {/* Transparent Header Section */}
                <div className="features-header">
                    <div className="container">
                        <h1 className="features-title">Powerful HR Features</h1>
                        <p className="features-subtitle">Discover the tools that will transform your workforce management.</p>
                    </div>
                </div>

                <div className="container py-5">
                    <div className="row g-4">
                        {[
                            { icon: "👥", title: "Employee Database", desc: "Securely store and manage comprehensive employee records, documents, and history in one place." },
                            { icon: "📅", title: "Attendance Tracking", desc: "Real-time attendance monitoring with geofencing, biometric integration support, and detailed reports." },
                            { icon: "💰", title: "Payroll Processing", desc: "Automate salary calculations, tax deductions, and payslip generation with zero errors." },
                            { icon: "🏝️", title: "Leave Management", desc: "Streamline leave requests and approvals with automated balance tracking and calendar views." },
                            { icon: "💻", title: "Asset Management", desc: "Track company assets, assign them to employees, and monitor their condition and return dates." },
                            { icon: "📈", title: "Performance Reviews", desc: "Conduct 360-degree performance appraisals and set goals to boost employee growth." },
                            { icon: "🔒", title: "Role-Based Access", desc: "Granular permission controls ensure data security and appropriate access levels for every role." },
                            { icon: "📱", title: "Mobile Friendly", desc: "Access the HRMS on the go with our fully responsive mobile-first design interface." },
                            { icon: "📊", title: "Smart Analytics", desc: "Gain actionable insights into your workforce trends with interactive dashboards and custom reports." }
                        ].map((feature, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 feature-glass-card border-0 shadow-sm p-4">
                                    <div className="feature-icon-box">
                                        <span role="img" aria-label={feature.title}>{feature.icon}</span>
                                    </div>
                                    <h3 className="h5 fw-bold text-dark mb-2">{feature.title}</h3>
                                    <p className="text-muted mb-0">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white py-4 mt-auto opacity-90">
                <div className="container text-center">
                    <small>© 2024 Future Invo HRMS. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default Features;
