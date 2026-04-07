import { API_BASE, getAuthHeader } from '../config';

export const attendanceService = {
    // 🔹 Get Personal Attendance Log
    getMyAttendance: async () => {
        try {
            const response = await fetch(`${API_BASE}/attendance/me`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to fetch my attendance");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getMyAttendance):", error);
            throw error;
        }
    }
};
