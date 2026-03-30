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

export const loansService = {
    getDashboard: async () => {
        try {
            const response = await fetch(`${API_BASE}/loans/dashboard`, getAuthHeader());
            if (!response.ok) return { stats: {}, charts: {} };
            return await response.json();
        } catch (error) {
            console.error("API Error (getDashboard):", error);
            return { stats: {}, charts: {} };
        }
    },

    getRequests: async () => {
        try {
            const response = await fetch(`${API_BASE}/loans/requests`, getAuthHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getRequests):", error);
            return [];
        }
    },

    applyLoan: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/loans/apply`, {
                method: "POST",
                headers: getAuthHeader().headers,
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
                headers: getAuthHeader().headers,
                body: JSON.stringify({ action }) // action = 'APPROVE' | 'REJECT'
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateLoanStatus):", error);
            throw error;
        }
    }
};
