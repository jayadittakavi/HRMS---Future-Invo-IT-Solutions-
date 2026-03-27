import { API_BASE, getAuthHeader } from '../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('admin'), // Set fallback role as admin
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
