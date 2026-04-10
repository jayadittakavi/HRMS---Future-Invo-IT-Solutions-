// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Safe user state initialization
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (err) {
            console.error('Invalid user data in localStorage:', err);
            localStorage.removeItem('user');
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
    const [loading, setLoading] = useState(false);

    // Login function to update context + localStorage
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('token', authToken); // Also save as 'token' for compatibility
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
    };

    /**
     * Check if user has permission for a specific module and action
     * @param {string} module - Module name (e.g., 'Attendance', 'Payroll')
     * @param {string} action - Action (e.g., 'VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT')
     * @returns {boolean}
     */
    const hasPermission = (module, action = 'VIEW') => {
        if (!user) return false;
        
        const role = user.role?.toLowerCase();
        if (role === 'superadmin') return true;

        const permissions = user.permissions || {};
        const modulePerms = permissions[module] || [];
        
        // Support both array of strings and object-based permissions if needed
        if (Array.isArray(modulePerms)) {
            return modulePerms.some(p => p.toUpperCase() === action.toUpperCase());
        }
        
        return false;
    };

    /**
     * Check if user matches any of the required roles OR has a specific permission
     * @param {string[]} requiredRoles - Array of roles that can access
     * @param {object} requiredPermission - { module, action }
     */
    const canAccess = (requiredRoles = [], requiredPermission = null) => {
        if (!user) return false;
        
        const userRole = user.role?.toLowerCase();
        
        // Superadmin bypass
        if (userRole === 'superadmin') return true;

        // Check Roles first if provided
        if (requiredRoles.length > 0) {
            const hasRole = requiredRoles.some(r => r.toLowerCase() === userRole);
            if (hasRole) return true;
        }

        // Check specific permission if provided
        if (requiredPermission) {
            return hasPermission(requiredPermission.module, requiredPermission.action);
        }

        // If no roles or permissions specified, but user is logged in
        if (requiredRoles.length === 0 && !requiredPermission) return true;

        return false;
    };

    // Update profile function
    const updateProfile = (updates) => {
        setUser((prevUser) => {
            const newUser = { ...prevUser, ...updates };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, canAccess, hasPermission, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
