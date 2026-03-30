import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { FaTimes, FaBell, FaCheckDouble, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const NotificationDrawer = () => {
    const {
        showNotificationDrawer,
        toggleNotificationDrawer,
        notifications,
        markAllAsRead,
        markAsRead,
        deleteNotification,
        clearNotifications
    } = useNotification();

    const { theme } = useTheme();

    if (!showNotificationDrawer) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <FaCheckCircle className="text-success" />;
            case 'warning': return <FaExclamationTriangle className="text-warning" />;
            case 'danger': return <FaExclamationCircle className="text-danger" />;
            default: return <FaInfoCircle className="text-primary" />;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ background: 'rgba(0,0,0,0.3)', zIndex: 1045, backdropFilter: 'blur(2px)' }}
                onClick={toggleNotificationDrawer}
            ></div>

            {/* Drawer */}
            <div
                className="position-fixed top-0 end-0 h-100 shadow-lg d-flex flex-column"
                style={{
                    width: '320px',
                    zIndex: 1055,
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                    transition: 'transform 0.3s ease-in-out',
                    transform: showNotificationDrawer ? 'translateX(0)' : 'translateX(100%)'
                }}
            >
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                        <FaBell className="text-primary" />
                        <h6 className="fw-bold mb-0">Notifications</h6>
                        <span className="badge bg-primary rounded-pill">{notifications.filter(n => !n.read).length}</span>
                    </div>
                    <button className="btn btn-link text-secondary p-0" onClick={toggleNotificationDrawer}>
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-between p-2 bg-light border-bottom">
                    <button className="btn btn-sm text-primary fw-bold" onClick={markAllAsRead} disabled={notifications.length === 0}>
                        <FaCheckDouble className="me-1" /> Mark all read
                    </button>
                    <button className="btn btn-sm text-danger fw-bold" onClick={clearNotifications} disabled={notifications.length === 0}>
                        <FaTimesCircle className="me-1" /> Clear all
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow-1 overflow-auto p-0">
                    {notifications.length > 0 ? (
                        <div className="list-group list-group-flush">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`list-group-item list-group-item-action border-bottom p-3 position-relative ${!notif.read ? (theme === 'dark' ? 'bg-secondary bg-opacity-25' : 'bg-blue-light') : (theme === 'dark' ? 'bg-transparent text-light' : 'bg-white')}`}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: !notif.read ? (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f0f9ff') : 'transparent',
                                        borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
                                    }}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className="d-flex w-100 justify-content-between align-items-start mb-1 pe-4">
                                        <div className="d-flex gap-2">
                                            <div className="mt-1">{getIcon(notif.type)}</div>
                                            <div>
                                                <small className={`fw-bold d-block ${notif.read ? 'text-secondary' : 'text-dark'} ${theme === 'dark' && !notif.read ? 'text-light' : ''}`}>
                                                    {notif.title}
                                                </small>
                                                <small className="text-muted d-block text-truncate" style={{ maxWidth: '180px' }}>{notif.message}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <small className="text-secondary" style={{ fontSize: '0.7rem' }}>{notif.time}</small>
                                        <button
                                            className="btn btn-link text-danger p-0 border-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notif.id);
                                            }}
                                            title="Dismiss Notification"
                                        >
                                            <FaTimesCircle size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-secondary opacity-50">
                            <FaBell size={40} className="mb-3" />
                            <p>No new notifications</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-top text-center bg-light">
                    <a href="/notifications" className="text-decoration-none text-primary fw-bold small">View All Notifications</a>
                </div>
            </div>
        </>
    );
};

export default NotificationDrawer;
