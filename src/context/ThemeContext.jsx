import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    // Core Theme State
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const [skin, setSkin] = useState('blue');
    const [sidebarType, setSidebarType] = useState('white'); // 'white' or 'dark' (mapped to sidebar styles)

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

    // Toggle Theme (Light/Dark)
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Change Skin
    const changeSkin = (skinId) => {
        setSkin(skinId);
        // In a real app, you would apply skin classes to body here
        document.body.setAttribute('data-skin', skinId);
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

    // Effect to apply dark mode class
    useEffect(() => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }, [theme]);

    const value = {
        theme,
        toggleTheme,
        skin,
        changeSkin,
        sidebarType,
        changeSidebarType,
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
