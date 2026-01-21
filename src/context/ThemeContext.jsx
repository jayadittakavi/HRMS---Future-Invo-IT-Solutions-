import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarColor, setSidebarColor] = useState('#1e293b'); // Default dark sidebar
    const [headerColor, setHeaderColor] = useState('#ffffff'); // Default white header
    const [skinColor, setSkinColor] = useState('#3b82f6'); // Default blue skin

    useEffect(() => {
        // Apply theme classes or styles to body/root if needed
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const value = {
        darkMode,
        setDarkMode,
        sidebarColor,
        setSidebarColor,
        headerColor,
        setHeaderColor,
        skinColor,
        setSkinColor
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
