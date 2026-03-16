const API_BASE = import.meta.env.VITE_API_BASE || "/api";

// Helper to get auth header with token
const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
};

export const auditService = {
    // Get Audit Logs for Super Admin (System-Wide)
    getSuperAdminLogs: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/audit/logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Get Audit Logs for Admin (Organization Level)
    getAdminLogs: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/audit/logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Get Audit Logs with optional filters
    getAuditLogs: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/audit/logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }
};
