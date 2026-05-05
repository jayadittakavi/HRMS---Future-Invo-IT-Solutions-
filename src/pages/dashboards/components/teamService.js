import { API_BASE, getAuthHeader } from '../../../config';

const authHeader = (role = 'hr') => {
    return {
        headers: getAuthHeader(role),
    };
};

export const teamService = {
    // 1. Team Dashboard Stats
    getStats: async (role = 'admin') => {
        try {
            const url = `${API_BASE}/team/dashboard`;
                
            const response = await fetch(url, {
                method: "GET",
                ...authHeader(role)
            });
            if (!response.ok) throw new Error("Failed to fetch team dashboard stats");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            throw error;
        }
    },

    // 2. Team Superstars
    getSuperstars: async (role = 'admin') => {
        try {
            const url = `${API_BASE}/team/superstars`;

            const response = await fetch(url, {
                method: "GET",
                ...authHeader(role)
            });
            if (!response.ok) throw new Error("Failed to fetch team superstars");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getSuperstars):", error);
            throw error;
        }
    },

    // 3. Team Resilience
    getResilience: async (role = 'admin') => {
        try {
            const url = `${API_BASE}/team/resilience`;

            const response = await fetch(url, {
                method: "GET",
                ...authHeader(role)
            });
            if (!response.ok) throw new Error("Failed to fetch team resilience data");
            const data = await response.json();
            return data?.data || data;
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
            const response = await fetch(`${API_BASE}/team/squads`, {
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
            const response = await fetch(`${API_BASE}/team/squads`, {
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
