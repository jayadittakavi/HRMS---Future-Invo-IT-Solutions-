const API_BASE = "http://127.0.0.1:5000/api";

// Hardcoded token as requested
const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzA4NDI5ODN9.GxdFCd6FroibSvs9zAao7FOfdW3owKRB-USQBBN8f8c";

// Helper to get auth header with token
const authHeader = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${VALID_TOKEN}`
        },
    };
};

export const companyService = {
    // 🔹 Get All Companies
    getAllCompanies: async () => {
        const response = await fetch("http://127.0.0.1:5000/api/superadmin/companies", {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Get Single Company
    getCompanyById: async (id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/superadmin/companies/${id}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Create New Company
    createCompany: async (data) => {
        const response = await fetch("http://127.0.0.1:5000/api/superadmin/create-company", {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update Company
    updateCompany: async (id, data) => {
        const response = await fetch(`http://127.0.0.1:5000/api/superadmin/companies/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete Company
    deleteCompany: async (id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/superadmin/companies/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
};
