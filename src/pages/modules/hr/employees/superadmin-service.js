const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Provided Tokens for Development/Testing
    const superAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMxMjUwMTh9.cgHOIdlSesiz9EOb5iYeRtfEgdSd5hqyp5JrlzYOa0Q";
    const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMxMjQwMTJ9.EdxLjEaC9Pmli7HkkmmYlny4JawGAZd1kctaw0WgCpM";

    // Defaults to existing token, then Admin Token, then Super Admin Token as fallbacks
    const finalToken = token || adminToken || superAdminToken;

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${finalToken}`
        },
    };
};

export const employeeSuperAdminService = {
    // 🔹 List All Employees (across all companies)
    getAllEmployees: async () => {
        try {
            const response = await fetch(`${API_BASE}/admin/employees`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getAllEmployees):", error);
            throw error;
        }
    },

    // 🔹 Get Employee Details
    getEmployeeById: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/admin/employees/${id}`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (getEmployeeById ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Add New Employee (to any company)
    createEmployee: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/admin/create-employee`, {
                method: "POST",
                headers: authHeader().headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createEmployee):", error);
            throw error;
        }
    },

    // 🔹 Update Employee Details
    updateEmployee: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE}/admin/employees/${id}`, {
                method: "PUT",
                headers: authHeader().headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateEmployee ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Delete Employee
    deleteEmployee: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/employees/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteEmployee ${id}):`, error);
            throw error;
        }
    }
};
