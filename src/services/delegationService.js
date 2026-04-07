import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'employee') => ({ headers: getAuthHeader(role) });

export const delegationService = {
    // 1. Delegation Stats
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/delegation/stats`, authHeader());
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return null;
        }
    },

    // 2. Delegation History List
    getDelegationList: async () => {
        try {
            const response = await fetch(`${API_BASE}/delegation/list`, authHeader());
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getDelegationList):", error);
            return [];
        }
    },

    // 3. Create New Delegation
    createDelegation: async (delegationData) => {
        try {
            const response = await fetch(`${API_BASE}/delegation/create`, {
                method: 'POST',
                headers: {
                    ...authHeader().headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(delegationData)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (createDelegation):", error);
            throw error;
        }
    },

    // 4. Cancel Delegation
    cancelDelegation: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/delegation/cancel/${id}`, {
                method: 'POST',
                headers: {
                    ...authHeader().headers,
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (cancelDelegation):", error);
            throw error;
        }
    }
};
