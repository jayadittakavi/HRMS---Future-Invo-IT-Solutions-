// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  setAuthCookies,
  clearAuthCookies,
  getAuthToken,
  getStoredUser,
  getStoredPermissions,
  attemptTokenRefresh,
  isAuthenticated,
  setLastActiveModule,
  getLastActiveModule,
  getLastLoginTime,
} from '../utils/cookieAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getAuthToken());

  const [loading, setLoading] = useState(true);

  // ── On mount: validate session via cookie / attempt refresh ──────────────
  useEffect(() => {
    const initSession = async () => {
      const existingToken = getAuthToken();

      if (existingToken) {
        // Token present — restore user from cookie
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setToken(existingToken);
        }
      } else {
        // No auth_token — try refresh
        const refreshed = await attemptTokenRefresh();
        if (refreshed) {
          const storedUser = getStoredUser();
          setUser(storedUser);
          setToken(refreshed);
        } else {
          // No valid session — clear state
          setUser(null);
          setToken(null);
        }
      }

      setLoading(false);
    };

    initSession();
  }, []);

  // ── Auto-logout on token expiry (check every 5 minutes) ──────────────────
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const currentToken = getAuthToken();
      if (!currentToken) {
        // Try refresh before logging out
        const refreshed = await attemptTokenRefresh();
        if (!refreshed) {
          logout();
        } else {
          setToken(refreshed);
        }
      }
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [user]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback((userData, authToken, refreshToken = null) => {
    // Normalize role
    const normalized = {
      ...userData,
      role: (userData.role || 'employee').toLowerCase().replace('_', ''),
    };

    // Set cookies (auth + role + user data + tracking)
    setAuthCookies(authToken, refreshToken, normalized);

    setUser(normalized);
    setToken(authToken);
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearAuthCookies();
    setUser(null);
    setToken(null);
  }, []);

  // ── Update Profile ────────────────────────────────────────────────────────
  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      // Re-save to cookie
      setAuthCookies(getAuthToken(), null, updated);
      return updated;
    });
  }, []);

  // ── Permission Helpers ────────────────────────────────────────────────────
  const hasPermission = useCallback((module, action = 'VIEW') => {
    if (!user) return false;

    const role = user.role?.toLowerCase();
    if (role === 'superadmin') return true;

    // Get live permissions (from cookie or user object)
    const permissions = getStoredPermissions() || user.permissions || {};
    const modulePerms = permissions[module] || [];

    if (Array.isArray(modulePerms)) {
      return modulePerms.some(p => p.toUpperCase() === action.toUpperCase());
    }

    return false;
  }, [user]);

  const canAccess = useCallback((requiredRoles = [], requiredPermission = null) => {
    if (!user) return false;

    const userRole = user.role?.toLowerCase();

    // SuperAdmin bypasses everything
    if (userRole === 'superadmin') return true;

    // Role check
    if (requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(r => r.toLowerCase() === userRole);
      if (hasRole) return true;
    }

    // Permission check
    if (requiredPermission) {
      return hasPermission(requiredPermission.module, requiredPermission.action);
    }

    // No restriction specified — authenticated user passes
    if (requiredRoles.length === 0 && !requiredPermission) return true;

    return false;
  }, [user, hasPermission]);

  // ── Activity Tracking ─────────────────────────────────────────────────────
  const trackModule = useCallback((moduleName) => {
    setLastActiveModule(moduleName);
  }, []);

  const getActivityInfo = useCallback(() => ({
    lastLogin:  getLastLoginTime(),
    lastModule: getLastActiveModule(),
  }), []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      updateProfile,
      hasPermission,
      canAccess,
      trackModule,
      getActivityInfo,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
