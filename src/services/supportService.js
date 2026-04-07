import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'employee') => ({
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const supportService = {
    // 🔹 Get Helpdesk Configuration (Categories & Priority)
    getConfig: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/support/config`, {
                headers: getAuthHeader(role)
            });
            if (!response.ok) return { categories: [], priorities: [] };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getConfig):", error);
            return { categories: [], priorities: [] };
        }
    },

    // 🔹 Get Support Dashboard Stats
    getDashboardStats: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/support/dashboard-stats`, {
                method: "GET",
                headers: getAuthHeader(role)
            });
            if (!response.ok) return { total_active: 0, pending_action: 0, resolution_rate: '0%' };
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getDashboardStats):", error);
            return { total_active: 0, pending_action: 0, resolution_rate: '0%' };
        }
    },

    // 🔹 List Tickets
    getTickets: async (role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets`, {
                method: "GET",
                headers: getAuthHeader(role)
            });
            if (!response.ok) return [];
            const result = await response.json();
            return result?.data || (Array.isArray(result) ? result : (result.tickets || []));
        } catch (error) {
            console.error("API Error (getTickets):", error);
            return [];
        }
    },

    // 🔹 Raise Ticket
    createTicket: async (ticketData, role = 'employee') => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets`, {
                method: "POST",
                body: JSON.stringify(ticketData),
                headers: authHeader(role).headers
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createTicket):", error);
            throw error;
        }
    },

    // 🔹 Update Ticket (Status or Priority) - Use Action endpoint
    updateTicket: async (id, actionData, role = 'hr') => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets/${id}/action`, {
                method: "PATCH",
                body: JSON.stringify(actionData),
                headers: authHeader(role).headers
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateTicket ${id}):`, error);
            throw error;
        }
    }
};
