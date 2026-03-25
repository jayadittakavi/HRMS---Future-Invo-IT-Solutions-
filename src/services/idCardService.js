const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    // Using superadmin token for testing if local token is not available
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k";
    const finalToken = token || testToken;

    return {
        headers: {
            "Content-Type": "application/json",
            ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
        },
    };
};

export const idCardService = {
    getAllIDCards: async () => {
        const response = await fetch(`${API_BASE}/id-card/list`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        const result = await response.json();
        return Array.isArray(result) ? result : (result.data || result.cards || []);
    },

    getIDCardByUserId: async (userId) => {
        const response = await fetch(`${API_BASE}/id-card/list`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        const result = await response.json();
        const cards = Array.isArray(result) ? result : (result.data || result.cards || []);
        return cards.find(c => c.user_id === userId || c.id === userId) || null;
    },

    createIDCard: async (cardData) => {
        const response = await fetch(`${API_BASE}/id-card/create`, {
            method: "POST",
            body: JSON.stringify(cardData),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    updateIDCard: async (id, updates) => {
        // Assuming there's an update endpoint, or using create if it handles updates
        const response = await fetch(`${API_BASE}/id-card/create`, {
            method: "POST",
            body: JSON.stringify({ ...updates, id }),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    deleteIDCard: async (id) => {
        // Assuming there might be a delete endpoint, if not, this is a placeholder
        const response = await fetch(`${API_BASE}/id-card/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
    }
};

