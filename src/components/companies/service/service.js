const API_BASE = "/api";

// Helper to get auth header with token
const authHeader = () => {
    // Provided Tokens for Development/Testing
    const tokens = {
        superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMyMDk1Mzl9.oUwenpQMpiEZjblb_4f4yN4Olnl9d4918X1TjY-fVU4",
        admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk1Nzh9.3KPXmEizQSI1qxuRVivDYCy2daOC4GBTBzLM17bdHco",
        hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiSFIiLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk3Mzd9.rDhv3BMq4UtQXZe-K5YRcchCRo-aMvnK2e_SHREpyxI"
    };

    // Priority token from local storage, then fallback to Super Admin
    const token = localStorage.getItem("authToken") || localStorage.getItem("token") || tokens.superadmin;

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
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "GET",
                ...authHeader()
            });
            // Handle non-ok responses but try to return empty array if 404
            if (!response.ok) {
                if (response.status === 404) return [];
                throw new Error(await response.text());
            }
            return await response.json();
        } catch (error) {
            console.error("API Error (getAllCompanies):", error);
            throw error;
        }
    },

    // 🔹 Create New Company
    createCompany: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/create-company`, {
                method: "POST",
                body: JSON.stringify(data),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createCompany):", error);
            throw error;
        }
    },

    // 🔹 Update Company
    updateCompany: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateCompany ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Delete Company
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
