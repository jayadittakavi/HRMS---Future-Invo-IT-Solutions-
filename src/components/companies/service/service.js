const API_BASE = "/api";

// Helper to get auth header with token
const authHeader = () => {
    // Priority token provided by user for testing/dev
    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMxNDc1MTl9.7J_oXF-kVaocvXyM40KQuqZMiAGxvntF-n8OzRdaAHs";

    // Fallback to local storage
    const token = hardcodedToken || localStorage.getItem("authToken") || localStorage.getItem("token");

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
        const response = await fetch(`http://192.168.1.6:5000/superadmin/companies`, {
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
        const response = await fetch(`http://192.168.1.6:5000/superadmin/create-company`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update Company
    updateCompany: async (id, data) => {
        const response = await fetch(`http://192.168.1.6:5000/superadmin/companies`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete Company
    deleteCompany: async (id) => {
        const response = await fetch(`http://192.168.1.6:5000/superadmin/companies`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
};
