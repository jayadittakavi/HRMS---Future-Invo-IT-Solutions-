const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Standard hardcoded token for development fallback
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k";

    const finalToken = token || testToken;

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${finalToken}`
        },
    };
};

export const coreService = {
    // 🔹 Companies
    getCompanies: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || data.companies || []);
        } catch (error) {
            console.error("API Error (getCompanies):", error);
            throw error;
        }
    },

    getCompanyStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/stats`, {
                method: "GET",
                ...authHeader()
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
            const response = await fetch(`${API_BASE}/superadmin/branches`, {
                method: "GET",
                ...authHeader()
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
    }
};
