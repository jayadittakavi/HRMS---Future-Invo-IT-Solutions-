import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — Guards routes based on:
 *  1. Authentication (cookie session)
 *  2. Role-based access (requiredRoles)
 *  3. Permission-based access (requiredPermission)
 */
const ProtectedRoute = ({ children, requiredRoles = [], requiredPermission = null }) => {
  const { user, loading, canAccess } = useAuth();
  const location = useLocation();

  // Show spinner while session is being restored from cookie
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f3ff',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #6c5ce7',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
          Restoring session…
        </p>
      </div>
    );
  }

  // Not authenticated → redirect to login, preserving intended URL
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but missing required role/permission → access denied
  if (!canAccess(requiredRoles, requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
