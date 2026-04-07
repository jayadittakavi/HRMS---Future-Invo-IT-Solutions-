// src/config.js

// Utilizing the Vite proxy configured in vite.config.js
// This ensures requests go to http://100.67.241.99:5000/api via the local dev server
export const API_BASE = "/api";

// Latest Tokens provided by the user (as of April 6, 2026)
export const TEST_TOKENS = {
    superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzU1NTA1MzN9.GONoLYTgYRfAgM990LB6B_ne9dFnannRVFMtbaX_PRg",
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOCwicm9sZSI6IkVNUExPWUVFIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc0OTM4MjE1fQ.2tKpw8dQUZl-HceXNZobDsRA5Q5dj07xClRd8nGM9qA",
    hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywicm9sZSI6IkZVTExUSU1FIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc1MTMwMzk4fQ.hSc8v5HHGiFcHfQMQtZvg4lUqPrOnqBqxTY1fKfHaDc",
    manager: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1OCwicm9sZSI6Ik1BTkFHRVIiLCJjb21wYW55X2lkIjozLCJleHAiOjE3NzU2MjQ4NDR9.kT9_zffc5FomqpLt1mQneD5rtXwtg7cjZ8vk4ksFcvw",
    employee: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1Nywicm9sZSI6IkVNUExPWUVFIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc1NjI1MTQ4fQ.3vyBTLAw9rrRb_SInaSQBSlTogD166HmBk_g5GQ6iZQ"
};

/**
 * Standard Auth Header helper to keep consistent token usage.
 * Prioritizes localStorage actual logged-in user, then falls back to test tokens if role matches.
 * @param {string} role - The role for which to get the test token if localStorage is empty.
 */
export const getAuthHeader = (role = 'superadmin') => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    
    // Choose appropriate fallback token
    const normalizedRole = (role || 'superadmin').toLowerCase().replace(/_/g, '');
    let tokenKey = normalizedRole;
    if (normalizedRole.includes('hr') || normalizedRole.includes('fulltime')) tokenKey = 'hr';
    if (normalizedRole.includes('employee')) tokenKey = 'employee';
    if (normalizedRole.includes('manager')) tokenKey = 'manager';
    
    const fallbackToken = TEST_TOKENS[tokenKey] || TEST_TOKENS.superadmin;
    
    const finalToken = (role === 'superadmin' && !token) ? fallbackToken : (token || fallbackToken);
    
    // Safety: If the requested role is superadmin, we MUST use the superadmin token if available
    const tokenToUse = (role === 'superadmin') ? (TEST_TOKENS.superadmin || finalToken) : finalToken;

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenToUse}`
    };
};
