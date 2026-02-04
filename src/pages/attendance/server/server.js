// Keeping the existing IP as requested
// Keeping the existing IP as requested
const API_BASE = "http://192.168.1.13:5000/api";

// Helper to get auth header with token
// Safely retrieves token or returns empty string to prevent "Bearer null"
const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImRpdHRha2F2aWpheWFAZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiZXhwIjoxNzcwMzE5MTgyfQ.smaIXqFmjyZC__wFrmsMUi37mFgzb1uhZ_6znb7FL9U}` } : {}),
        },
    };
};





export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch("http://192.168.1.13:5000/api/attendance/me", {
            method: "GET", // Fixed: Changed from POST to GET
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Admin / HR – view all attendance
    getAllAttendance: async () => {
        const response = await fetch("http://192.168.1.13:5000/api/attendance", {
            method: "GET", // Fixed: Changed from POST to GET
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Manual attendance (SuperAdmin, Admin, HR, Manager)
    addManualAttendance: async (data) => {
        const response = await fetch("http://192.168.1.13:5000/api/attendance/manual", {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update attendance
    updateAttendance: async (id, data) => {
        const response = await fetch("http://192.168.1.13:5000/api/attendance/2", {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete attendance
    deleteAttendance: async (id) => {
        const response = await fetch("http://192.168.1.13:5000/api/attendance/2", {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
};
