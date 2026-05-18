import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = (role = 'admin') => {
    return {
        headers: getAuthHeader(role),
    };
};

export const employeeSuperAdminService = {
    // 🔹 Dashboard Stats (TOTAL, ACTIVE, NEW)
    getDashboardStats: async (role = 'admin') => {
        try {
            const response = await fetch(`${API_BASE}/dashboard/stats`, {
                headers: getAuthHeader(role)
            });
            if (!response.ok) throw new Error("Failed to fetch dashboard stats");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("Dashboard Stats Error:", error);
            throw error;
        }
    },

    // 🔹 Dropdown Data for Filters (Roles, Depts, Companies)
    getDropdownData: async (role = 'admin') => {
        try {
            const response = await fetch(`${API_BASE}/admin/dropdown-data`, {
                headers: getAuthHeader(role)
            });
            if (!response.ok) throw new Error("Failed to fetch dropdown data");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("Dropdown Data Error:", error);
            throw error;
        }
    },

    // 🔹 List All Employees
    getAllEmployees: async (role = 'admin') => {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`${API_BASE}/team/members?t=${timestamp}`, {
                method: "GET",
                cache: 'no-store',
                ...authHeader(role)
            });

            // Merge with local mock data
            const localMocks = JSON.parse(localStorage.getItem('mockEmployees') || '[]');
            const pendingInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
            const mergedMocks = [...localMocks];
            
            pendingInvites.forEach(invite => {
                if (!mergedMocks.find(m => m.email === invite.email)) {
                    mergedMocks.push({
                        ...invite,
                        id: invite.id || Date.now(),
                        name: invite.name || invite.full_name,
                        department: invite.department || "General",
                        designation: invite.designation || "Employee",
                        status: "Active"
                    });
                }
            });

            if (!response.ok) {
                console.warn(`GET /api/team/members returned ${response.status} — returning local data`);
                return mergedMocks;
            }
            const data = await response.json();
            const apiEmployees = Array.isArray(data) ? data : (data.data || data.employees || data.members || []);
            
            // Merge API employees with local mocks, prioritizing API if emails match
            const allEmployees = [...apiEmployees];
            mergedMocks.forEach(mock => {
                if (!allEmployees.find(apiEmp => apiEmp.email === mock.email)) {
                    allEmployees.push(mock);
                }
            });
            return allEmployees;
        } catch (error) {
            console.warn("API Error (getAllEmployees) — returning local data:", error.message);
            const localMocks = JSON.parse(localStorage.getItem('mockEmployees') || '[]');
            const pendingInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
            const mergedMocks = [...localMocks];
            pendingInvites.forEach(invite => {
                if (!mergedMocks.find(m => m.email === invite.email)) {
                    mergedMocks.push({...invite, id: invite.id || Date.now()});
                }
            });
            return mergedMocks; // Fallback to local mock data
        }
    },

    // 🔹 Get Employee Details
    getEmployeeById: async (id, role = 'admin') => {
        try {
            const timestamp = new Date().getTime();
            let response = await fetch(`${API_BASE}/team/members/${id}?t=${timestamp}`, {
                method: "GET",
                cache: 'no-store',
                ...authHeader(role)
            });

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
            { url: `${API_BASE}/team/invite`, method: "POST" }
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
            { url: `${API_BASE}/team/members/${actualId}`, method: "PATCH" }
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
    toggleStatus: async (id, currentUserRole = 'admin') => {
        const url = `${API_BASE}/team/members/${id}/status`;

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: getAuthHeader(currentUserRole || 'admin'),
                body: JSON.stringify({}) // Some backends require a body for POST/PATCH even if empty
            });

            if (response.ok) {
                return await response.json();
            }

            const text = await response.text();
            throw new Error(`API returned ${response.status} for ${url}: ${text}`);
        } catch (error) {
            console.error(`Toggle Status Error (${url}):`, error);
            throw error;
        }
    }
};
