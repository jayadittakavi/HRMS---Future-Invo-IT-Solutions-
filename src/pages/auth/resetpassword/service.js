const BASE_URL = import.meta.env.VITE_API_BASE || "/api";
const API_URL = `${BASE_URL}/auth/reset-password`;

export const resetPassword = async (email, token, new_password) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token, new_password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reset password');
        }

        return data;
    } catch (error) {
        throw error;
    }
};
