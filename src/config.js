// src/config.js

// Utilizing the Vite proxy configured in vite.config.js
// This ensures requests go to http://100.67.241.99:5000/api via the local dev server
export const API_BASE = "/api";

// Latest Tokens provided by the user (as of March 26, 2026)
export const TEST_TOKENS = {
    superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ2OTkyMzB9.A-xsMXYYQHQMulVU5l2FvFnWapakriZ7WgqpS9mfFnE",
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjozLCJleHAiOjE3NzQ2MTE4MjV9.dXJnujoGhWQsEImGIoBphsLGB6jVH---XGO3",
    hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywicm9sZSI6IkZVTExUSU1FIiwiY29tcGFueV9pZCI6MywiZXhwIjoxNzc0NzA0NTcxfQ.PMLM4zArIGyg3HS_NHybOu3jyRS3VOdy4X1dbZguUGs"
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
    
    const fallbackToken = TEST_TOKENS[tokenKey] || TEST_TOKENS.superadmin;
    
    const finalToken = token || fallbackToken;

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${finalToken}`
    };
};
