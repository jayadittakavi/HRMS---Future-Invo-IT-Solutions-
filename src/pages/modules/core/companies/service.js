const API_BASE = "/api";

// Helper to get auth header with token dynamically
const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Fallback token for development (Valid until March 7, 2026)
    const fallbackToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMxNDc1MTl9.7J_oXF-kVaocvXyM40KQuqZMiAGxvntF-n8OzRdaAHs";
    const finalToken = token || fallbackToken;

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${finalToken}`
        },
    };
};

export const companyService = {
    // 🔹 Get All Companies
    getAllCompanies: async () => {
        try {
            // Try standard list endpoint first
            let response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "GET",
                ...authHeader()
            });

            // If not found or error, try the creation endpoint as fallback (some backends share)
            if (!response.ok) {
                console.warn(`Endpoint ${API_BASE}/superadmin/companies returned ${response.status}, trying fallback...`);
                response = await fetch(`${API_BASE}/superadmin/create-company`, {
                    method: "GET",
                    ...authHeader()
                });
            }

            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getAllCompanies):", error);
            throw error;
        }
    },

    // 🔹 Get Single Company
    getCompanyById: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (getCompanyById ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Create New Company
    createCompany: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/create-company`, {
                method: "POST",
                headers: authHeader().headers,
                body: JSON.stringify(data),
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
                headers: authHeader().headers,
                body: JSON.stringify(data),
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
