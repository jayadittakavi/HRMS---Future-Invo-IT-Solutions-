import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Standard HR fallback
    };
};

export const helpdeskService = {
    // 1. Get Tickets (supports role-based filtering on backend)
    getTickets: async () => {
        try {
            const response = await fetch(`${API_BASE}/tickets`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getTickets):", error);
            return [];
        }
    },

    // 2. Create Ticket
    createTicket: async (ticketData) => {
        try {
            const response = await fetch(`${API_BASE}/tickets`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ticketData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (createTicket):", error);
            throw error;
        }
    },

    // 3. Get Dashboard Stats
    getDashboardStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/dashboard-stats`, authHeader());
            if (!response.ok) return { total_tickets: 0, open: 0, in_progress: 0, resolved: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getDashboardStats):", error);
            return { total_tickets: 0, open: 0, in_progress: 0, resolved: 0 };
        }
    },

    // 4. Update Ticket (Status, Priority, etc.)
    updateTicket: async (id, updateData) => {
        try {
            const response = await fetch(`${API_BASE}/tickets/${id}`, {
                method: "PUT",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateTicket):", error);
            throw error;
        }
    }
};
