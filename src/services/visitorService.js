import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'employee') => ({ headers: getAuthHeader(role) });

export const visitorService = {
    // 1. Host (Employee) List
    getStaffList: async () => {
        try {
            const response = await fetch(`${API_BASE}/visitor/staff-list`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStaffList):", error);
            return [];
        }
    },

    // 2. Submit New Request
    submitRequest: async (requestData) => {
        try {
            const response = await fetch(`${API_BASE}/visitor/request`, {
                method: 'POST',
                headers: {
                    ...authHeader().headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (submitRequest):", error);
            throw error;
        }
    },

    // 3. Visitor Logs & Requests
    getVisitorList: async (params = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE}/visitor/list${query ? `?${query}` : ""}`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getVisitorList):", error);
            return [];
        }
    },

    // 4. Visitor Actions (Approve/Reject/Log)
    takeAction: async (requestId, action) => {
        try {
            const response = await fetch(`${API_BASE}/visitor/action/${requestId}`, {
                method: 'POST',
                headers: {
                    ...authHeader().headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action })
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (takeAction):", error);
            throw error;
        }
    },

    // 5. Daily Summary (Dashboard)
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/visitor/stats`, authHeader());
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return null;
        }
    },

    // 6. Print Pass Data
    getPrintData: async (requestId) => {
        try {
            const response = await fetch(`${API_BASE}/visitor/print/${requestId}`, authHeader());
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getPrintData):", error);
            return null;
        }
    }
};
