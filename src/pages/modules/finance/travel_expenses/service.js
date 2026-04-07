import { API_BASE, getAuthHeader } from '../../../../config';
// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'superadmin') => ({ 
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const expenseService = {
    getStats: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/expenses/stats`, { headers: getAuthHeader(role) });
            if (!response.ok) return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
        }
    },

    getTrends: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/expenses/trends`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getTrends):", error);
            return [];
        }
    },

    getClaims: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/expenses/claims`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getClaims):", error);
            return [];
        }
    },

    getBudgetUtilization: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/expenses/budget-utilization`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getBudgetUtilization):", error);
            return [];
        }
    },

    submitClaim: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/expenses/claims`, {
                method: "POST",
                headers: authHeader('employee').headers,
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (submitClaim):", error);
            throw error;
        }
    },

    updateClaimStatus: async (id, action, reason = "") => {
        try {
            const response = await fetch(`${API_BASE}/expenses/claims/${id}/action`, {
                method: "PATCH",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify({ action, reason })
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateClaimStatus):", error);
            throw error;
        }
    }
};
