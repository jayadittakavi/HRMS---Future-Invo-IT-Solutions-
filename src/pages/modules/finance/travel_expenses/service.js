import { API_BASE, getAuthHeader } from '../../../../config';
// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'manager') => ({ 
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const expenseService = {
    getStats: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/travel-expenses/stats`, { headers: getAuthHeader(role) });
            if (!response.ok) return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
        }
    },

    getTrends: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/travel-expenses/trends`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getTrends):", error);
            return [];
        }
    },

    getClaims: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/travel-expenses/claims`, { headers: getAuthHeader(role) });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getClaims):", error);
            return [];
        }
    },

    getBudgetUtilization: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/travel-expenses/budget`, { headers: getAuthHeader(role) });
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
            const response = await fetch(`${API_BASE}/travel-expenses/claims`, {
                method: "POST",
                headers: authHeader('employee').headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (submitClaim):", error);
            throw error;
        }
    },

    updateClaimStatus: async (id, action, reason = "", role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/travel-expenses/claims/${id}/action`, {
                method: "PATCH",
                headers: authHeader(role).headers,
                body: JSON.stringify({ action, reason })
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (updateClaimStatus):", error);
            throw error;
        }
    }
};
