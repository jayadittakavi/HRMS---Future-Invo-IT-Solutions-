import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNotification } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTrash, FaCheckDouble } from 'react-icons/fa';

const NotificationsPage = () => {
    const { notifications, markAllAsRead, clearNotifications } = useNotification();
    const { theme } = useTheme();

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <FaCheckCircle className="text-success fs-4" />;
            case 'warning': return <FaExclamationTriangle className="text-warning fs-4" />;
            case 'danger': return <FaExclamationCircle className="text-danger fs-4" />;
            default: return <FaInfoCircle className="text-primary fs-4" />;
        }
    };

    return (
        <DashboardLayout title="Notifications">
            <div className="container-fluid p-4">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0">All Notifications</h5>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={markAllAsRead}>
                                <FaCheckDouble className="me-2" /> Mark all read
                            </button>
                            <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={clearNotifications}>
                                <FaTrash className="me-2" /> Clear all
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        {notifications.length > 0 ? (
                            <div className="list-group list-group-flush">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`list-group-item p-4 d-flex align-items-center gap-3 ${!notif.read ? 'bg-light' : ''}`}>
                                        <div className="p-2 rounded-circle bg-light border">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className={`mb-1 fw-bold ${!notif.read ? 'text-dark' : 'text-secondary'}`}>{notif.title}</h6>
                                                <small className="text-muted">{notif.time}</small>
                                            </div>
                                            <p className="mb-0 text-secondary">{notif.message}</p>
                                        </div>
                                        {!notif.read && (
                                            <div className="badge bg-primary rounded-circle p-1"> </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-5 text-secondary">
                                <FaBell size={48} className="mb-3 opacity-25" />
                                <p>You have no notifications at this time.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NotificationsPage;
