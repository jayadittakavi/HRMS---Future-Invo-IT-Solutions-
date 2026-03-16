const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Provided Tokens for Development/Testing
    const tokens = {
        superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMyMDk1Mzl9.oUwenpQMpiEZjblb_4f4yN4Olnl9d4918X1TjY-fVU4",
        admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk1Nzh9.3KPXmEizQSI1qxuRVivDYCy2daOC4GBTBzLM17bdHco",
        hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiSFIiLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk3Mzd9.rDhv3BMq4UtQXZe-K5YRcchCRo-aMvnK2e_SHREpyxI"
    };

    // Priority token from local storage, then fallback to Super Admin
    const finalToken = token || tokens.superadmin;

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
