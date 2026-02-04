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
    const [loading, setLoading] = useState(false); // Add loading state if needed by ProtectedRoute

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

    // Check if user has permission to view a specific dashboard
    const canAccess = (requiredRoles) => {
        if (!user) return false;
        if (user.role === 'superadmin' || user.role === 'admin') return true; // Superadmin and Admin access everything
        return requiredRoles.includes(user.role);
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
        <AuthContext.Provider value={{ user, token, login, logout, canAccess, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
