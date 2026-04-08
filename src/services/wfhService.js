import { API_BASE, getAuthHeader } from '../config';

export const wfhService = {
    // 🔹 Get WFH Summary Stats (Team-scoped for Manager, Company for HR)
    getSummary: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/wfh/summary`, {
                headers: getAuthHeader(role)
            });
            if (!response.ok) return { total: 0, pending: 0, approved: 0, rejected: 0 };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getSummary):", error);
            return { total: 0, pending: 0, approved: 0, rejected: 0 };
        }
    },

    // 🔹 Get WFH Request History (Search & Filter supported)
    getRequests: async (filters = {}, role = 'manager') => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE}/wfh/requests${queryParams ? `?${queryParams}` : ""}`, {
                headers: getAuthHeader(role)
            });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getRequests):", error);
            return [];
        }
    },

    // 🔹 Allocate WFH (Management only)
    allocateWFH: async (allocationData, role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/wfh/allocate`, {
                method: "POST",
                headers: {
                    ...getAuthHeader(role),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(allocationData)
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (allocateWFH):", error);
            throw error;
        }
    },

    // 🔹 Export WFH Logs (CSV download)
    exportWFH: async (filters = {}, role = 'manager') => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            window.location.href = `${API_BASE}/wfh/export${queryParams ? `?${queryParams}` : ""}`;
        } catch (error) {
            console.error("API Error (exportWFH):", error);
        }
    },

    // 🔹 Submit New Request (Personal)
    submitRequest: async (wfhData) => {
        try {
            const response = await fetch(`${API_BASE}/wfh/request`, {
                method: "POST",
                headers: {
                    ...getAuthHeader('employee'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(wfhData)
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API Error (submitRequest):", error);
            throw error;
        }
    },

    // 🔹 Management Action (Approve/Reject)
    updateStatus: async (id, actionData, role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/wfh/${id}/action`, {
                method: "PATCH",
                headers: {
                    ...getAuthHeader(role),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(actionData)
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateStatus ${id}):`, error);
            throw error;
        }
    }
};
