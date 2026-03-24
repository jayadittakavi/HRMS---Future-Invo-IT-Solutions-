const API_BASE = "/api";

// Helper to get auth header with token
const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Provided Tokens for Development/Testing
    const tokens = {
        superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k",
        admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzQ0MzcwMTl9.CfHGgz68eictFU1-g0bMMDIxy7_1Ungc5FiGkdafOHk",
        hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiSFIiLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk3Mzd9.rDhv3BMq4UtQXZe-K5YRcchCRo-aMvnK2e_SHREpyxI"
    };

    const finalToken = tokens.superadmin || token;

    return {
        headers: {
            "Content-Type": "application/json",
            ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
        },
    };
};

export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch(`${API_BASE}/attendance/me`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Admin / HR – view all attendance
    getAllAttendance: async (query = '') => {
        const url = query ? `${API_BASE}/attendance?${query}` : `${API_BASE}/attendance`;
        const response = await fetch(url, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Manual attendance (SuperAdmin, Admin, HR, Manager)
    addManualAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/manual`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update attendance
    updateAttendance: async (id, data) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete attendance
    deleteAttendance: async (id) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Import Attendance CSV
    importAttendance: async (formData) => {
        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(`${API_BASE}/attendance/import`, { // Assuming /import endpoint or POST /attendance handles file
            method: "POST",
            headers: headers,
            body: formData
        });

        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    getAllEmployees: async () => {
        const response = await fetch(`${API_BASE}/employees`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Manual Attendance
    addBulkAttendance: async (attendanceList) => {
        const promises = attendanceList.map(data =>
            fetch(`${API_BASE}/attendance/manual`, {
                method: "POST",
                body: JSON.stringify(data),
                ...authHeader()
            }).then(res => {
                if (!res.ok) throw new Error(`Failed for ${data.employee_id}`);
                return res.json();
            })
        );
        return Promise.all(promises);
    },

    // 🔹 Get Employee Details for Attendance
    getEmployeeDetails: async (employeeId) => {
        const response = await fetch(`${API_BASE}/attendance/employee-details/${employeeId}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Submit Single Attendance Record
    submitAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Attendance List
    getBulkAttendanceList: async (date) => {
        const response = await fetch(`${API_BASE}/attendance/bulk-list?date=${date}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Save Attendance
    saveBulkAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/bulk-save`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Attendance Dashboard Stats
    getDashboardStats: async () => {
        const response = await fetch(`${API_BASE}/attendance/dashboard-stats`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Shift Details/List
    getShifts: async () => {
        const response = await fetch(`${API_BASE}/attendance/shifts`, { // New endpoint for shifts
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) {
            // If shifts endpoint doesn't exist yet, return a graceful blank array or mock fallback
            console.warn("Shifts endpoint returned error, check backend. Status:", response.status);
            return [];
        }
        return response.json();
    }
};
