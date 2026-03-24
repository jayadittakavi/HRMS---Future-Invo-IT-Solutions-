// import axios from "axios";

// Keeping the existing IP as requested
const API_BASE = "/api";

// Helper to get auth header with token
const authHeader = () => {
    const tokens = {
        superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k",
        admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzQ0MzcwMTl9.CfHGgz68eictFU1-g0bMMDIxy7_1Ungc5FiGkdafOHk",
        hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiSFIiLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk3Mzd9.rDhv3BMq4UtQXZe-K5YRcchCRo-aMvnK2e_SHREpyxI"
    };
    const token = tokens.superadmin || localStorage.getItem("token") || localStorage.getItem("authToken");

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
