const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Standard hardcoded token for development fallback
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k";

    const finalToken = token || testToken;

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${finalToken}`
        },
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
