const API_BASE = "http://192.168.1.5:5000/api";

// Helper to get auth header with token
const authHeader = () => {
    // Get token from localStorage
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");

    return {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
};

export const companyService = {
    // 🔹 Get All Companies
    getAllCompanies: async () => {
        const response = await fetch(`${API_BASE}/superadmin/companies`, {
            method: "GET",
            ...authHeader()
        });
        // Handle non-ok responses but try to return empty array if 404
        if (!response.ok) {
            if (response.status === 404) return [];
            throw new Error(await response.text());
        }
        return response.json();
    },

    // 🔹 Create New Company
    createCompany: async (data) => {
        const response = await fetch(`${API_BASE}/superadmin/create-company`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update Company
    updateCompany: async (id, data) => {
        const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete Company
    deleteCompany: async (id) => {
        const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
};
