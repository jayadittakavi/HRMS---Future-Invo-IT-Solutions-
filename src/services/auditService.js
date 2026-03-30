import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Audit logs are standard for HR / Super Admin
    };
};

export const auditService = {
    // 1. Get Audit Logs
    getAuditLogs: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE}/audit/logs${queryParams ? `?${queryParams}` : ''}`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getAuditLogs):", error);
            return [];
        }
    }
};
