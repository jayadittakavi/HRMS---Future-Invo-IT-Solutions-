import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'employee') => ({ headers: getAuthHeader(role) });

export const deskService = {
    // 1. Desk Inventory Stats
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/desk/stats`, authHeader());
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return null;
        }
    },

    // 2. Live Desk List
    getDeskList: async () => {
        try {
            const response = await fetch(`${API_BASE}/desk/list`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getDeskList):", error);
            return [];
        }
    },

    // 3. Floor Occupancy Overview
    getOccupancy: async () => {
        try {
            const response = await fetch(`${API_BASE}/desk/occupancy`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getOccupancy):", error);
            return [];
        }
    },

    // 4. Create Desk Booking
    bookDesk: async (bookingData) => {
        try {
            const response = await fetch(`${API_BASE}/desk/book`, {
                method: 'POST',
                headers: {
                    ...authHeader().headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (bookDesk):", error);
            throw error;
        }
    },

    // 5. Personal Bookings
    getMyBookings: async () => {
        try {
            const response = await fetch(`${API_BASE}/desk/my-bookings`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getMyBookings):", error);
            return [];
        }
    }
};
