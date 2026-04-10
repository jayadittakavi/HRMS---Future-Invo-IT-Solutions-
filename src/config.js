// src/config.js

// Utilizing the Vite proxy configured in vite.config.js
// This ensures requests go to http://100.67.241.99:5000/api via the local dev server
export const API_BASE = "/api";

// Latest Tokens provided by the user (as of April 10, 2026)
export const TEST_TOKENS = {
    superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzU5MDEwODl9.k0M6jNmOQno9p4iJs2cyIGwraUp5fqwJDREXWYQM0OI",
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1Miwicm9sZSI6IkFETUlOIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc1OTAxMTMwfQ.6_x7lRWrsOoGwUV65GBe02EfFqLxtUIfwbSuyS_BpUM",
    hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywicm9sZSI6IkZVTExUSU1FIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc1OTAxMTUxfQ.nudc-mTkF8Rv8B8MaPgMEjxBrn_cZHJOZQcL6YjtvuU",
    manager: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1OCwicm9sZSI6Ik1BTkFHRVIiLCJjb21wYW55X2lkIjozLCJleHAiOjE3NzU5MDExODl9.lVGcxD5RCwPjpb53MoecOrdpZ1zYTBvvtavI-1FYgbU",
    employee: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1Nywicm9sZSI6IkVNUExPWUVFIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc1OTAxMjA5fQ.zlvcdHtQfZqFMG-ZJluGBE9OU0cL55BhyMBIm9f9tTk"
};

/**
 * Standard Auth Header helper to keep consistent token usage.
 * Prioritizes localStorage actual logged-in user, then falls back to test tokens if role matches.
 * @param {string} role - The role for which to get the test token if localStorage is empty.
 */
export const getAuthHeader = (role = '') => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    
    // Choose appropriate fallback token
    const normalizedRole = (role || '').toLowerCase().replace(/_/g, '');
    let tokenKey = normalizedRole;
    if (normalizedRole.includes('hr') || normalizedRole.includes('fulltime')) tokenKey = 'hr';
    if (normalizedRole.includes('employee')) tokenKey = 'employee';
    if (normalizedRole.includes('manager')) tokenKey = 'manager';
    if (normalizedRole.includes('superadmin')) tokenKey = 'superadmin';
    
    const fallbackToken = TEST_TOKENS[tokenKey] || TEST_TOKENS.superadmin;
    
    // Prioritize the actual token from localStorage. 
    // Only use fallback if NO token is found in localStorage.
    const tokenToUse = token || (role === 'superadmin' ? TEST_TOKENS.superadmin : fallbackToken);

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenToUse}`
    };
};
