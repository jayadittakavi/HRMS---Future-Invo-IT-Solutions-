import { API_BASE, getAuthHeader } from '../config';

export const assetService = {
    // 🔹 Get My Assigned Assets
    getMyAssets: async () => {
        try {
            const response = await fetch(`${API_BASE}/assets/me`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to fetch assigned assets");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getMyAssets):", error);
            throw error;
        }
    }
};
