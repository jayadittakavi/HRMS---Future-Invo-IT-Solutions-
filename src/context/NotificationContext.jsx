import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Message', message: 'You have received a new message from HR.', time: '2 mins ago', read: false, type: 'info' },
        { id: 2, title: 'System Update', message: 'The system will undergo maintenance at midnight.', time: '1 hour ago', read: false, type: 'warning' },
        { id: 3, title: 'Leave Approved', message: 'Your leave request for Sept 29 has been approved.', time: '4 hours ago', read: true, type: 'success' },
        { id: 4, title: 'Task Deadline', message: 'Project Alpha deadline is approaching tomorrow.', time: '1 day ago', read: true, type: 'danger' },
        { id: 5, title: 'New Policy', message: 'Updated WFH policy is now available in documents.', time: '2 days ago', read: true, type: 'info' }
    ]);

    // Check for special events and birthdays
    useEffect(() => {
        const today = new Date();
        const month = today.getMonth() + 1; // 1-12
        const day = today.getDate();
        const dateString = `${month}-${day}`;

        const specialEvents = {
            '3-3': {
                title: 'Lunar Eclipse Today',
                message: 'Today is a Lunar Eclipse! Visible from 3:00 PM to 7:00 PM. Don\'t miss the celestial event.',
                type: 'warning'
            },
            '1-1': { title: 'Happy New Year!', message: 'Wishing you a productive and successful year ahead!', type: 'success' },
            '8-15': { title: 'Independence Day', message: 'Happy Independence Day! Let us celebrate the spirit of freedom.', type: 'info' },
            '12-25': { title: 'Merry Christmas', message: 'Season\'s greetings! Have a wonderful holiday.', type: 'success' }
        };

        const newAlerts = [];

        // 1. Check Special Calendar Events
        if (specialEvents[dateString]) {
            const event = specialEvents[dateString];
            // Check if already added to avoid duplicates on re-render
            if (!notifications.some(n => n.title === event.title)) {
                newAlerts.push({
                    id: `event-${dateString}`,
                    ...event,
                    time: 'Today',
                    read: false
                });
            }
        }

        // 2. Check User Birthday
        if (user && user.birthday) {
            const bday = new Date(user.birthday);
            if (bday.getMonth() + 1 === month && bday.getDate() === day) {
                if (!notifications.some(n => n.title === 'Happy Birthday!')) {
                    newAlerts.push({
                        id: `bday-${user.id || 'me'}`,
                        title: 'Happy Birthday!',
                        message: `Happy Birthday, ${user.name || 'User'}! Have a fantastic day ahead! 🎂✨`,
                        type: 'success',
                        time: 'Today',
                        read: false
                    });
                }
            }
        }

        if (newAlerts.length > 0) {
            setNotifications(prev => [...newAlerts, ...prev]);
        }
    }, [user, notifications.length]); // Added notifications.length to prevent infinite loops but allowing initial check

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

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            showNotificationDrawer,
            toggleNotificationDrawer,
            notifications,
            addNotification,
            markAllAsRead,
            markAsRead,
            deleteNotification,
            clearNotifications,
            unreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

