/**
 * settingsService.js
 * Centralized service for all System Settings API calls.
 * All endpoints require JWT in Authorization header.
 * Includes 10-second timeout on all requests.
 */

import { getAuthToken } from '../utils/cookieAuth';

const TIMEOUT_MS = 10000; // 10 seconds

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken() || ''}`
});

/** Fetch with AbortController timeout */
const fetchWithTimeout = (url, options = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    return fetch(url, { ...options, signal: controller.signal })
        .catch(err => {
            if (err.name === 'AbortError') throw new Error('Request timed out. Please check your backend connection.');
            throw err;
        })
        .finally(() => clearTimeout(timer));
};

const handleResponse = async (res) => {
    const text = await res.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }
    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expired');
    }
    if (!res.ok) throw new Error(data.message || data.error || `Request failed (${res.status})`);
    return data;
};

// ─── 1. Company Settings ─────────────────────────────────
// GET /api/settings/company
export const getCompanySettings = () =>
    fetchWithTimeout('/api/settings/company', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/company
export const updateCompanySettings = (body) =>
    fetchWithTimeout('/api/settings/company', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// POST /api/settings/company/logo  (multipart)
export const uploadCompanyLogo = (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return fetchWithTimeout('/api/settings/company/logo', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken() || ''}` },
        body: formData
    }).then(handleResponse);
};

// ─── 2. Roles & Permissions ──────────────────────────────
// GET /api/settings/roles
export const getRolesSettings = () =>
    fetchWithTimeout('/api/settings/roles', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/roles
export const updateRolesSettings = (body) =>
    fetchWithTimeout('/api/settings/roles', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 3. Attendance Settings ──────────────────────────────
// GET /api/settings/attendance
export const getAttendanceSettings = () =>
    fetchWithTimeout('/api/settings/attendance', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/attendance
export const updateAttendanceSettings = (body) =>
    fetchWithTimeout('/api/settings/attendance', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 4. Leave Settings ───────────────────────────────────
// GET /api/settings/leave
export const getLeaveSettings = () =>
    fetchWithTimeout('/api/settings/leave', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/leave
export const updateLeaveSettings = (body) =>
    fetchWithTimeout('/api/settings/leave', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 5. Payroll Settings ─────────────────────────────────
// GET /api/settings/payroll
export const getPayrollSettings = () =>
    fetchWithTimeout('/api/settings/payroll', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/payroll
export const updatePayrollSettings = (body) =>
    fetchWithTimeout('/api/settings/payroll', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 6. Notification Settings ────────────────────────────
// GET /api/settings/notifications
export const getNotificationSettings = () =>
    fetchWithTimeout('/api/settings/notifications', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/notifications
export const updateNotificationSettings = (body) =>
    fetchWithTimeout('/api/settings/notifications', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 7. Security Settings ────────────────────────────────
// GET /api/settings/security
export const getSecuritySettings = () =>
    fetchWithTimeout('/api/settings/security', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/security
export const updateSecuritySettings = (body) =>
    fetchWithTimeout('/api/settings/security', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 8. Document Settings ────────────────────────────────
// GET /api/settings/documents
export const getDocumentSettings = () =>
    fetchWithTimeout('/api/settings/documents', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/documents
export const updateDocumentSettings = (body) =>
    fetchWithTimeout('/api/settings/documents', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 9. Integration Settings ─────────────────────────────
// GET /api/settings/integrations
export const getIntegrationSettings = () =>
    fetchWithTimeout('/api/settings/integrations', { headers: getHeaders() }).then(handleResponse);

// PUT /api/settings/integrations
export const updateIntegrationSettings = (body) =>
    fetchWithTimeout('/api/settings/integrations', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 10. User UI Preferences ─────────────────────────────
// GET /api/user/preferences
export const getUserPreferences = () =>
    fetchWithTimeout('/api/user/preferences', { headers: getHeaders() }).then(handleResponse);

// PUT /api/user/preferences
export const updateUserPreferences = (body) =>
    fetchWithTimeout('/api/user/preferences', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ─── 11. Change Password ─────────────────────────────────
// POST /api/auth/change-password
export const changePassword = (body) =>
    fetchWithTimeout('/api/auth/change-password', { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
