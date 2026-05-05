import React, { createContext, useContext, useState, useEffect } from 'react';
import { getThemeCookie, setThemeCookie, getSidebarState, setSidebarState } from '../utils/cookieAuth';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => getThemeCookie());
    const [skin, setSkin] = useState('blue');
    const [sidebarType, setSidebarType] = useState('white');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => getSidebarState() === 'collapsed');

    // Additional Settings State
    const [settings, setSettings] = useState({
        reportPanel: true,
        notifications: true,
        autoUpdates: false,
        offline: false
    });

    // Drawer Visibility State
    const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

    // Toggle Settings Drawer
    const toggleSettingsDrawer = () => {
        setShowSettingsDrawer(prev => !prev);
    };

    const changeSkin = (skinId) => {
        setSkin(skinId);
        document.body.setAttribute('data-skin', skinId);
    };

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        setThemeCookie(newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(prev => {
            const next = !prev;
            setSidebarState(next ? 'collapsed' : 'expanded');
            return next;
        });
    };

    // Change Sidebar Type
    const changeSidebarType = (type) => {
        setSidebarType(type);
    };

    // Toggle Individual Settings
    const toggleSetting = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Apply theme class on load/change
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const value = {
        theme,
        changeTheme,
        skin,
        changeSkin,
        sidebarType,
        changeSidebarType,
        sidebarCollapsed,
        toggleSidebar,
        settings,
        toggleSetting,
        showSettingsDrawer,
        toggleSettingsDrawer
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
