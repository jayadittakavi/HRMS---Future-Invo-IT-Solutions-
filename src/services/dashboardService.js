import { API_BASE, getAuthHeader } from '../config';

export const dashboardService = {
    getManagerStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/dashboard/stats`, {
                headers: getAuthHeader('manager')
            });
            if (!response.ok) throw new Error("Failed to fetch dashboard stats");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("Dashboard Stats Error:", error);
            throw error;
        }
    }
};
