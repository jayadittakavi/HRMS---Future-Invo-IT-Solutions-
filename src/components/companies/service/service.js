import { API_BASE, getAuthHeader } from '../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('superadmin'), // Company functions typically require SuperAdmin permissions
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
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    throw new Error(json.message || "Request failed");
                } catch(e) {
                    throw new Error(text || "Request failed");
                }
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
            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "POST",
                body: JSON.stringify(data),
                ...authHeader()
            });
            if (!response.ok) {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    throw new Error(json.message || "Request failed");
                } catch(e) {
                    throw new Error(text || "Request failed");
                }
            }
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
            if (!response.ok) {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    throw new Error(json.message || "Request failed");
                } catch(e) {
                    throw new Error(text || "Request failed");
                }
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateCompany ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Delete Company
    deleteCompany: async (id, currentData = {}) => {
        try {
            // Provide dummy text to satisfy backend's overly strict body validation on DELETE requests
            const dummyBody = {
                company_name: currentData.company_name || currentData.name || "delete-dummy",
                company_ld: currentData.company_ld || "FS001",
                industry: currentData.industry || "IT",
                company_prefix: currentData.company_prefix || "DEL",
                company_size: currentData.company_size || "1-10",
                country: currentData.country || "IN",
                state: currentData.state || "MH",
                city_branch: currentData.city_branch || "Main"
            };

            const response = await fetch(`${API_BASE}/superadmin/companies/${id}`, {
                method: "DELETE",
                headers: authHeader().headers,
                body: JSON.stringify(dummyBody)
            });
            if (!response.ok) {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    throw new Error(json.message || "Request failed");
                } catch(e) {
                    throw new Error(text || "Request failed");
                }
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteCompany ${id}):`, error);
            throw error;
        }
    }
};
