import { API_BASE, getAuthHeader } from '../config';

export const auditService = {
    // 1. Main Audit Logs API (Hierarchy based)
    // Query Parameters: module, action, year, month, day, status, page, limit
    getAuditLogs: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE}/audit/logs${queryParams ? `?${queryParams}` : ''}`, {
                method: 'GET',
                headers: getAuthHeader()
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Audit Logs Error:", errorData);
                return { logs: [], total: 0 };
            }
            
            return await response.json();
        } catch (error) {
            console.error("API Error (getAuditLogs):", error);
            return { logs: [], total: 0 };
        }
    },

    // 2. My Logs API (Currently logged-in user)
    getMyLogs: async () => {
        try {
            const response = await fetch(`${API_BASE}/audit/my-logs`, {
                method: 'GET',
                headers: getAuthHeader()
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("My Logs Error:", errorData);
                return [];
            }
            
            return await response.json();
        } catch (error) {
            console.error("API Error (getMyLogs):", error);
            return [];
        }
    }
};
