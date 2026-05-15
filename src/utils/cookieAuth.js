/**
 * cookieAuth.js — Central cookie management utility for HRMS
 *
 * ⚠️  Security note:
 *   - auth_token / refresh_token are HttpOnly in production (set by backend).
 *   - For frontend-side dev, we mirror them in js-cookie with maxAge limits.
 *   - Never store passwords. Never trust frontend role alone — backend validates.
 */

import Cookies from 'js-cookie';

// ─── Cookie Names ─────────────────────────────────────────────────────────────
export const COOKIE_KEYS = {
  AUTH_TOKEN:        'auth_token',
  REFRESH_TOKEN:     'refresh_token',
  USER_ROLE:         'user_role',
  USER_DATA:         'user_data',
  PERMISSIONS:       'permissions',
  THEME:             'ui_theme',
  SIDEBAR_STATE:     'sidebar_state',
  LAST_LOGIN:        'last_login_time',
  LAST_MODULE:       'last_active_module',
};

// ─── Cookie Options ───────────────────────────────────────────────────────────
const isProduction = import.meta.env.PROD;

/** Auth token: 1 hour */
const AUTH_OPTIONS = {
  expires: 1 / 24,          // 1 hour
  sameSite: 'Strict',
  secure: isProduction,      // Secure=true in production (HTTPS)
  // HttpOnly cannot be set from JS — must be set by Flask backend.
  // Frontend mirrors it for SPA state management only.
};

/** Refresh token: 7 days */
const REFRESH_OPTIONS = {
  expires: 7,
  sameSite: 'Strict',
  secure: isProduction,
};

/** Non-sensitive UI prefs: 30 days */
const PREF_OPTIONS = {
  expires: 30,
  sameSite: 'Lax',
  secure: isProduction,
};

/** Short-lived tracking: 1 day */
const TRACK_OPTIONS = {
  expires: 1,
  sameSite: 'Strict',
  secure: isProduction,
};

// ─── 1. Auth Cookies ─────────────────────────────────────────────────────────

/**
 * Set all authentication cookies on successful login.
 * @param {string} authToken    - JWT access token
 * @param {string} refreshToken - JWT refresh token (optional)
 * @param {object} user         - User object { id, name, email, role, permissions }
 */
export function setAuthCookies(authToken, refreshToken, user) {
  // Tokens
  Cookies.set(COOKIE_KEYS.AUTH_TOKEN, authToken, AUTH_OPTIONS);
  if (refreshToken) {
    Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, REFRESH_OPTIONS);
  }

  // Role & user data (non-sensitive, used for UI rendering)
  const role = user?.role?.toLowerCase();
  Cookies.set(COOKIE_KEYS.USER_ROLE, role, REFRESH_OPTIONS);

  // Serialize user data (exclude sensitive fields)
  const safeUser = {
    id:           user?.id,
    name:         user?.name || `${user?.firstName || user?.first_name || ''} ${user?.lastName || user?.last_name || ''}`.trim() || user?.username || (user?.email ? user.email.split('@')[0] : 'User'),
    firstName:    user?.firstName || user?.first_name || user?.firstName,
    lastName:     user?.lastName || user?.last_name || user?.lastName,
    first_name:   user?.first_name || user?.firstName,
    last_name:    user?.last_name || user?.lastName,
    username:     user?.username,
    email:        user?.email,
    role,
    company_id:   user?.company_id,
    company_name: user?.company_name,
    profilePic:   user?.profilePic || user?.profile_pic || user?.avatar
  };
  Cookies.set(COOKIE_KEYS.USER_DATA, JSON.stringify(safeUser), REFRESH_OPTIONS);

  // Permissions
  if (user?.permissions) {
    Cookies.set(COOKIE_KEYS.PERMISSIONS, JSON.stringify(user.permissions), REFRESH_OPTIONS);
  }

  // Activity tracking
  Cookies.set(COOKIE_KEYS.LAST_LOGIN, new Date().toISOString(), TRACK_OPTIONS);

  // Mirror to localStorage for backward compatibility with existing code
  localStorage.setItem('authToken', authToken);
  localStorage.setItem('token', authToken);
  localStorage.setItem('user', JSON.stringify(safeUser));
}

/**
 * Clear all authentication + tracking cookies on logout.
 */
export function clearAuthCookies() {
  Object.values(COOKIE_KEYS).forEach(key => {
    // Keep UI preferences on logout
    if (key !== COOKIE_KEYS.THEME && key !== COOKIE_KEYS.SIDEBAR_STATE) {
      Cookies.remove(key);
    }
  });

  // Also clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * Get the auth token from cookie (falls back to localStorage).
 * @returns {string|null}
 */
export function getAuthToken() {
  return Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
    || localStorage.getItem('authToken')
    || localStorage.getItem('token')
    || null;
}

/**
 * Get the refresh token from cookie.
 * @returns {string|null}
 */
export function getRefreshToken() {
  return Cookies.get(COOKIE_KEYS.REFRESH_TOKEN) || null;
}

/**
 * Check if the user is authenticated (token present in cookie or localStorage).
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

// ─── 2. User & Role ──────────────────────────────────────────────────────────

/**
 * Get the stored user object from cookie.
 * @returns {object|null}
 */
export function getStoredUser() {
  try {
    const raw = Cookies.get(COOKIE_KEYS.USER_DATA) || localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Get the stored user role.
 * @returns {string|null}
 */
export function getStoredRole() {
  return Cookies.get(COOKIE_KEYS.USER_ROLE)
    || getStoredUser()?.role
    || null;
}

/**
 * Get stored permissions object.
 * @returns {object}
 */
export function getStoredPermissions() {
  try {
    const raw = Cookies.get(COOKIE_KEYS.PERMISSIONS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ─── 3. UI Preference Cookies ────────────────────────────────────────────────

/**
 * Save UI theme preference.
 * @param {'light'|'dark'|'gradient'} theme
 */
export function setThemeCookie(theme) {
  Cookies.set(COOKIE_KEYS.THEME, theme, PREF_OPTIONS);
}

/**
 * Get stored UI theme preference.
 * @returns {'light'|'dark'|'gradient'}
 */
export function getThemeCookie() {
  return Cookies.get(COOKIE_KEYS.THEME) || 'light';
}

/**
 * Save sidebar state.
 * @param {'collapsed'|'expanded'} state
 */
export function setSidebarState(state) {
  Cookies.set(COOKIE_KEYS.SIDEBAR_STATE, state, PREF_OPTIONS);
}

/**
 * Get stored sidebar state.
 * @returns {'collapsed'|'expanded'}
 */
export function getSidebarState() {
  return Cookies.get(COOKIE_KEYS.SIDEBAR_STATE) || 'expanded';
}

// ─── 4. Activity Tracking ────────────────────────────────────────────────────

/**
 * Record the last module the user visited.
 * @param {string} moduleName
 */
export function setLastActiveModule(moduleName) {
  Cookies.set(COOKIE_KEYS.LAST_MODULE, moduleName, TRACK_OPTIONS);
}

/**
 * Get the last module the user visited.
 * @returns {string|null}
 */
export function getLastActiveModule() {
  return Cookies.get(COOKIE_KEYS.LAST_MODULE) || null;
}

/**
 * Get the last login time.
 * @returns {string|null} ISO date string
 */
export function getLastLoginTime() {
  return Cookies.get(COOKIE_KEYS.LAST_LOGIN) || null;
}

// ─── 5. Token Refresh ────────────────────────────────────────────────────────

/**
 * Attempt to refresh the auth token using the refresh token.
 * Called automatically when auth_token is missing but refresh_token exists.
 * @returns {Promise<string|null>} new auth token or null
 */
export async function attemptTokenRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const BASE = '';
    const response = await fetch(`${BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      clearAuthCookies();
      return null;
    }

    const data = await response.json();
    if (data.token) {
      Cookies.set(COOKIE_KEYS.AUTH_TOKEN, data.token, AUTH_OPTIONS);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('token', data.token);
      return data.token;
    }

    return null;
  } catch {
    return null;
  }
}
