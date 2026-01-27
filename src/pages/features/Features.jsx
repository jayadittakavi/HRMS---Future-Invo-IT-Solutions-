import React, { useState } from 'react';
import './Features.css';
import Navbar from '../home/Navbar';
import featuresBg from '../../assets/images/features-bg.png';
import { FaCheckCircle, FaTimesCircle, FaCrown, FaClock } from 'react-icons/fa';

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
        { id: 'emp_db', icon: "👥", title: "Employee Database", desc: "Securely store and manage comprehensive employee records.", enabled: true, mode: 'paid' },
        { id: 'attendance', icon: "📅", title: "Attendance Tracking", desc: "Real-time attendance monitoring with geofencing.", enabled: true, mode: 'paid' },
        { id: 'payroll', icon: "💰", title: "Payroll Processing", desc: "Automate salary calculations and tax deductions.", enabled: false, mode: 'trial' },
        { id: 'leave', icon: "🏝️", title: "Leave Management", desc: "Streamline leave requests and approvals.", enabled: true, mode: 'paid' },
        { id: 'assets', icon: "💻", title: "Asset Management", desc: "Track company assets and assignments.", enabled: false, mode: 'paid' },
        { id: 'reviews', icon: "📈", title: "Performance Reviews", desc: "Conduct 360-degree performance appraisals.", enabled: false, mode: 'paid' },
        { id: 'access', icon: "🔒", title: "Role-Based Access", desc: "Granular permission controls for data security.", enabled: true, mode: 'paid' },
        { id: 'mobile', icon: "📱", title: "Mobile Friendly", desc: "Access the HRMS on the go with responsive design.", enabled: true, mode: 'trial' },
        { id: 'analytics', icon: "📊", title: "Smart Analytics", desc: "Gain actionable insights with interactive dashboards.", enabled: false, mode: 'paid' }
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
                        <h1 className="features-title text-white fw-bold display-4">Powerful HR Features</h1>
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

                                    <div className="p-4 pt-3">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="feature-icon-box" style={{
                                                fontSize: '2rem',
                                                filter: feature.enabled ? 'none' : 'grayscale(100%)'
                                            }}>
                                                <span role="img" aria-label={feature.title}>{feature.icon}</span>
                                            </div>
                                            {feature.enabled ? (
                                                <FaCheckCircle className="text-success fs-4" title="Active" />
                                            ) : (
                                                <FaTimesCircle className="text-secondary fs-4" title="Inactive" />
                                            )}
                                        </div>
                                        <h3 className={`h5 fw-bold mb-2 ${feature.enabled ? 'text-white' : 'text-secondary'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`mb-0 ${feature.enabled ? 'text-white-50' : 'text-secondary opacity-50'}`}>
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
                    <small>© 2026 Future Invo HRMS. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default Features;
