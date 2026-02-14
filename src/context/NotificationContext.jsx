import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Message', message: 'You have received a new message from HR.', time: '2 mins ago', read: false, type: 'info' },
        { id: 2, title: 'System Update', message: 'The system will undergo maintenance at midnight.', time: '1 hour ago', read: false, type: 'warning' },
        { id: 3, title: 'Leave Approved', message: 'Your leave request for Sept 29 has been approved.', time: '4 hours ago', read: true, type: 'success' },
        { id: 4, title: 'Task Deadline', message: 'Project Alpha deadline is approaching tomorrow.', time: '1 day ago', read: true, type: 'danger' },
        { id: 5, title: 'New Policy', message: 'Updated WFH policy is now available in documents.', time: '2 days ago', read: true, type: 'info' }
    ]);

    const toggleNotificationDrawer = () => {
        setShowNotificationDrawer(!showNotificationDrawer);
    };

    const addNotification = (notification) => {
        setNotifications(prev => [{ ...notification, id: Date.now(), read: false, time: 'Just now' }, ...prev]);
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            showNotificationDrawer,
            toggleNotificationDrawer,
            notifications,
            addNotification,
            markAllAsRead,
            clearNotifications,
            unreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
