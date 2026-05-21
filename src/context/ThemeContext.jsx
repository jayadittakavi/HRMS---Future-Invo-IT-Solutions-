import React, { createContext, useContext, useState, useEffect } from 'react';
import { getThemeCookie, setThemeCookie, getSidebarState, setSidebarState } from '../utils/cookieAuth';
import { getUserPreferences, updateUserPreferences } from '../services/settingsService';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => getThemeCookie());
    const [skin, setSkin] = useState(() => localStorage.getItem('ui_skin') || 'blue');
    const [sidebarType, setSidebarType] = useState(() => localStorage.getItem('ui_sidebar_type') || 'dark');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => getSidebarState() === 'collapsed');

    // Additional Settings State
    const [settings, setSettings] = useState(() => {
        try {
            const cached = localStorage.getItem('ui_features');
            return cached ? JSON.parse(cached) : { reportPanel: true, notifications: true, autoUpdates: false, offline: false };
        } catch { return { reportPanel: true, notifications: true, autoUpdates: false, offline: false }; }
    });

    // Drawer Visibility State
    const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

    // ── Fetch preferences from GET /api/user/preferences on mount ──
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        getUserPreferences()
            .then(data => {
                if (data.skin) { setSkin(data.skin); localStorage.setItem('ui_skin', data.skin); document.body.setAttribute('data-skin', data.skin); }
                if (data.sidebar_type) { setSidebarType(data.sidebar_type); localStorage.setItem('ui_sidebar_type', data.sidebar_type); }
                if (data.features) { setSettings(data.features); localStorage.setItem('ui_features', JSON.stringify(data.features)); }
            })
            .catch(err => console.warn('Could not load UI preferences:', err.message));
    }, []);

    // ── Save preferences to PUT /api/user/preferences ──
    const syncToApi = (updatedSkin, updatedSidebar, updatedFeatures) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        updateUserPreferences({
            skin: updatedSkin,
            sidebar_type: updatedSidebar,
            features: updatedFeatures
        }).catch(err => console.warn('Could not save UI preferences:', err.message));
    };

    // Toggle Settings Drawer
    const toggleSettingsDrawer = () => {
        setShowSettingsDrawer(prev => !prev);
    };

    const changeSkin = (skinId) => {
        setSkin(skinId);
        document.body.setAttribute('data-skin', skinId);
        localStorage.setItem('ui_skin', skinId);
        syncToApi(skinId, sidebarType, settings);
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
        localStorage.setItem('ui_sidebar_type', type);
        syncToApi(skin, type, settings);
    };

    // Toggle Individual Settings
    const toggleSetting = (key) => {
        setSettings(prev => {
            const next = { ...prev, [key]: !prev[key] };
            localStorage.setItem('ui_features', JSON.stringify(next));
            syncToApi(skin, sidebarType, next);
            return next;
        });
    };

    // Apply theme class on load/change
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        document.body.setAttribute('data-skin', skin);
    }, [skin]);

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
