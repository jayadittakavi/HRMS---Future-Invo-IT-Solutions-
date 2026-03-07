import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaTimes, FaSun, FaMoon, FaCheck, FaUndo } from 'react-icons/fa';

const SettingsDrawer = () => {
    const {
        theme,
        skin, changeSkin,
        sidebarType, changeSidebarType,
        settings, toggleSetting,
        showSettingsDrawer, toggleSettingsDrawer
    } = useTheme();

    if (!showSettingsDrawer) return null;

    const skins = [
        { id: 'blue', color: '#0ea5e9', name: 'Blue' },
        { id: 'purple', color: '#8b5cf6', name: 'Purple' },
        { id: 'green', color: '#10b981', name: 'Green' },
        { id: 'orange', color: '#f97316', name: 'Orange' },
        { id: 'teal', color: '#14b8a6', name: 'Teal' },
        { id: 'red', color: '#ef4444', name: 'Red' },
    ];

    const drawerBg = theme === 'dark' ? '#1e293b' : '#ffffff';
    const drawerColor = theme === 'dark' ? '#f8fafc' : '#0f172a';

    return (
        <>
            {/* Backdrop */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ background: 'rgba(0,0,0,0.3)', zIndex: 1040, backdropFilter: 'blur(2px)' }}
                onClick={toggleSettingsDrawer}
            />

            {/* Drawer */}
            <div
                className="position-fixed top-0 end-0 h-100 shadow-lg d-flex flex-column"
                style={{ width: 300, zIndex: 1050, background: drawerBg, color: drawerColor, transition: 'transform 0.3s ease' }}
            >
                {/* Header */}
                <div
                    className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
                    style={{ borderColor: theme === 'dark' ? '#334155' : '#e5e7eb' }}
                >
                    <span className="fw-bold" style={{ fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                        ⚙️ Settings
                    </span>
                    <button
                        className="btn btn-link p-0"
                        style={{ color: theme === 'dark' ? '#94a3b8' : '#6b7280' }}
                        onClick={toggleSettingsDrawer}
                    >
                        <FaTimes size={16} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-4 flex-grow-1 overflow-auto">

                    {/* Sidebar Color */}
                    <div className="mb-4">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '0.08em' }}>
                            Sidebar Style
                        </h6>
                        <div className="d-flex gap-2">
                            {[
                                { id: 'light', label: '☀️ Light', bg: '#f1f5f9', fg: '#0f172a' },
                                { id: 'dark', label: '🌙 Dark', bg: '#1e293b', fg: '#f8fafc' },
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => changeSidebarType(opt.id)}
                                    style={{
                                        flex: 1, borderRadius: 10, padding: '8px 0', fontSize: '0.82rem', fontWeight: 600,
                                        border: sidebarType === opt.id ? '2px solid #10b981' : '1.5px solid #e5e7eb',
                                        background: opt.bg, color: opt.fg, cursor: 'pointer'
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Accent Color ── */}
                    <div className="mb-4 pt-3 border-top" style={{ borderColor: theme === 'dark' ? '#334155' : '#f0f4ff' }}>
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '0.08em' }}>
                            Accent Colour
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                            {skins.map(s => (
                                <button
                                    key={s.id}
                                    title={s.name}
                                    onClick={() => changeSkin(s.id)}
                                    style={{
                                        width: 34, height: 34, borderRadius: '50%', background: s.color,
                                        border: skin === s.id ? `3px solid ${s.color}` : '3px solid transparent',
                                        outline: skin === s.id ? `2px solid ${s.color}` : 'none',
                                        outlineOffset: 2,
                                        boxShadow: skin === s.id ? `0 0 0 3px ${s.color}30` : 'none',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    {skin === s.id && <FaCheck color="#fff" size={12} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Feature Toggles ── */}
                    <div className="mb-4 pt-3 border-top" style={{ borderColor: theme === 'dark' ? '#334155' : '#f0f4ff' }}>
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '0.08em' }}>
                            Features
                        </h6>
                        {[
                            { key: 'reportPanel', label: 'Report Panel', desc: 'Show analytics panel' },
                            { key: 'notifications', label: 'Notifications', desc: 'Enable push notifications' },
                            { key: 'autoUpdates', label: 'Auto Updates', desc: 'Keep app up-to-date' },
                            { key: 'offline', label: 'Offline Mode', desc: 'Work without internet' },
                        ].map(item => (
                            <div key={item.key} className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: drawerColor }}>{item.label}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{item.desc}</div>
                                </div>
                                <div className="form-check form-switch m-0">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={!!settings[item.key]}
                                        onChange={() => toggleSetting(item.key)}
                                        style={{
                                            width: 40, height: 22, cursor: 'pointer',
                                            backgroundColor: settings[item.key] ? '#10b981' : '',
                                            borderColor: 'transparent'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── RTL (disabled) ── */}
                    <div className="mb-4 pt-3 border-top" style={{ borderColor: theme === 'dark' ? '#334155' : '#f0f4ff' }}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: drawerColor }}>RTL Layout</div>
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Right-to-left direction</div>
                            </div>
                            <div className="form-check form-switch m-0">
                                <input className="form-check-input" type="checkbox" disabled style={{ width: 40, height: 22 }} />
                            </div>
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div className="pt-3 border-top" style={{ borderColor: theme === 'dark' ? '#334155' : '#f0f4ff' }}>
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '0.08em' }}>
                            Quick Links
                        </h6>
                        <a
                            href="/profile"
                            className="btn w-100 btn-sm text-start d-flex justify-content-between align-items-center rounded-3"
                            style={{ border: '1.5px solid #e5e7eb', color: drawerColor, background: 'transparent', padding: '8px 12px', fontSize: '0.84rem', fontWeight: 600 }}
                        >
                            <span>👤 Edit Profile</span>
                            <FaUndo size={12} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
                        </a>
                        <a
                            href="/change-password"
                            className="btn w-100 btn-sm text-start d-flex justify-content-between align-items-center rounded-3 mt-2"
                            style={{ border: '1.5px solid #e5e7eb', color: drawerColor, background: 'transparent', padding: '8px 12px', fontSize: '0.84rem', fontWeight: 600 }}
                        >
                            <span>🔒 Change Password</span>
                            <FaUndo size={12} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-top text-center" style={{ borderColor: theme === 'dark' ? '#334155' : '#e5e7eb' }}>
                    <button
                        className="btn w-100 rounded-pill fw-bold"
                        style={{ border: '1.5px solid #e5e7eb', background: 'transparent', color: '#9ca3af', fontSize: '0.82rem' }}
                        onClick={() => { changeSkin('blue'); changeSidebarType('dark'); }}
                    >
                        🔄 Restore Defaults
                    </button>
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
