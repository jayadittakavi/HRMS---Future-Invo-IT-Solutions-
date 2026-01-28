import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaUserCog, FaPalette, FaShieldAlt, FaBell, FaCheckCircle, FaSun, FaMoon } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [themeColor, setThemeColor] = useState('light');
    const [sidebarColor, setSidebarColor] = useState('dark');
    const [showSmtpConfig, setShowSmtpConfig] = useState(false);
    const [showSmsConfig, setShowSmsConfig] = useState(false);
    const [auditTab, setAuditTab] = useState('login'); // login, password, data, permissions

    // Apply Theme Changes & Skins
    React.useEffect(() => {
        // Apply Global Theme
        document.body.setAttribute('data-bs-theme', themeColor);
        document.body.setAttribute('data-theme', themeColor);

        // Apply Sidebar Skin
        document.documentElement.style.setProperty('--sidebar-color', sidebarColor === 'dark' ? '#1e293b' : sidebarColor === 'light' ? '#ffffff' : '#2563eb');
    }, [themeColor, sidebarColor]);

    const handleNavigate = () => {
        // Handle navigation if needed
    };

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                <h2 className="h4 fw-bold text-dark mb-4">Settings</h2>

                <div className="row g-4">
                    {/* Settings Sidebar */}
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="list-group list-group-flush">
                                <button
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0 ${activeTab === 'general' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}
                                    onClick={() => setActiveTab('general')}
                                >
                                    <FaUserCog /> Global Configuration
                                </button>
                                {/* Appearance merged into Global Configuration */}
                                <button
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0 ${activeTab === 'notifications' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}
                                    onClick={() => setActiveTab('notifications')}
                                >
                                    <FaBell /> Notifications
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0 ${activeTab === 'security' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <FaShieldAlt /> Security
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="col-md-9">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                {activeTab === 'general' && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="fw-bold mb-0">Global System Settings</h5>
                                            <button className="btn btn-primary rounded-pill px-4" onClick={() => alert('Settings Saved & Synced Successfully!')}>
                                                <FaCheckCircle className="me-2" /> Save Changes
                                            </button>
                                        </div>

                                        <div className="alert alert-info border-0 bg-info bg-opacity-10 text-info mb-4">
                                            <small><FaCheckCircle className="me-2" /> These settings affect the entire application for all companies.</small>
                                        </div>

                                        {/* Core Identification */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Application Name</label>
                                                <input type="text" className="form-control" defaultValue="Future Invo HRMS" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Support Email</label>
                                                <input type="email" className="form-control" defaultValue="support@futureinvo.com" />
                                            </div>
                                        </div>

                                        {/* Localization */}
                                        <h6 className="fw-bold mb-3 text-secondary small text-uppercase">Localization & Regional</h6>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Time Zone</label>
                                                <select className="form-select" defaultValue="IST">
                                                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                                                    <option value="IST">IST (Indian Standard Time)</option>
                                                    <option value="EST">EST (Eastern Standard Time)</option>
                                                    <option value="PST">PST (Pacific Standard Time)</option>
                                                </select>
                                                <div className="form-text small text-danger"><small>Example: If timezone is wrong → attendance time is wrong.</small></div>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Date Format</label>
                                                <select className="form-select" defaultValue="DD/MM/YYYY">
                                                    <option value="DD/MM/YYYY">DD/MM/YYYY (31/01/2025)</option>
                                                    <option value="MM/DD/YYYY">MM/DD/YYYY (01/31/2025)</option>
                                                    <option value="YYYY-MM-DD">YYYY-MM-DD (2025-01-31)</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Currency</label>
                                                <select className="form-select" defaultValue="INR">
                                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                                    <option value="USD">USD ($) - US Dollar</option>
                                                    <option value="EUR">EUR (€) - Euro</option>
                                                    <option value="GBP">GBP (£) - British Pound</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-secondary">Language</label>
                                                <select className="form-select" defaultValue="en">
                                                    <option value="en">English (United States)</option>
                                                    <option value="es">Spanish</option>
                                                    <option value="fr">French</option>
                                                    <option value="de">German</option>
                                                </select>
                                            </div>
                                        </div>

                                        <hr className="text-secondary opacity-10" />

                                        {/* Theme & Appearance (Merged here) */}
                                        <h6 className="fw-bold mb-3 text-secondary small text-uppercase">Visuals & Theme</h6>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label d-block text-muted small mb-2">Global Theme Mode</label>
                                                <div className="d-flex gap-3">
                                                    <button
                                                        className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'light' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'bg-white'}`}
                                                        onClick={() => setThemeColor('light')}
                                                    >
                                                        <FaSun className="fs-5" /> Light
                                                        {themeColor === 'light' && <FaCheckCircle />}
                                                    </button>
                                                    <button
                                                        className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'dark' ? 'border-dark bg-dark text-white fw-bold' : 'bg-white'}`}
                                                        onClick={() => setThemeColor('dark')}
                                                    >
                                                        <FaMoon className="fs-5" /> Dark
                                                        {themeColor === 'dark' && <FaCheckCircle />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label d-block text-muted small mb-2">Sidebar Skins</label>
                                                <div className="d-flex gap-3 h-100 align-items-center">
                                                    <div
                                                        className={`rounded-circle cursor-pointer border shadow-sm ${sidebarColor === 'dark' ? 'ring-2 ring-primary border-primary border-2' : 'border-light'}`}
                                                        style={{ width: '45px', height: '45px', backgroundColor: '#1e293b' }}
                                                        onClick={() => setSidebarColor('dark')}
                                                        title="Dark Sidebar"
                                                    />
                                                    <div
                                                        className={`rounded-circle cursor-pointer border shadow-sm ${sidebarColor === 'light' ? 'ring-2 ring-primary border-primary border-2' : 'border-light'}`}
                                                        style={{ width: '45px', height: '45px', backgroundColor: '#ffffff' }}
                                                        onClick={() => setSidebarColor('light')}
                                                        title="Light Sidebar"
                                                    />
                                                    <div
                                                        className={`rounded-circle cursor-pointer border shadow-sm ${sidebarColor === 'blue' ? 'ring-2 ring-primary border-primary border-2' : 'border-light'}`}
                                                        style={{ width: '45px', height: '45px', backgroundColor: '#2563eb' }}
                                                        onClick={() => setSidebarColor('blue')}
                                                        title="Blue Sidebar"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="text-secondary opacity-10" />

                                        {/* Gateway Configuration */}
                                        <h6 className="fw-bold mb-3 text-secondary small text-uppercase">Communication Gateways</h6>

                                        {/* SMTP Configuration */}
                                        <div className="card bg-light border-0 p-3 mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span className="fw-bold d-block">SMTP Server (Email)</span>
                                                    <small className="text-muted">Configure outgoing email server</small>
                                                </div>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => setShowSmtpConfig(!showSmtpConfig)}
                                                >
                                                    {showSmtpConfig ? 'Close' : 'Configure'}
                                                </button>
                                            </div>

                                            {showSmtpConfig && (
                                                <div className="mt-3 pt-3 border-top border-secondary border-opacity-10">
                                                    <div className="row g-3">
                                                        <div className="col-md-8">
                                                            <label className="form-label small fw-bold text-secondary">SMTP Host</label>
                                                            <input type="text" className="form-control" placeholder="smtp.gmail.com" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="form-label small fw-bold text-secondary">Port</label>
                                                            <input type="text" className="form-control" placeholder="587" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label small fw-bold text-secondary">Username</label>
                                                            <input type="text" className="form-control" placeholder="email@company.com" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label small fw-bold text-secondary">Password</label>
                                                            <input type="password" class="form-control" placeholder="App Password" />
                                                        </div>
                                                        <div className="col-12 text-end">
                                                            <button className="btn btn-primary btn-sm px-3">Save SMTP Settings</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* SMS Configuration */}
                                        <div className="card bg-light border-0 p-3 mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span className="fw-bold d-block">SMS Gateway</span>
                                                    <small className="text-muted">Configure Twilio or Custom Gateway</small>
                                                </div>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => setShowSmsConfig(!showSmsConfig)}
                                                >
                                                    {showSmsConfig ? 'Close' : 'Configure'}
                                                </button>
                                            </div>

                                            {showSmsConfig && (
                                                <div className="mt-3 pt-3 border-top border-secondary border-opacity-10">
                                                    <div className="mb-3">
                                                        <label className="form-label small fw-bold text-secondary">Provider</label>
                                                        <select className="form-select">
                                                            <option>Twilio</option>
                                                            <option>Msg91</option>
                                                            <option>Amazon SNS</option>
                                                        </select>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label small fw-bold text-secondary">Account SID / API Key</label>
                                                            <input type="text" className="form-control" placeholder="Enter API Key" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label small fw-bold text-secondary">Auth Token / Secret</label>
                                                            <input type="password" class="form-control" placeholder="Enter Secret Token" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label small fw-bold text-secondary">Sender ID</label>
                                                            <input type="text" className="form-control" placeholder="e.g. HR-TEAM" />
                                                        </div>
                                                        <div className="col-12 text-end">
                                                            <button className="btn btn-primary btn-sm px-3">Save SMS Configuration</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'theme' && (
                                    <div>
                                        <h5 className="fw-bold mb-4">Global Appearance & Theme</h5>

                                        <div className="mb-4">
                                            <label className="form-label d-block text-muted small mb-3">Global Theme Mode</label>
                                            <div className="d-flex gap-3">
                                                <button
                                                    className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'light' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'bg-white'}`}
                                                    onClick={() => setThemeColor('light')}
                                                >
                                                    <FaSun className="fs-5" /> Light Mode
                                                    {themeColor === 'light' && <FaCheckCircle />}
                                                </button>
                                                <button
                                                    className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'dark' ? 'border-dark bg-dark text-white fw-bold' : 'bg-white'}`}
                                                    onClick={() => setThemeColor('dark')}
                                                >
                                                    <FaMoon className="fs-5" /> Dark Mode
                                                    {themeColor === 'dark' && <FaCheckCircle />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label d-block text-muted small mb-3">Global Color Skins</label>
                                            <div className="d-flex gap-3">
                                                <div
                                                    className={`rounded-circle cursor-pointer border ${sidebarColor === 'dark' ? 'ring-2 ring-primary' : ''}`}
                                                    style={{ width: '40px', height: '40px', backgroundColor: '#1e293b' }}
                                                    onClick={() => setSidebarColor('dark')}
                                                />
                                                <div
                                                    className={`rounded-circle cursor-pointer border ${sidebarColor === 'light' ? 'ring-2 ring-primary' : ''}`}
                                                    style={{ width: '40px', height: '40px', backgroundColor: '#ffffff' }}
                                                    onClick={() => setSidebarColor('light')}
                                                />
                                                <div
                                                    className={`rounded-circle cursor-pointer border ${sidebarColor === 'blue' ? 'ring-2 ring-primary' : ''}`}
                                                    style={{ width: '40px', height: '40px', backgroundColor: '#2563eb' }}
                                                    onClick={() => setSidebarColor('blue')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div>
                                        <h5 className="fw-bold mb-4">Notification Preferences</h5>
                                        <div className="list-group">
                                            <label className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="fw-bold text-dark">Email Notifications</div>
                                                    <div className="small text-muted">Receive system updates via email</div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                            </label>
                                            <label className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="fw-bold text-dark">SMS Notifications</div>
                                                    <div className="small text-muted">Receive critical alerts via SMS</div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </label>
                                            <label className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="fw-bold text-dark">Push Notifications</div>
                                                    <div className="small text-muted">Receive pop-up notifications on dashboard</div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div>
                                        <h5 className="fw-bold mb-4">Security & Audit Logs</h5>

                                        {/* Security Alerts */}
                                        <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <FaShieldAlt className="me-2" />
                                                <strong>Security Alert:</strong> 3 Unauthorized login attempts detected from IP 192.168.1.105 today.
                                            </div>
                                            <button className="btn btn-sm btn-danger px-3">Review</button>
                                        </div>

                                        {/* Main Security Controls */}
                                        <div className="row g-4 mb-4">
                                            <div className="col-md-6">
                                                <div className="card h-100 border p-3 bg-light">
                                                    <h6 className="fw-bold text-dark">Access Control</h6>
                                                    <div className="form-check form-switch mt-2">
                                                        <input className="form-check-input" type="checkbox" id="2fa" defaultChecked />
                                                        <label className="form-check-label small" htmlFor="2fa">Enforce Two-Factor Authentication (2FA)</label>
                                                    </div>
                                                    <div className="form-check form-switch mt-2">
                                                        <input className="form-check-input" type="checkbox" id="session" />
                                                        <label className="form-check-label small" htmlFor="session">Force Logout on Idle (30 mins)</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card h-100 border p-3 bg-light">
                                                    <h6 className="fw-bold text-dark">Password Policy</h6>
                                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                                        <span className="small text-muted">Password Expiry</span>
                                                        <select className="form-select form-select-sm w-auto">
                                                            <option>90 Days</option>
                                                            <option>60 Days</option>
                                                            <option>30 Days</option>
                                                            <option>Never</option>
                                                        </select>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                                        <span className="small text-muted">Min Length</span>
                                                        <span className="badge bg-secondary">8 Chats</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Audit Logs Tabs/Section */}
                                        <div className="card border shadow-sm rounded-3 overflow-hidden mt-4">
                                            <div className="card-header bg-light border-bottom p-0">
                                                <ul className="nav nav-tabs nav-fill border-bottom-0">
                                                    <li className="nav-item">
                                                        <button
                                                            className={`nav-link py-3 rounded-0 border-0 ${auditTab === 'login' ? 'active fw-bold border-bottom border-primary border-3 bg-white text-primary' : 'text-muted'}`}
                                                            onClick={() => setAuditTab('login')}
                                                        >
                                                            Login History
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                            className={`nav-link py-3 rounded-0 border-0 ${auditTab === 'password' ? 'active fw-bold border-bottom border-primary border-3 bg-white text-primary' : 'text-muted'}`}
                                                            onClick={() => setAuditTab('password')}
                                                        >
                                                            Password Logs
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                            className={`nav-link py-3 rounded-0 border-0 ${auditTab === 'data' ? 'active fw-bold border-bottom border-primary border-3 bg-white text-primary' : 'text-muted'}`}
                                                            onClick={() => setAuditTab('data')}
                                                        >
                                                            Data Edit History
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                            className={`nav-link py-3 rounded-0 border-0 ${auditTab === 'permissions' ? 'active fw-bold border-bottom border-primary border-3 bg-white text-primary' : 'text-muted'}`}
                                                            onClick={() => setAuditTab('permissions')}
                                                        >
                                                            Permission Changes
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="card-body p-0">
                                                {/* DATA: LOGIN HISTORY */}
                                                {auditTab === 'login' && (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover align-middle mb-0 text-nowrap">
                                                            <thead className="bg-light sticky-top">
                                                                <tr>
                                                                    <th className="small text-secondary ps-4 py-3 border-0">Timestamp</th>
                                                                    <th className="small text-secondary py-3 border-0">User</th>
                                                                    <th className="small text-secondary py-3 border-0">Event</th>
                                                                    <th className="small text-secondary py-3 border-0">IP Address</th>
                                                                    <th className="small text-secondary py-3 border-0">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 28, 2026, 10:45 AM</td>
                                                                    <td className="fw-bold small text-dark">Super Admin</td>
                                                                    <td className="small">System Login</td>
                                                                    <td className="small text-muted font-monospace">192.168.1.12</td>
                                                                    <td><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Success</span></td>
                                                                </tr>
                                                                <tr className="bg-danger bg-opacity-10">
                                                                    <td className="ps-4 small text-danger fw-bold">Jan 28, 2026, 10:15 AM</td>
                                                                    <td className="fw-bold small text-dark">Unknown</td>
                                                                    <td className="small text-danger fw-bold">Unauthorized Login Attempt</td>
                                                                    <td className="small text-danger font-monospace">45.23.11.90</td>
                                                                    <td><span className="badge bg-danger text-white rounded-pill px-3">Blocked</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 27, 2026, 05:30 PM</td>
                                                                    <td className="fw-bold small text-dark">HR Manager</td>
                                                                    <td className="small">Logout</td>
                                                                    <td className="small text-muted font-monospace">192.168.1.45</td>
                                                                    <td><span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3">Success</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 27, 2026, 09:00 AM</td>
                                                                    <td className="fw-bold small text-dark">Accountant</td>
                                                                    <td className="small">System Login</td>
                                                                    <td className="small text-muted font-monospace">192.168.1.22</td>
                                                                    <td><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Success</span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                {/* DATA: PASSWORD LOGS */}
                                                {auditTab === 'password' && (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover align-middle mb-0 text-nowrap">
                                                            <thead className="bg-light sticky-top">
                                                                <tr>
                                                                    <th className="small text-secondary ps-4 py-3 border-0">Timestamp</th>
                                                                    <th className="small text-secondary py-3 border-0">User Affected</th>
                                                                    <th className="small text-secondary py-3 border-0">Action By</th>
                                                                    <th className="small text-secondary py-3 border-0">Type</th>
                                                                    <th className="small text-secondary py-3 border-0">Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 26, 2026, 02:15 PM</td>
                                                                    <td className="fw-bold small text-dark">John Doe (Emp)</td>
                                                                    <td className="small text-primary">John Doe</td>
                                                                    <td className="small"><span className="badge bg-info bg-opacity-10 text-info">Self Update</span></td>
                                                                    <td className="small text-muted">Changed account password</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 25, 2026, 11:00 AM</td>
                                                                    <td className="fw-bold small text-dark">Sarah Smith (HR)</td>
                                                                    <td className="small text-danger fw-bold">Super Admin</td>
                                                                    <td className="small"><span className="badge bg-warning bg-opacity-10 text-warning">Admin Reset</span></td>
                                                                    <td className="small text-muted">Force reset due to security policy</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 20, 2026, 09:30 AM</td>
                                                                    <td className="fw-bold small text-dark">Mike Ross (Mgr)</td>
                                                                    <td className="small text-primary">System</td>
                                                                    <td className="small"><span className="badge bg-secondary bg-opacity-10 text-secondary">Expiry</span></td>
                                                                    <td className="small text-muted">Password expired, prompted change</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                {/* DATA: DATA EDIT Logs */}
                                                {auditTab === 'data' && (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover align-middle mb-0 text-nowrap">
                                                            <thead className="bg-light sticky-top">
                                                                <tr>
                                                                    <th className="small text-secondary ps-4 py-3 border-0">Timestamp</th>
                                                                    <th className="small text-secondary py-3 border-0">Data Entity</th>
                                                                    <th className="small text-secondary py-3 border-0">Action</th>
                                                                    <th className="small text-secondary py-3 border-0">Modified By</th>
                                                                    <th className="small text-secondary py-3 border-0">Changes (Old &rarr; New)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 28, 2026, 01:20 PM</td>
                                                                    <td className="fw-bold small text-dark">Employee Salary</td>
                                                                    <td className="small"><span className="badge bg-primary bg-opacity-10 text-primary">Update</span></td>
                                                                    <td className="small text-dark fw-bold">Super Admin</td>
                                                                    <td className="small font-monospace">
                                                                        <span className="text-danger strikethrough me-2">₹50,000</span>
                                                                        <span className="text-secondary me-2">&rarr;</span>
                                                                        <span className="text-success fw-bold">₹55,000</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 27, 2026, 04:10 PM</td>
                                                                    <td className="fw-bold small text-dark">Company Settings</td>
                                                                    <td className="small"><span className="badge bg-warning bg-opacity-10 text-warning">Config</span></td>
                                                                    <td className="small text-dark fw-bold">Admin</td>
                                                                    <td className="small text-muted">Changed 'Tax Year' to 2026-2027</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 27, 2026, 11:45 AM</td>
                                                                    <td className="fw-bold small text-dark">Leave Policy</td>
                                                                    <td className="small"><span className="badge bg-danger bg-opacity-10 text-danger">Delete</span></td>
                                                                    <td className="small text-dark fw-bold">HR Manager</td>
                                                                    <td className="small text-muted">Removed 'Casual Leave - Type B'</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                {/* DATA: PERMISSION Logs */}
                                                {auditTab === 'permissions' && (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover align-middle mb-0 text-nowrap">
                                                            <thead className="bg-light sticky-top">
                                                                <tr>
                                                                    <th className="small text-secondary ps-4 py-3 border-0">Timestamp</th>
                                                                    <th className="small text-secondary py-3 border-0">Role / User</th>
                                                                    <th className="small text-secondary py-3 border-0">Changes Made</th>
                                                                    <th className="small text-secondary py-3 border-0">Executed By</th>
                                                                    <th className="small text-secondary py-3 border-0">Outcome</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 28, 2026, 12:00 PM</td>
                                                                    <td className="fw-bold small text-dark">Role: Accountant</td>
                                                                    <td className="small text-dark">
                                                                        <span className="badge bg-success bg-opacity-10 text-success me-1">+ Grant</span>
                                                                        Payroll Processing Access
                                                                    </td>
                                                                    <td className="small fw-bold">Super Admin</td>
                                                                    <td className="small text-success">Applied</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 26, 2026, 09:15 AM</td>
                                                                    <td className="fw-bold small text-dark">User: John Doe</td>
                                                                    <td className="small text-dark">
                                                                        <span className="badge bg-danger bg-opacity-10 text-danger me-1">- Revoke</span>
                                                                        Delete Employee Capability
                                                                    </td>
                                                                    <td className="small fw-bold">Admin</td>
                                                                    <td className="small text-success">Applied</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ps-4 small text-muted">Jan 25, 2026, 03:00 PM</td>
                                                                    <td className="fw-bold small text-dark">Role: Manager</td>
                                                                    <td className="small text-dark">
                                                                        <span className="badge bg-success bg-opacity-10 text-success me-1">+ Grant</span>
                                                                        View Department Reports
                                                                    </td>
                                                                    <td className="small fw-bold">Super Admin</td>
                                                                    <td className="small text-success">Applied</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-footer bg-white text-center py-3 border-top">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => alert('Exporting Logs to CSV...')}>
                                                    <FaShieldAlt className="me-2" /> Export Security Audit Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
