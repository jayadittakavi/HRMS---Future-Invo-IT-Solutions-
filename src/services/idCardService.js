import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Set fallback role as hr
    };
};

export const idCardService = {
    getAllIDCards: async () => {
        try {
            const response = await fetch(`${API_BASE}/id-card/list`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch ID cards");
            const result = await response.json();
            return Array.isArray(result) ? result : (result.data || result.cards || []);
        } catch (error) {
            console.error("API Error (getAllIDCards):", error);
            return [];
        }
    },

    getIDCardByUserId: async (userId) => {
        try {
            const cards = await idCardService.getAllIDCards();
            const matched = cards.find(c => String(c.user_id) === String(userId) || String(c.id) === String(userId));
            return matched || null;
        } catch (error) {
            console.error("API Error (getIDCardByUserId):", error);
            return null;
        }
    },

    createIDCard: async (cardData) => {
        try {
            const response = await fetch(`${API_BASE}/id-card/create`, {
                method: "POST",
                body: JSON.stringify(cardData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (createIDCard):", error);
            throw error;
        }
    },

    updateIDCard: async (id, updates) => {
        try {
            const response = await fetch(`${API_BASE}/id-card/create`, {
                method: "POST", // Backend might use create as upsert
                body: JSON.stringify({ ...updates, id }),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error(`API Error (updateIDCard ${id}):`, error);
            throw error;
        }
    },

    deleteIDCard: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/id-card/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return true;
        } catch (error) {
            console.error(`API Error (deleteIDCard ${id}):`, error);
            return false;
        }
    }
};
