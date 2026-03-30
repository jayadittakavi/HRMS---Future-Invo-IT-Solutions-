import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // These APIs are strictly for HR/Admin roles
    };
};

export const accessControlService = {
    // 1. User Management
    getUsers: async () => {
        try {
            const response = await fetch(`${API_BASE}/admin/access-control/users`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getUsers):", error);
            return [];
        }
    },

    saveUser: async (data) => {
        try {
            const method = data.id ? "PUT" : "POST";
            const url = data.id 
                ? `${API_BASE}/admin/access-control/users/${data.id}`
                : `${API_BASE}/admin/access-control/users`;
            
            const response = await fetch(url, {
                method,
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (saveUser):", error);
            throw error;
        }
    },

    toggleUserStatus: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/admin/access-control/users/${id}/status`, {
                method: "PATCH",
                ...authHeader()
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (toggleUserStatus):", error);
            return false;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/admin/access-control/users/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (deleteUser):", error);
            return false;
        }
    },

    // 2. Roles & Permissions
    getRoles: async () => {
        try {
            const response = await fetch(`${API_BASE}/admin/access-control/roles`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getRoles):", error);
            return [];
        }
    },

    saveRole: async (data) => {
        try {
            const method = data.id ? "PUT" : "POST";
            const url = data.id 
                ? `${API_BASE}/admin/access-control/roles/${data.id}`
                : `${API_BASE}/admin/access-control/roles`;

            const response = await fetch(url, {
                method,
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (saveRole):", error);
            throw error;
        }
    },

    deleteRole: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/admin/access-control/roles/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (deleteRole):", error);
            return false;
        }
    }
};
