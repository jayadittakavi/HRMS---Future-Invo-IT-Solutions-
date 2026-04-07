import { API_BASE, getAuthHeader } from '../../config';

export const dashboardsService = {
    getEmployeeDashboard: async () => {
        try {
            const response = await fetch(`${API_BASE}/dashboard/employee`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to fetch employee dashboard data");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getEmployeeDashboard):", error);
            throw error;
        }
    }
};
