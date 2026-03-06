// import axios from "axios";

// Keeping the existing IP as requested
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

// Helper to get auth header with token
const authHeader = () => {
    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzI3ODU3NzB9.v_BgdU5Xi4p6imxFD75VeEj33b5sx4curQSxbFGXknA";
    const token = hardcodedToken || localStorage.getItem("token") || localStorage.getItem("authToken");

    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
};

export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch(`${API_BASE}/attendance/me`, {
            method: "POST",
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Admin / HR – view all attendance
    getAllAttendance: async () => {
        const response = await fetch(`${API_BASE}/attendance`, {
            method: "POST",
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Manual attendance (SuperAdmin, Admin, HR, Manager)
    addManualAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/manual`, {
            method: "GET",
            body: JSON.stringify(data),
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Update attendance
    updateAttendance: async (id, data) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Delete attendance
    deleteAttendance: async (id) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        return response.json();
    }
};
