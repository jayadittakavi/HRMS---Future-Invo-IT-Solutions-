import { API_BASE, getAuthHeader } from '../../../../config';

const getToken = () => getAuthHeader('superadmin').Authorization.replace('Bearer ', '');
const BASE_URL = `${API_BASE}/superadmin`;

export const departmentService = {
    getDepartments: async () => {
        const response = await fetch(`${BASE_URL}/departments`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error("Failed to fetch departments");
        return response.json();
    },

    createDepartment: async (data) => {
        const response = await fetch(`${BASE_URL}/departments`, {
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
        const response = await fetch(`${BASE_URL}/departments/${id}`, {
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
        const response = await fetch(`${BASE_URL}/departments/${id}/toggle-status`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if (!response.ok) throw new Error("Failed to toggle status");
        return response.json();
    },

    getCompanies: async () => {
        const response = await fetch(`${BASE_URL}/companies`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error("Failed to fetch companies");
        return response.json();
    }
};
