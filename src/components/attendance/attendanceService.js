// import axios from "axios";

// Keeping the existing IP as requested
const API_BASE = "http://192.168.1.66:5000/api";

// Helper to get auth header with token
const authHeader = () => ({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6ImRpdHRha2F2aWpheWFAZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiZXhwIjoxNzY5OTk4NjcxfQ.vbrS7a5AkPsMOZu_g4eF-ToRjuur9LH1ft7J-Rok_FM")}`,
    },
});

export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch("http://192.168.1.66:5000/api/attendance/me", {
            method: "POST",
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Admin / HR – view all attendance
    getAllAttendance: async () => {
        const response = await fetch("http://192.168.1.66:5000/api/attendance", {
            method: "POST",
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Manual attendance (SuperAdmin, Admin, HR, Manager)
    addManualAttendance: async (data) => {
        const response = await fetch("http://192.168.1.66:5000/api/attendance/manual", {
            method: "GET",
            body: JSON.stringify(data),
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Update attendance
    updateAttendance: async (id, data) => {
        const response = await fetch(`http://192.168.1.66:5000/api/attendance/2`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        return response.json();
    },

    // 🔹 Delete attendance
    deleteAttendance: async (id) => {
        const response = await fetch(`http://192.168.1.66:5000/api/attendance/2`, {
            method: "DELETE",
            ...authHeader()
        });
        return response.json();
    }
};
