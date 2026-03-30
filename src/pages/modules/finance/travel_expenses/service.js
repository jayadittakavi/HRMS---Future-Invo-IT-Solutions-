const API_BASE = "/api";

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const expenseService = {
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/expenses/stats`, getAuthHeader());
            if (!response.ok) return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" };
        }
    },

    getTrends: async () => {
        try {
            const response = await fetch(`${API_BASE}/expenses/trends`, getAuthHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getTrends):", error);
            return [];
        }
    },

    getClaims: async () => {
        try {
            const response = await fetch(`${API_BASE}/expenses/claims`, getAuthHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getClaims):", error);
            return [];
        }
    },

    submitClaim: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/expenses/claims`, {
                method: "POST",
                headers: getAuthHeader().headers,
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
                headers: getAuthHeader().headers,
                body: JSON.stringify({ action, reason })
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateClaimStatus):", error);
            throw error;
        }
    }
};
