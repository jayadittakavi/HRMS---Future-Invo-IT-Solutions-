import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Support functions typically used by HR or Employees
    };
};

export const supportService = {
    // 🔹 Get Support Dashboard Stats
    getDashboardStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/support/dashboard-stats`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (getDashboardStats):", error);
            throw error;
        }
    },

    // 🔹 List Tickets
    getTickets: async () => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            const result = await response.json();
            return Array.isArray(result) ? result : (result.data || result.tickets || []);
        } catch (error) {
            console.error("API Error (getTickets):", error);
            throw error;
        }
    },

    // 🔹 Raise Ticket
    createTicket: async (ticketData) => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets`, {
                method: "POST",
                body: JSON.stringify(ticketData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createTicket):", error);
            throw error;
        }
    },

    // 🔹 Update Ticket (Status or Priority)
    updateTicket: async (id, ticketData) => {
        try {
            const response = await fetch(`${API_BASE}/support/tickets/${id}`, {
                method: "PUT",
                body: JSON.stringify(ticketData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateTicket ${id}):`, error);
            throw error;
        }
    }
};
