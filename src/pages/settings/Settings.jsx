import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaUserCog, FaPalette, FaShieldAlt, FaBell, FaCheckCircle } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [themeColor, setThemeColor] = useState('light');
    const [sidebarColor, setSidebarColor] = useState('dark');

    const handleNavigate = (path) => {
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
                                    <FaUserCog /> General
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0 ${activeTab === 'theme' ? 'bg-primary text-white' : 'bg-white text-secondary'}`}
                                    onClick={() => setActiveTab('theme')}
                                >
                                    <FaPalette /> Appearance
                                </button>
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
                                        <h5 className="fw-bold mb-4">General Settings</h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small text-muted">Application Name</label>
                                                <input type="text" className="form-control" defaultValue="AtrioHR" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small text-muted">Support Email</label>
                                                <input type="email" className="form-control" defaultValue="support@atriohr.com" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small text-muted">Company Address</label>
                                                <textarea className="form-control" rows="3" defaultValue="123 Innovation Drive, Tech City, CA 94043"></textarea>
                                            </div>
                                            <div className="col-12 mt-4 text-end">
                                                <button className="btn btn-primary rounded-pill px-4">Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'theme' && (
                                    <div>
                                        <h5 className="fw-bold mb-4">Appearance & Theme</h5>

                                        <div className="mb-4">
                                            <label className="form-label d-block text-muted small mb-3">Theme Mode</label>
                                            <div className="d-flex gap-3">
                                                <button
                                                    className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'light' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'bg-white'}`}
                                                    onClick={() => setThemeColor('light')}
                                                >
                                                    ☀️ Light Mode
                                                    {themeColor === 'light' && <FaCheckCircle />}
                                                </button>
                                                <button
                                                    className={`btn flex-grow-1 p-3 border rounded-3 d-flex align-items-center justify-content-center gap-2 ${themeColor === 'dark' ? 'border-dark bg-dark text-white fw-bold' : 'bg-white'}`}
                                                    onClick={() => setThemeColor('dark')}
                                                >
                                                    🌑 Dark Mode
                                                    {themeColor === 'dark' && <FaCheckCircle />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label d-block text-muted small mb-3">Sidebar Color</label>
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
                                                    <div className="small text-muted">Receive updates via email</div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
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
                                            <label className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="fw-bold text-dark">Weekly Reports</div>
                                                    <div className="small text-muted">Get a weekly summary of activities</div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div>
                                        <h5 className="fw-bold mb-4">Security Settings</h5>
                                        <div className="d-grid gap-3" style={{ maxWidth: '400px' }}>
                                            <button className="btn btn-outline-primary d-flex justify-content-between align-items-center">
                                                Change Password <span>→</span>
                                            </button>
                                            <button className="btn btn-outline-primary d-flex justify-content-between align-items-center">
                                                Two-Factor Authentication <span>→</span>
                                            </button>
                                            <button className="btn btn-outline-danger d-flex justify-content-between align-items-center">
                                                Deactivate Account <span>→</span>
                                            </button>
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
