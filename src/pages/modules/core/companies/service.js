import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('superadmin'), // Company functions typically require SuperAdmin permissions
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
                response = await fetch(`${API_BASE}/superadmin/companies`, {
                    method: "GET",
                    ...authHeader()
                });
            }

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
            console.error(`API Error (getCompanyById ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Create New Company
    createCompany: async (data) => {
        try {
            // Map fields to match the exact backend list provided by the user
            const payload = {
                ...data,
                company_name: data.name || data.company_name,
                company_code: data.company_id || data.company_code,
                company_uid: data.company_id || data.company_uid,
                subdomain: (data.name || data.company_id || 'company').toLowerCase().replace(/[^a-z0-9]/g, '-'),
                db_name: `company_${(data.company_id || 'new').toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                company_prefix: data.company_prefix || (data.company_id?.substring(0, 3)?.toUpperCase() || "CMP"),
                attendance_enabled: data.attendance_enabled ?? true,
                leave_enabled: data.leave_enabled ?? true,
                payroll_enabled: data.payroll_enabled ?? true,
                super_admin_id: data.super_admin_id || 1, // Default or passed from caller
                address: data.address || `${data.city_branch || ''}, ${data.state || ''}`.trim() || '—',
                phone: data.phone || '—',
                website: data.website || '—',
                latitude: data.latitude || "0",
                longitude: data.longitude || "0",
                timezone: data.timezone || "Asia/Kolkata"
            };

            const response = await fetch(`${API_BASE}/superadmin/companies`, {
                method: "POST",
                headers: authHeader().headers,
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            let errorMessage = `Status ${response.status}`;

            try {
                const json = JSON.parse(text);
                errorMessage = json.message || json.error || json.msg || errorMessage;
            } catch (e) {
                errorMessage = text || errorMessage;
            }

            if (!response.ok) {
                console.error("Company Creation Failed:", { status: response.status, text });
                throw new Error(errorMessage);
            }
            
            try {
                return JSON.parse(text);
            } catch(e) {
                return { success: true, message: text };
            }
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
    },

    // 🔹 Toggle Company Status (Activate/Deactivate)
    toggleStatus: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/companies/${id}/toggle-status`, {
                method: "PUT",
                headers: authHeader().headers,
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
            console.error(`API Error (toggleStatus ${id}):`, error);
            throw error;
        }
    }
};
