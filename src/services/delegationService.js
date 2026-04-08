import { API_BASE, getAuthHeader } from '../config';

const authHeader = (role = 'manager') => ({ headers: getAuthHeader(role) });

export const delegationService = {
    // 1. Delegation Stats
    getStats: async (role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/administration/delegations/stats`, authHeader(role));
            if (!response.ok) return null;
            const data = await response.json();
            return data.data || data;
        } catch (error) {
            console.error("API Error (getStats):", error);
            return null;
        }
    },

    // 2. Delegation History List (Search supported)
    getDelegationHistory: async (search = "", role = 'manager') => {
        try {
            const query = search ? `?search=${encodeURIComponent(search)}` : "";
            const response = await fetch(`${API_BASE}/administration/delegations/list${query}`, authHeader(role));
            if (!response.ok) return [];
            const data = await response.json();
            return data.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getDelegationHistory):", error);
            return [];
        }
    },

    // 3. Create New Delegation
    createDelegation: async (delegationData, role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/administration/delegations/create`, {
                method: 'POST',
                headers: {
                    ...authHeader(role).headers,
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
    cancelDelegation: async (id, role = 'manager') => {
        try {
            const response = await fetch(`${API_BASE}/administration/delegations/cancel/${id}`, {
                method: 'POST',
                headers: {
                    ...authHeader(role).headers,
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
