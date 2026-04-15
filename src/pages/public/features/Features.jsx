import React, { useState } from 'react';
import './Features.css';
import Navbar from '../home/Navbar';
import featuresBg from '../../../assets/images/features.jpg';
import { FaCheckCircle, FaTimesCircle, FaCrown, FaClock, FaUsers, FaCalendarCheck, FaMoneyBillWave, FaSuitcaseRolling, FaLaptop, FaChartLine, FaShieldAlt, FaMobileAlt, FaChartPie, FaRocket, FaExchangeAlt, FaCog } from 'react-icons/fa';

const Features = () => {
    // Mock Admin Mode (In real app, derive from useAuth)
    const isAdmin = true;

    // Mock Companies for dropdown
    const companies = [
        { id: 1, name: 'TrickuWeb Technologies' },
        { id: 2, name: 'InnovateSoft Solutions' },
        { id: 3, name: 'StartUp Inc' },
    ];

    const [selectedCompany, setSelectedCompany] = useState(companies[0].id);

    // Initial Features Data with "Configuration" state
    const [features, setFeatures] = useState([
        { id: 'emp_db', icon: <FaUsers />, title: "Employee Database", desc: "Securely store and manage comprehensive employee records, documents, and history in one place.", enabled: true, mode: 'paid', color: '#534789' },
        { id: 'attendance', icon: <FaCalendarCheck />, title: "Attendance Tracking", desc: "Real-time attendance monitoring with geofencing, biometric integration support, and detailed reports.", enabled: true, mode: 'paid', color: '#434777' },
        { id: 'payroll', icon: <FaMoneyBillWave />, title: "Payroll Processing", desc: "Automate salary calculations, tax deductions, and payslip generation with zero errors.", enabled: false, mode: 'trial', color: '#405580' },
        { id: 'leave', icon: <FaSuitcaseRolling />, title: "Leave Management", desc: "Streamline leave requests and approvals with automated balance tracking and calendar views.", enabled: true, mode: 'paid', color: '#657DAA' },
        { id: 'assets', icon: <FaLaptop />, title: "Asset Management", desc: "Track company assets, assign them to employees, and monitor their condition and return dates.", enabled: false, mode: 'paid', color: '#65B1C9' },
        { id: 'reviews', icon: <FaChartLine />, title: "Performance Reviews", desc: "Conduct 360-degree performance appraisals and set goals to boost employee growth.", enabled: false, mode: 'paid', color: '#87DDDD' },
        { id: 'access', icon: <FaShieldAlt />, title: "Role-Based Access", desc: "Granular permission controls ensure data security and appropriate access levels for every role.", enabled: true, mode: 'paid', color: '#534789' },
        { id: 'mobile', icon: <FaMobileAlt />, title: "Mobile Friendly", desc: "Access the HRMS on the go with our fully responsive mobile-first design interface.", enabled: true, mode: 'trial', color: '#65B1C9' },
        { id: 'analytics', icon: <FaChartPie />, title: "Smart Analytics", desc: "Gain actionable insights into your workforce trends with interactive dashboards and custom reports.", enabled: false, mode: 'paid', color: '#405580' }
    ]);

    // Handlers
    const toggleFeature = (id) => {
        setFeatures(features.map(f =>
            f.id === id ? { ...f, enabled: !f.enabled } : f
        ));
    };

    const toggleMode = (id) => {
        setFeatures(features.map(f =>
            f.id === id ? { ...f, mode: f.mode === 'trial' ? 'paid' : 'trial' } : f
        ));
    };

    return (
        <div className="features-container d-flex flex-column" style={{
            backgroundImage: `url(${featuresBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <Navbar />

            <main className="flex-grow-1">
                {/* Header Section */}
                <div className="features-header text-center pt-5 pb-4">
                    <div className="container">
                        <h1 className="features-title fw-bold display-4">Powerful HR Features</h1>
                        <p className="features-subtitle text-white opacity-75 lead">
                            Configure and customize the perfect HR stack for your organization.
                        </p>
                    </div>
                </div>

                {/* Configuration Bar for Admin */}
                {isAdmin && (
                    <div className="container mb-5">
                        <div className="card border-0 shadow-lg glass-panel p-4">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                <div className="d-flex align-items-center gap-3 w-100">
                                    <div className="rounded-circle bg-white p-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                        <span role="img" aria-label="settings" style={{ fontSize: '1.5rem' }}>⚙️</span>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 text-white fw-bold">Feature Configuration</h5>
                                        <small className="text-white-50">Manage active modules for companies</small>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2 w-100 justify-content-md-end">
                                    <label className="text-white fw-bold me-2 text-nowrap">Select Company:</label>
                                    <select
                                        className="form-select form-select-lg border-0 shadow-sm"
                                        style={{ maxWidth: '300px' }}
                                        value={selectedCompany}
                                        onChange={(e) => setSelectedCompany(e.target.value)}
                                    >
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container pb-5">
                    <div className="row g-4">
                        {features.map((feature) => (
                            <div className="col-md-6 col-lg-4" key={feature.id}>
                                <div
                                    className={`card h-100 feature-glass-card border-0 shadow-sm p-0 overflow-hidden transition-all ${!feature.enabled && isAdmin ? 'opacity-75 grayscale-effect' : ''}`}
                                    style={{
                                        position: 'relative',
                                        transform: feature.enabled ? 'scale(1)' : 'scale(0.98)',
                                        border: feature.enabled ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    {/* Admin Controls Overlay / Header */}
                                    {isAdmin && (
                                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light bg-black bg-opacity-25">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`switch-${feature.id}`}
                                                    checked={feature.enabled}
                                                    onChange={() => toggleFeature(feature.id)}
                                                    style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
                                                />
                                                <label className="form-check-label text-white ms-2 small fw-bold" htmlFor={`switch-${feature.id}`}>
                                                    {feature.enabled ? 'ENABLED' : 'DISABLED'}
                                                </label>
                                            </div>
                                            {feature.enabled && (
                                                <button
                                                    onClick={() => toggleMode(feature.id)}
                                                    className={`btn btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 ${feature.mode === 'paid' ? 'btn-warning text-dark' : 'btn-info text-white'}`}
                                                    style={{ fontSize: '0.75rem' }}
                                                >
                                                    {feature.mode === 'paid' ? <FaCrown /> : <FaClock />}
                                                    {feature.mode === 'paid' ? 'PAID' : 'TRIAL'}
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    <div className="p-4 pt-4">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="feature-icon-wrapper" style={{
                                                background: feature.enabled ? `${feature.color}15` : '#f1f5f9',
                                                color: feature.enabled ? feature.color : '#94a3b8'
                                            }}>
                                                {feature.icon}
                                            </div>
                                            <div className="status-badge-container">
                                                {feature.enabled ? (
                                                    <div className="badge-glow scale-in">
                                                        <FaCheckCircle className="text-success" />
                                                    </div>
                                                ) : (
                                                    <FaTimesCircle className="text-muted opacity-25" />
                                                )}
                                            </div>
                                        </div>
                                        <h3 className={`h5 fw-bold mb-3 ${feature.enabled ? 'text-dark' : 'text-secondary'}`} style={{ letterSpacing: '-0.02em' }}>
                                            {feature.title}
                                        </h3>
                                        <p className={`mb-0 lh-base ${feature.enabled ? 'text-secondary' : 'text-muted opacity-50'}`} style={{ fontSize: '0.92rem' }}>
                                            {feature.desc}
                                        </p>
                                    </div>

                                    {/* Status Footer */}
                                    {feature.enabled && (
                                        <div className="p-2 px-4 bg-white bg-opacity-10 mt-auto">
                                            <small className="text-warning small">
                                                {feature.mode === 'paid' ? '✨ Full Access Unlocked' : '⏳ 14-Day Trial Active'}
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white py-4 mt-auto opacity-90 border-top border-secondary">
                <div className="container text-center">
                    <small>© 2026 WorkSphrer HRMS. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default Features;
