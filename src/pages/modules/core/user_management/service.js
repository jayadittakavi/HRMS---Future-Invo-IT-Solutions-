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
            if (!response.ok) throw new Error("Fallback to local");
            return await response.json();
        } catch (error) {
            console.warn("API Error (getUsers), using local storage:", error.message);
            const localMocks = JSON.parse(localStorage.getItem('mockEmployees') || '[]');
            const pendingInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
            const mergedMocks = [...localMocks];
            pendingInvites.forEach(invite => {
                if (!mergedMocks.find(m => m.email === invite.email)) {
                    mergedMocks.push({...invite, id: invite.id || Date.now()});
                }
            });
            return mergedMocks;
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
            if (!response.ok) throw new Error("Fallback to local");
            return await response.json();
        } catch (error) {
            console.warn("API Error (getRoles), using local storage:", error.message);
            const defaultRoles = [
                { id: 'superadmin', name: 'Super Admin', usersCount: 1, modulesCount: 12 },
                { id: 'admin', name: 'Admin', usersCount: 2, modulesCount: 10 },
                { id: 'hr', name: 'HR', usersCount: 3, modulesCount: 8 }
            ];
            return JSON.parse(localStorage.getItem('mockRoles')) || defaultRoles;
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
