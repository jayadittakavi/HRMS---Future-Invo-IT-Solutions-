import { API_BASE, getAuthHeader } from '../../../../config';
// Using 'superadmin' as primary fallback for management access in finance modules to ensure visibility in dev
// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'superadmin') => ({ 
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const loansService = {
    getDashboard: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/loans/dashboard`, { headers: getAuthHeader(role) });
            if (!response.ok) return { stats: {}, charts: {} };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getDashboard):", error);
            return { stats: {}, charts: {} };
        }
    },

    getRequests: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/loans/requests`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getRequests):", error);
            return [];
        }
    },

    applyLoan: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/loans/apply`, {
                method: "POST",
                headers: authHeader('employee').headers,
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (applyLoan):", error);
            throw error;
        }
    },

    updateLoanStatus: async (id, action) => {
        try {
            const response = await fetch(`${API_BASE}/loans/${id}/action`, {
                method: "PATCH",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify({ action }) // action = 'APPROVE' | 'REJECT'
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateLoanStatus):", error);
            throw error;
        }
    }
};
