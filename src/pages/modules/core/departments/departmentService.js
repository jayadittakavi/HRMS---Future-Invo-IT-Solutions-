const tokens = {
    superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k"
};

const getToken = () => localStorage.getItem("token") || localStorage.getItem("authToken") || tokens.superadmin;
const API_BASE = "/api/superadmin";

export const departmentService = {
    getDepartments: async () => {
        const response = await fetch(`${API_BASE}/departments`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error("Failed to fetch departments");
        return response.json();
    },

    createDepartment: async (data) => {
        const response = await fetch(`${API_BASE}/departments`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to create department");
        return response.json();
    },

    updateDepartment: async (id, data) => {
        const response = await fetch(`${API_BASE}/departments/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to update department");
        return response.json();
    },

    toggleStatus: async (id) => {
        const response = await fetch(`${API_BASE}/departments/${id}/toggle-status`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if (!response.ok) throw new Error("Failed to toggle status");
        return response.json();
    },

    getCompanies: async () => {
        const response = await fetch(`${API_BASE}/companies`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error("Failed to fetch companies");
        return response.json();
    }
};
