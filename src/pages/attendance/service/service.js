const API_BASE = "http://192.168.1.13:5000/api";

// Helper to get auth header with token
const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
};

export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch("http://192.168.1.5:5000/api/attendance/me", {
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

        const response = await fetch("http://192.168.1.5:5000/api/attendance", {
            method: "POST",
            headers: headers, // Let browser set Content-Type for FormData
            body: formData
        });

        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Get All Employees (for dropdowns)
    getAllEmployees: async () => {
        // Try /employees first, if fails might be /users
        const response = await fetch(`http://192.168.1.5:5000/api/attendance/me`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) {
            // Fallback to /users if /employees not found
            if (response.status === 404) {
                const userResponse = await fetch(`${API_BASE}/users`, {
                    method: "GET",
                    ...authHeader()
                });
                if (!userResponse.ok) throw new Error(await userResponse.text());
                return userResponse.json();
            }
            throw new Error(await response.text());
        }
        return response.json();
    }
};
