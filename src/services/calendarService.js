import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Set fallback role as hr
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
