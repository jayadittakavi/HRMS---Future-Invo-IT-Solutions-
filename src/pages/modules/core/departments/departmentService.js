import { API_BASE, getAuthHeader } from '../../../../config';

const getHeader = (role = 'superadmin') => ({
    ...getAuthHeader(role),
    'Content-Type': 'application/json'
});

export const departmentService = {
    getDepartments: async (role = 'superadmin') => {
        const url = role === 'manager' 
            ? `${API_BASE}/department_management/list` 
            : `${API_BASE}/superadmin/departments`;
            
        const response = await fetch(url, {
            headers: getHeader(role)
        });
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        return data?.data || data;
    },

    createDepartment: async (data, role = 'superadmin') => {
        const url = role === 'manager' 
            ? `${API_BASE}/department_management/create` 
            : `${API_BASE}/superadmin/departments`;

        const response = await fetch(url, {
            method: "POST",
            headers: getHeader(role),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to create department");
        return response.json();
    },

    updateDepartment: async (id, data, role = 'superadmin') => {
        const url = role === 'manager' 
            ? `${API_BASE}/department_management/update/${id}` 
            : `${API_BASE}/superadmin/departments/${id}`;

        const response = await fetch(url, {
            method: role === 'manager' ? "PUT" : "PUT", // Both are PUT based on request and current code
            headers: getHeader(role),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to update department");
        return response.json();
    },

    toggleStatus: async (id, role = 'superadmin') => {
        const url = role === 'manager' 
            ? `${API_BASE}/department_management/deactivate/${id}` 
            : `${API_BASE}/superadmin/departments/${id}/toggle-status`;

        const response = await fetch(url, {
            method: role === 'manager' ? "POST" : "PUT",
            headers: getHeader(role)
        });
        if (!response.ok) throw new Error("Failed to toggle status");
        return response.json();
    },

    assignMember: async (data, role = 'manager') => {
        const response = await fetch(`${API_BASE}/department_management/assign-member`, {
            method: "POST",
            headers: getHeader(role),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Failed to assign member");
        return response.json();
    },

    getCompanies: async (role = 'superadmin') => {
        const response = await fetch(`${API_BASE}/superadmin/companies`, {
            headers: getHeader(role)
        });
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();
        return data?.data || data;
    }
};
