import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaTimes, FaSun, FaMoon, FaCheck, FaPalette, FaHdd, FaMicrochip, FaUndo } from 'react-icons/fa';

const SettingsDrawer = () => {
    const {
        theme, toggleTheme,
        skin, changeSkin,
        sidebarType, changeSidebarType,
        settings, toggleSetting,
        showSettingsDrawer, toggleSettingsDrawer
    } = useTheme();

    const [activeTab, setActiveTab] = React.useState('skins');

    if (!showSettingsDrawer) return null;

    const skins = [
        { id: 'blue', color: '#0ea5e9', name: 'Blue' },
        { id: 'purple', color: '#8b5cf6', name: 'Purple' },
        { id: 'green', color: '#10b981', name: 'Green' },
        { id: 'orange', color: '#f97316', name: 'Orange' },
        { id: 'teal', color: '#14b8a6', name: 'Teal' },
        { id: 'red', color: '#ef4444', name: 'Red' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ background: 'rgba(0,0,0,0.3)', zIndex: 1040, backdropFilter: 'blur(2px)' }}
                onClick={toggleSettingsDrawer}
            ></div>

            {/* Drawer */}
            <div
                className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
                style={{
                    width: '300px',
                    zIndex: 1050,
                    transition: 'transform 0.3s ease',
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a'
                }}
            >
                {/* Tabs Header - Atrio Style */}
                <div className="d-flex border-bottom text-center">
                    <div
                        className={`flex-grow-1 py-3 fw-bold small cursor-pointer ${activeTab === 'skins' ? 'text-dark border-bottom border-dark' : 'text-muted'}`}
                        style={{ borderBottomWidth: activeTab === 'skins' ? '2px' : '0', cursor: 'pointer' }}
                        onClick={() => setActiveTab('skins')}
                    >
                        SKINS
                    </div>
                    <div
                        className={`flex-grow-1 py-3 fw-bold small cursor-pointer ${activeTab === 'settings' ? 'text-dark border-bottom border-dark' : 'text-muted'}`}
                        style={{ borderBottomWidth: activeTab === 'settings' ? '2px' : '0', cursor: 'pointer' }}
                        onClick={() => setActiveTab('settings')}
                    >
                        SETTINGS
                    </div>
                    <button className="btn btn-link text-secondary p-0 position-absolute end-0 top-0 mt-3 me-3" onClick={toggleSettingsDrawer} style={{ zIndex: 10 }}>
                        <FaTimes size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-grow-1 overflow-auto">

                    {activeTab === 'skins' ? (
                        <>
                            {/* SIDEBAR COLOR */}
                            <div className="mb-4">
                                <h6 className="fw-bold small text-uppercase mb-3" style={{ fontSize: '0.7rem' }}>SIDEBAR COLOR</h6>
                                <div className="d-flex gap-2">
                                    <button
                                        className={`btn rounded-circle d-flex align-items-center justify-content-center p-0 border ${sidebarType === 'light' ? 'border-primary ring-2 ring-primary' : ''}`}
                                        style={{ width: '32px', height: '32px', background: '#fff', color: '#000' }}
                                        onClick={() => changeSidebarType('light')}
                                    >
                                        <FaSun size={14} />
                                    </button>
                                    <button
                                        className={`btn rounded-circle d-flex align-items-center justify-content-center p-0 border ${sidebarType === 'dark' ? 'border-primary ring-2 ring-primary' : ''}`}
                                        style={{ width: '32px', height: '32px', background: '#1e293b', color: '#fff' }}
                                        onClick={() => changeSidebarType('dark')}
                                    >
                                        <FaMoon size={14} />
                                    </button>
                                </div>
                            </div>



                            {/* SKINS */}
                            <div className="mb-4">
                                <h6 className="fw-bold small text-uppercase mb-3" style={{ fontSize: '0.7rem' }}>SKINS</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {skins.map((s) => (
                                        <button
                                            key={s.id}
                                            className="btn rounded-1 p-0 d-flex align-items-center justify-content-center position-relative"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                backgroundColor: s.color,
                                                border: 'none',
                                                borderRadius: '4px'
                                            }}
                                            onClick={() => changeSkin(s.id)}
                                        >
                                            {skin === s.id && <FaCheck color="white" size={12} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* RTL LAYOUT */}
                            <div className="mb-4 pt-2 border-top">
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <h6 className="fw-bold small text-uppercase mb-0" style={{ fontSize: '0.7rem' }}>RTL Layout</h6>
                                    <div className="form-check form-switch m-0">
                                        <input className="form-check-input" type="checkbox" disabled />
                                    </div>
                                </div>
                            </div>

                            {/* DISK SPACE */}
                            <div className="mb-4">
                                <h6 className="fw-bold small text-uppercase mb-2" style={{ fontSize: '0.7rem' }}>DISK SPACE</h6>
                                <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '26%' }} aria-valuenow="26" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <small className="text-secondary" style={{ fontSize: '0.7rem' }}>26% remaining</small>
                                </div>
                            </div>

                            {/* SERVER LOAD */}
                            <div className="mb-4">
                                <h6 className="fw-bold small text-uppercase mb-2" style={{ fontSize: '0.7rem' }}>Server Load</h6>
                                <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <small className="text-secondary" style={{ fontSize: '0.7rem' }}>Highly Loaded</small>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Detailed Settings */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ fontSize: '0.9rem' }}>Report Panel Usage</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" checked={settings.reportPanel} onChange={() => toggleSetting('reportPanel')}
                                            style={{ backgroundColor: settings.reportPanel ? '#10b981' : '', borderColor: 'transparent' }} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ fontSize: '0.9rem' }}>Notifications</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" checked={settings.notifications} onChange={() => toggleSetting('notifications')}
                                            style={{ backgroundColor: settings.notifications ? '#8b5cf6' : '', borderColor: 'transparent' }} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ fontSize: '0.9rem' }}>Auto Updates</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" checked={settings.autoUpdates} onChange={() => toggleSetting('autoUpdates')}
                                            style={{ backgroundColor: settings.autoUpdates ? '#0ea5e9' : '', borderColor: 'transparent' }} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ fontSize: '0.9rem' }}>Offline Mode</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" checked={settings.offline} onChange={() => toggleSetting('offline')}
                                            style={{ backgroundColor: settings.offline ? '#ef4444' : '', borderColor: 'transparent' }} />
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-top">
                                    <h6 className="fw-bold small text-uppercase mb-3" style={{ fontSize: '0.7rem' }}>Quick Links</h6>
                                    <a href="/profile" className="btn btn-outline-secondary w-100 btn-sm text-start d-flex justify-content-between align-items-center">
                                        <span>Edit Profile</span>
                                        <FaUndo size={12} className="transform-rotate-180" style={{ transform: 'rotate(180deg)' }} />
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                </div>

                {/* RESTORE DEFAULT */}
                <div className="p-4 text-center">
                    <button className="btn btn-light border w-100 rounded-pill fw-bold text-secondary d-flex align-items-center justify-content-center gap-2">
                        Restore Default
                    </button>
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
