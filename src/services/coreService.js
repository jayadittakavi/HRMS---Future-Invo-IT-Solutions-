import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    const auth = getAuthHeader();
    if (!auth.Authorization) return null;
    return { headers: auth };
};

export const coreService = {
    // 🔹 Companies
    getCompanies: async () => {
        try {
            const header = authHeader();
            if (!header) return []; // Skip API call if unauthorized

            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "GET",
                ...header
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || data.companies || []);
        } catch (error) {
            console.error("API Error (getCompanies):", error);
            throw error;
        }
    },

    // 🔹 Dashboard Stats
    getDashboardStats: async () => {
        try {
            const header = authHeader();
            if (!header) return null;

            const response = await fetch(`${API_BASE}/dashboard/stats`, {
                method: "GET",
                ...header
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getDashboardStats):", error);
            throw error;
        }
    },

    getSuperAdminDashboardStats: async () => {
        const EMPTY = { companies: 0, branches: 0, admins: 0, hrs: 0, managers: 0, employees: 0 };
        try {
            const header = authHeader();
            if (!header) return EMPTY; // Not logged in — return safe defaults

            const response = await fetch(`${API_BASE}/superadmin/dashboard-stats`, {
                method: "GET",
                ...header
            });
            if (!response.ok) return EMPTY;
            return await response.json();
        } catch (error) {
            console.error("API Error (getSuperAdminDashboardStats):", error);
            return EMPTY; // Never crash the UI
        }
    },

    getCompanyStats: async () => {
        try {
            const header = authHeader();
            if (!header) return null;

            const response = await fetch(`${API_BASE}/superadmin/companies/stats`, {
                method: "GET",
                ...header
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getCompanyStats):", error);
            throw error;
        }
    },

    createCompany: async (companyData) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "POST",
                headers: authHeader().headers,
                body: JSON.stringify(companyData),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createCompany):", error);
            throw error;
        }
    },

    // 🔹 Branches
    getBranches: async () => {
        try {
            const header = authHeader();
            if (!header) return [];

            const response = await fetch(`${API_BASE}/superadmin/branches`, {
                method: "GET",
                ...header
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || data.branches || []);
        } catch (error) {
            console.error("API Error (getBranches):", error);
            throw error;
        }
    },

    getBranchStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches/stats`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getBranchStats):", error);
            throw error;
        }
    },

    getBranchMap: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches/map`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getBranchMap):", error);
            throw error;
        }
    },

    createBranch: async (branchData) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches`, {
                method: "POST",
                headers: authHeader().headers,
                body: JSON.stringify(branchData),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createBranch):", error);
            throw error;
        }
    },

    updateBranch: async (id, branchData) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches/${id}`, {
                method: "PUT",
                headers: authHeader().headers,
                body: JSON.stringify(branchData),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateBranch ${id}):`, error);
            throw error;
        }
    },

    deleteBranch: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteBranch ${id}):`, error);
            throw error;
        }
    },

    toggleBranchStatus: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/branches/${id}/toggle-status`, {
                method: "PUT",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (toggleBranchStatus ${id}):`, error);
            throw error;
        }
    },

    updateCompany: async (id, companyData) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
                method: "PUT",
                headers: authHeader().headers,
                body: JSON.stringify(companyData),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateCompany ${id}):`, error);
            throw error;
        }
    },

    deleteCompany: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteCompany ${id}):`, error);
            throw error;
        }
    },

    toggleCompanyStatus: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}/toggle-status`, {
                method: "PUT",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (toggleCompanyStatus ${id}):`, error);
            throw error;
        }
    }
};
