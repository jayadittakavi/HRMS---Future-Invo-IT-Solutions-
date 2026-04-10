import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'employee') => ({ headers: getAuthHeader(role) });

export const visitorService = {
    // 1. Host (Employee) List
    getStaffList: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/visitor/staff-list`, authHeader(role));
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStaffList):", error);
            return [];
        }
    },

    // 2. Submit New Request
    submitRequest: async (requestData, role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/visitor/request`, {
                method: 'POST',
                headers: authHeader(role).headers,
                body: JSON.stringify(requestData)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (submitRequest):", error);
            throw error;
        }
    },

    // 3. Visitor Logs & Requests
    getVisitorList: async (params = {}, role = 'employee') => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE}/visitor/list${query ? `?${query}` : ""}`, authHeader(role));
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getVisitorList):", error);
            return [];
        }
    },

    // 4. Visitor Actions (Approve/Reject/Log)
    takeAction: async (requestId, action, role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/visitor/action/${requestId}`, {
                method: 'POST',
                headers: authHeader(role).headers,
                body: JSON.stringify({ action })
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (takeAction):", error);
            throw error;
        }
    },

    // 5. Daily Summary (Dashboard)
    getStats: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/visitor/stats`, authHeader(role));
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return null;
        }
    },

    // 6. Print Pass Data
    getPrintData: async (requestId, role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/visitor/print/${requestId}`, authHeader(role));
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getPrintData):", error);
            return null;
        }
    }
};
