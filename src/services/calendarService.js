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

export const calendarService = {
    // 🔹 List All Events
    getEvents: async () => {
        try {
            const response = await fetch(`${API_BASE}/calendar/events`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            const result = await response.json();
            return Array.isArray(result) ? result : (result.data || result.events || []);
        } catch (error) {
            console.error("API Error (getEvents):", error);
            throw error;
        }
    },

    // 🔹 Create New Event
    createEvent: async (eventData) => {
        try {
            const response = await fetch(`${API_BASE}/calendar/events`, {
                method: "POST",
                body: JSON.stringify(eventData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createEvent):", error);
            throw error;
        }
    },

    // 🔹 Update Event
    updateEvent: async (id, eventData) => {
        try {
            const response = await fetch(`${API_BASE}/calendar/events/${id}`, {
                method: "PUT",
                body: JSON.stringify(eventData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateEvent ${id}):`, error);
            throw error;
        }
    },

    // 🔹 Delete Event
    deleteEvent: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/calendar/events/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (deleteEvent ${id}):`, error);
            throw error;
        }
    }
};
