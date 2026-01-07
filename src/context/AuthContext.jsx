import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Determine role based on email pattern
        let role = 'employee'; // Default
        let status = 'active';

        const normalizedEmail = email.toLowerCase();

        if (normalizedEmail.includes('superadmin')) {
            role = 'superadmin';
        } else if (normalizedEmail.includes('admin')) {
            role = 'admin';
        } else if (normalizedEmail.includes('manager')) {
            role = 'manager';
        } else if (normalizedEmail.includes('hr')) {
            role = 'hr';
        } else if (normalizedEmail.includes('accountant')) {
            role = 'accountant';
        } else if (normalizedEmail.includes('newuser')) {
            role = 'newuser';
            status = 'pending';
        }

        const userData = { email, role, status };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Check if user has permission to view a specific dashboard
    const canAccess = (requiredRoles) => {
        if (!user) return false;
        if (user.role === 'superadmin') return true; // Superadmin accesses everything
        return requiredRoles.includes(user.role);
    };

    const value = {
        user,
        login,
        logout,
        canAccess,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
