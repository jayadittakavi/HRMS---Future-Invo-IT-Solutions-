import { API_BASE, getAuthHeader } from '../config';

// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'superadmin') => ({ headers: getAuthHeader(role) });

export const leaveService = {
    // 1. Dashboard Overview (Personalized for Employee Dashboard)
    getDashboardSummary: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/my-dashboard/summary`, authHeader('employee'));
            if (!response.ok) return { totalBalance: 0, pending: 0, approved: 0, total: 0, leaveTypes: [], recentRequests: [] };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getDashboardSummary):", error);
            return { totalBalance: 0, pending: 0, approved: 0, total: 0, leaveTypes: [], recentRequests: [] };
        }
    },
    getDashboardTrends: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/my-dashboard/trends`, authHeader('employee'));
            if (!response.ok) return { labels: [], data: [] };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getDashboardTrends):", error);
            return { labels: [], data: [] };
        }
    },
    getRecentRequests: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/my-dashboard/recent`, authHeader('employee'));
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getRecentRequests):", error);
            return [];
        }
    },

    // 1b. Administration Dashboard (Management Control)
    getManagementSummary: async () => {
        try {
            const response = await fetch(`${API_BASE}/leave/dashboard-stats`, authHeader());
            if (!response.ok) return { total: 0, pending: 0, approved: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getManagementSummary):", error);
            return { total: 0, pending: 0, approved: 0 };
        }
    },
    getManagementTrends: async () => {
        try {
            // Reusing dashboard-stats endpoint as it returns weekly/monthly analytics
            const response = await fetch(`${API_BASE}/leave/dashboard-stats`, authHeader());
            if (!response.ok) return { labels: [], data: [] };
            const data = await response.json();
            return data?.trends || data?.data?.trends || { labels: [], data: [] };
        } catch (error) {
            console.error("API Error (getManagementTrends):", error);
            return { labels: [], data: [] };
        }
    },
    getManagementRecentRequests: async () => {
        try {
            const response = await fetch(`${API_BASE}/leave/control/recent-requests`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error("API Error (getManagementRecentRequests):", error);
            return [];
        }
    },

    // 2. Pending & Bulk Approvals
    getPendingApprovals: async () => {
        try {
            const response = await fetch(`${API_BASE}/leave/pending-approvals`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error("API Error (getPendingApprovals):", error);
            return [];
        }
    },
    bulkAction: async (ids, action) => {
        try {
            const response = await fetch(`${API_BASE}/leave/control/bulk-action`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ids, action }),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (bulkAction):", error);
            throw error;
        }
    },

    // 3. Leave Policy Configuration (Rules)
    getUiPolicies: async () => {
        try {
            const response = await fetch(`${API_BASE}/leave/control/policies`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error("API Error (getUiPolicies):", error);
            return [];
        }
    },
    createUiPolicy: async (policyData) => {
        try {
            const response = await fetch(`${API_BASE}/leave/control/policies`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(policyData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (createUiPolicy):", error);
            throw error;
        }
    },
    updateUiPolicy: async (id, policyData) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/ui-policies/${id}`, {
                method: "PUT",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(policyData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateUiPolicy):", error);
            throw error;
        }
    },
    deleteUiPolicy: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/ui-policies/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            return response.status === 204 || response.ok;
        } catch (error) {
            console.error("API Error (deleteUiPolicy):", error);
            return false;
        }
    },

    // 4. History Log (Audit & Search)
    getHistory: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE}/leave/control/history${queryParams ? `?${queryParams}` : ""}`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error("API Error (getHistory):", error);
            return [];
        }
    },
    exportHistory: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            // This endpoint handles CSV generation and returns the downloadable stream
            window.location.href = `${API_BASE}/leave/control/history/export${queryParams ? `?${queryParams}` : ""}`;
        } catch (error) {
            console.error("API Error (exportHistory):", error);
        }
    },

    // 5. Individual Actions
    approveLeave: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/${id}/approve`, {
                method: "POST",
                ...authHeader()
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (approveLeave):", error);
            throw error;
        }
    },
    rejectLeave: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/${id}/action`, {
                method: "PUT",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "REJECT" }),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (rejectLeave):", error);
            throw error;
        }
    },

    // 6. Enhanced Leave APIs (Personal)
    getLeaveTypes: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/types`, authHeader('employee'));
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getLeaveTypes):", error);
            return [];
        }
    },
    calculateDays: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/calculate-days`, {
                method: "POST",
                headers: {
                    ...authHeader('employee').headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result?.data || result;
        } catch (error) {
            console.error("API Error (calculateDays):", error);
            throw error;
        }
    },
    applyLeave: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/leaves/apply`, {
                method: "POST",
                headers: {
                    ...authHeader('employee').headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (applyLeave):", error);
            throw error;
        }
    },
    getAllMine: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/mine`, authHeader('employee'));
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getAllMine):", error);
            return [];
        }
    },
    getBalance: async () => {
        try {
            const response = await fetch(`${API_BASE}/leaves/balance`, authHeader('employee'));
            return await response.json();
        } catch (error) {
            console.error("API Error (getBalance):", error);
            return [];
        }
    }
};
