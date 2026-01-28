import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        // Redirect to their default dashboard if unauthorized for this specific page
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
