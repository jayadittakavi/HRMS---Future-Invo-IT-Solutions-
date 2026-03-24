const BASE_URL = "/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const payrollService = {
    // 🔹 Salary Structure Assignments
    getSalaryAssignments: async () => {
        try {
            const response = await fetch(`${BASE_URL}/superadmin/salary-assignments`, {
                method: "GET",
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error("Error fetching salary assignments:", error);
            throw error;
        }
    },

    createSalaryAssignment: async (data) => {
        try {
            console.log("POSTing Salary Assignment to:", `${BASE_URL}/superadmin/salary-assignments`);
            const response = await fetch(`${BASE_URL}/superadmin/salary-assignments`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend Error Details:", errorText);
                throw new Error(errorText);
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating salary assignment:", error);
            throw error;
        }
    },

    // 🔹 Payroll Dashboard Data
    getDashboardStats: async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/payroll/dashboard`, {
                method: "GET",
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("Error fetching payroll dashboard stats:", error);
            throw error;
        }
    }
};
