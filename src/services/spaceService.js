import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'),
    };
};

export const spaceService = {
    // 1. Get Space Dashboard Summary
    getSummary: async () => {
        try {
            const response = await fetch(`${API_BASE}/space-dashboard/summary`, authHeader());
            if (!response.ok) return {
                attendanceStats: { monthlyPercentage: 0, present: 0, absent: 0, late: 0, holiday: 0 },
                leaveBalances: [],
                recentActivity: [],
                upcomingHolidays: [],
                trends: { attendance: { labels: [], data: [] }, leaves: { labels: [], data: [] } }
            };
            return await response.json();
        } catch (error) {
            console.error("API Error (getSummary):", error);
            return {
                attendanceStats: { monthlyPercentage: 0, present: 0, absent: 0, late: 0, holiday: 0 },
                leaveBalances: [],
                recentActivity: [],
                upcomingHolidays: [],
                trends: { attendance: { labels: [], data: [] }, leaves: { labels: [], data: [] } }
            };
        }
    }
};
