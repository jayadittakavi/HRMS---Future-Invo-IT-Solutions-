import { API_BASE, getAuthHeader } from '../../../../config';
// Using 'superadmin' as primary fallback for management access in finance modules to ensure visibility in dev
// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'manager') => ({ 
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const loansService = {
    getDashboard: async (role = 'manager') => {
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

    getRequests: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/loans/requests`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getRequests):", error);
            return [];
        }
    },

    applyLoan: async (loanData) => {
        try {
            // Supports direct employee_id in payload for manager/HR applications
            const response = await fetch(`${API_BASE}/loans/apply`, {
                method: "POST",
                headers: authHeader('employee').headers,
                body: JSON.stringify(loanData)
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (applyLoan):", error);
            throw error;
        }
    },

    updateLoanStatus: async (id, action, role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/loans/${id}/action`, {
                method: "PATCH",
                headers: authHeader(role).headers,
                body: JSON.stringify({ action }) // action = 'APPROVE' | 'REJECT'
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (updateLoanStatus):", error);
            throw error;
        }
    }
};
