import { API_BASE, getAuthHeader } from '../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'),
    };
};

export const teamService = {
    // 1. Team Dashboard Stats
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/team/dashboard`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch team dashboard stats");
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            throw error;
        }
    },

    // 2. Team Superstars
    getSuperstars: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/team/superstars`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch team superstars");
            return await response.json();
        } catch (error) {
            console.error("API Error (getSuperstars):", error);
            throw error;
        }
    },

    // 3. Team Resilience
    getResilience: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/team/resilience`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch team resilience data");
            return await response.json();
        } catch (error) {
            console.error("API Error (getResilience):", error);
            throw error;
        }
    },

    // 4. Build New Squad - Form Options
    getSquadFormOptions: async () => {
        try {
            const response = await fetch(`${API_BASE}/team/squads/form-options`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch squad form options");
            return await response.json();
        } catch (error) {
            console.error("API Error (getSquadFormOptions):", error);
            throw error;
        }
    },

    // 5. Build New Squad - Search Employees
    searchEmployees: async (search = '') => {
        try {
            const response = await fetch(`${API_BASE}/team/squads/employees?search=${search}`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to search employees");
            return await response.json();
        } catch (error) {
            console.error("API Error (searchEmployees):", error);
            throw error;
        }
    },

    // 6. Manage Squads (Listing)
    getSquads: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/squads`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch squads");
            return await response.json();
        } catch (error) {
            console.error("API Error (getSquads):", error);
            throw error;
        }
    },

    // 7. Build New Squad (Create)
    createSquad: async (squadData) => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/squads`, {
                method: "POST",
                ...authHeader(),
                body: JSON.stringify(squadData)
            });
            if (!response.ok) throw new Error("Failed to create squad");
            return await response.json();
        } catch (error) {
            console.error("API Error (createSquad):", error);
            throw error;
        }
    }
};
