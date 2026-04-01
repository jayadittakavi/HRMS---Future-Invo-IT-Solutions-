import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('admin'), // Using admin role as primary for these specific endpoints
    };
};

export const employeeSuperAdminService = {
    // 🔹 List All Employees
    getAllEmployees: async () => {
        try {
            const timestamp = new Date().getTime();
            // Primary: /api/admin/employees
            let response = await fetch(`${API_BASE}/admin/employees?t=${timestamp}`, {
                method: "GET",
                cache: 'no-store',
                ...authHeader()
            });

            // Fallback to superadmin if admin path fails
            if (response.status === 404 || response.status === 405) {
                response = await fetch(`${API_BASE}/superadmin/employees?t=${timestamp}`, {
                    method: "GET",
                    cache: 'no-store',
                    ...authHeader()
                });
            }

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Error (getAllEmployees):", error);
            throw error;
        }
    },

    // 🔹 Get Employee Details
    getEmployeeById: async (id) => {
        try {
            const timestamp = new Date().getTime();
            let response = await fetch(`${API_BASE}/admin/employees/${id}?t=${timestamp}`, {
                method: "GET",
                cache: 'no-store',
                ...authHeader()
            });

            if (response.status === 404 || response.status === 405) {
                response = await fetch(`${API_BASE}/superadmin/employees/${id}?t=${timestamp}`, {
                    method: "GET",
                    cache: 'no-store',
                    ...authHeader()
                });
            }

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (getEmployeeById ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Create New Employee
    createEmployee: async (data) => {
        // Map to exact spec but PRESERVE all original data (like company_id, branch)
        const payload = {
            ...data,
            full_name: data.full_name || data.name,
            name: data.full_name || data.name,
            email: data.email || data.company_email || data.personal_email,
            password: data.password || "TemporaryPassword123",
            personal_email: data.personal_email || data.email,
            department: data.department || "General",
            designation: data.designation || "Employee",
            date_of_joining: data.joining_date || data.date_of_joining || new Date().toISOString().split('T')[0],
            gender: data.gender || "Other",
            phone_number: data.phone_number || data.phone || "",
            ctc: data.ctc ? Number(data.ctc) : 0,
            employment_type: data.employment_type || "Full-time",
            role: (data.role || "EMPLOYEE").toUpperCase()
        };

        const endpoints = [
            { url: `${API_BASE}/admin/create-employee`, method: "POST" },
            { url: `${API_BASE}/superadmin/employees`, method: "POST" },
            { url: `${API_BASE}/superadmin/users`, method: "POST" }
        ];

        let lastErr = null;
        for (const e of endpoints) {
            try {
                const response = await fetch(e.url, {
                    method: e.method,
                    headers: authHeader().headers,
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const text = await response.text();
                    try { return JSON.parse(text); } catch(err) { return { success: true }; }
                }
                const errText = await response.text();
                lastErr = new Error(`Endpoint ${e.url} failed (${response.status}): ${errText}`);
            } catch (err) {
                lastErr = err;
            }
        }
        throw lastErr || new Error("Failed to create employee after trying multiple endpoints.");
    },

    // 🔹 Update Employee Profile
    updateEmployee: async (id, data) => {
        const actualId = id || data.id || data.user_id;
        
        // Map to exact spec for Update PRESERVING original context
        const payload = {
            ...data,
            full_name: data.full_name || data.name,
            name: data.full_name || data.name,
            email: data.email || data.company_email || data.personal_email,
            personal_email: data.personal_email || data.email,
            department: data.department,
            designation: data.designation,
            date_of_joining: data.joining_date || data.date_of_joining,
            gender: data.gender,
            phone_number: data.phone_number || data.phone,
            ctc: data.ctc ? Number(data.ctc) : undefined,
            employment_type: data.employment_type,
            role: data.role ? data.role.toUpperCase() : undefined,
            status: data.status
        };

        // Remove undefined fields to prevent overwriting with nulls if not sent
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        const variations = [
            { url: `${API_BASE}/admin/employees/${actualId}`, method: "PUT" },
            { url: `${API_BASE}/superadmin/employees/${actualId}`, method: "PATCH" },
            { url: `${API_BASE}/superadmin/employees/${actualId}`, method: "PUT" }
        ];

        let lastError = null;
        for (const v of variations) {
            try {
                const response = await fetch(v.url, {
                    method: v.method,
                    headers: authHeader().headers,
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const text = await response.text();
                    try { return JSON.parse(text); } catch(e) { return { success: true }; }
                }
                lastError = new Error(`Update effort failed: ${v.method} ${v.url} (${response.status})`);
            } catch (err) {
                lastError = err;
            }
        }
        throw lastError || new Error("Failed to update employee profile.");
    },

    // 🔹 Delete Employee (Permanent)
    deleteEmployee: async (id) => {
        try {
            // Primary: /api/admin/employees/<id>
            let response = await fetch(`${API_BASE}/admin/employees/${id}`, {
                method: "DELETE",
                ...authHeader()
            });

            if (response.status === 404 || response.status === 405) {
                response = await fetch(`${API_BASE}/superadmin/employees/${id}`, {
                    method: "DELETE",
                    ...authHeader()
                });
            }

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `Deletion failed with status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteEmployee ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Toggle Employee Status (Activate/Deactivate)
    toggleStatus: async (id, currentUserRole = null) => {
        // Strict adherence to the requested URLs for toggle actions
        // URL format: POST /api/{role}/employees/{id}/toggle
        const roleStr = (currentUserRole || '').toLowerCase();
        let pathRole = 'admin';
        if (roleStr.includes('superadmin') || roleStr.includes('super_admin')) {
            pathRole = 'superadmin';
        }
        
        const url = `${API_BASE}/${pathRole}/employees/${id}/toggle`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: getAuthHeader(currentUserRole || 'admin'),
                body: JSON.stringify({}) // Some backends require a body for POST even if empty
            });

            if (response.ok) {
                return await response.json();
            }

            // Fallback to legacy path only if specific one fails with 404 (optional)
            if (response.status === 404 || response.status === 405) {
                console.warn(`Primary URL ${url} failed with ${response.status}, trying legacy fallback...`);
                // Fallback for safety using the same method for now
                const legacyUrl = `${url}-status`;
                const fallbackResponse = await fetch(legacyUrl, {
                    method: "PUT",
                    headers: getAuthHeader(currentUserRole || 'admin')
                });
                if (fallbackResponse.ok) return await fallbackResponse.json();
            }

            const text = await response.text();
            throw new Error(`API returned ${response.status} for ${url}: ${text}`);
        } catch (error) {
            console.error(`Toggle Status Error (${url}):`, error);
            throw error;
        }
    }
};
