const API_BASE = "http://192.168.1.13:5000/api";

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
        const response = await fetch(`${API_BASE}/superadmin/audit-logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Get Audit Logs for Admin (Organization Level)
    getAdminLogs: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/admin/audit-logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // Get Audit Logs with optional filters
    getAuditLogs: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/audit-logs?${queryParams}`, {
            method: "GET",
            ...authHeader()
        });

        if (!response.ok) {
            // If endpoint doesn't exist yet, we might want to return mock data for now to not break the UI demo
            // But standard practice is to throw error. I will handle error gracefully in the component.
            throw new Error(await response.text());
        }
        return response.json();
    }
};
