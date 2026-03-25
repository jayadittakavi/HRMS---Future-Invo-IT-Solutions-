const BASE_URL = "/api/leaves";

export const leaveService = {
    // 1. Dashboard Overview
    getDashboardSummary: async () => {
        const response = await fetch(`${BASE_URL}/dashboard/summary`);
        return response;
    },
    getDashboardTrends: async () => {
        const response = await fetch(`${BASE_URL}/dashboard/trends`);
        return response;
    },

    // 2. Pending & Bulk Approvals
    getPendingApprovals: async () => {
        const response = await fetch(`${BASE_URL}/pending-approvals`);
        return response;
    },
    bulkAction: async (ids, action) => {
        const response = await fetch(`${BASE_URL}/bulk-action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids, action }),
        });
        return response;
    },

    // 3. Leave Policy Management (CRUD)
    getUiPolicies: async () => {
        const response = await fetch(`${BASE_URL}/ui-policies`);
        return response;
    },
    createUiPolicy: async (policyData) => {
        const response = await fetch(`${BASE_URL}/ui-policies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(policyData),
        });
        return response;
    },
    updateUiPolicy: async (id, policyData) => {
        const response = await fetch(`${BASE_URL}/ui-policies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(policyData),
        });
        return response;
    },
    deleteUiPolicy: async (id) => {
        const response = await fetch(`${BASE_URL}/ui-policies/${id}`, {
            method: "DELETE",
        });
        return response;
    },

    // 4. History Log
    getHistory: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${BASE_URL}/history${queryParams ? `?${queryParams}` : ""}`);
        return response;
    },

    // 5. Individual Actions
    approveLeave: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}/approve`, {
            method: "POST",
        });
        return response;
    },
    rejectLeave: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}/action`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "REJECT" }),
        });
        return response;
    }
};
