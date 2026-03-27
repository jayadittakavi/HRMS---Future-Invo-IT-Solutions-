import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Standard HR fallback
    };
};

export const leaveService = {
    // 1. Dashboard Overview
    getDashboardSummary: async () => {
        const response = await fetch(`${API_BASE}/leaves/dashboard/summary`, authHeader());
        if (!response.ok) return { total: 0, pending: 0, approved: 0 };
        return response.json();
    },
    getDashboardTrends: async () => {
        const response = await fetch(`${API_BASE}/leaves/dashboard/trends`, authHeader());
        if (!response.ok) return [];
        return response.json();
    },

    // 2. Pending & Bulk Approvals
    getPendingApprovals: async () => {
        const response = await fetch(`${API_BASE}/leaves/pending-approvals`, authHeader());
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    },
    bulkAction: async (ids, action) => {
        const response = await fetch(`${API_BASE}/leaves/bulk-action`, {
            method: "POST",
            ...authHeader(),
            body: JSON.stringify({ ids, action }),
        });
        return response.json();
    },

    // 3. Leave Policy Management (CRUD)
    getUiPolicies: async () => {
        const response = await fetch(`${API_BASE}/leaves/ui-policies`, authHeader());
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    },
    createUiPolicy: async (policyData) => {
        const response = await fetch(`${API_BASE}/leaves/ui-policies`, {
            method: "POST",
            ...authHeader(),
            body: JSON.stringify(policyData),
        });
        return response.json();
    },
    updateUiPolicy: async (id, policyData) => {
        const response = await fetch(`${API_BASE}/leaves/ui-policies/${id}`, {
            method: "PUT",
            ...authHeader(),
            body: JSON.stringify(policyData),
        });
        return response.json();
    },
    deleteUiPolicy: async (id) => {
        const response = await fetch(`${API_BASE}/leaves/ui-policies/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        return response.status === 204 || response.ok;
    },

    // 4. History Log
    getHistory: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE}/leaves/history${queryParams ? `?${queryParams}` : ""}`, authHeader());
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : (data.data || []);
    },

    // 5. Individual Actions
    approveLeave: async (id) => {
        const response = await fetch(`${API_BASE}/leaves/${id}/approve`, {
            method: "POST",
            ...authHeader()
        });
        return response.json();
    },
    rejectLeave: async (id) => {
        const response = await fetch(`${API_BASE}/leaves/${id}/action`, {
            method: "PUT",
            ...authHeader(),
            body: JSON.stringify({ action: "REJECT" }),
        });
        return response.json();
    }
};
