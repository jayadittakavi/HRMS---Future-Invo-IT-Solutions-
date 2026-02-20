const API_URL = 'http://192.168.1.5:5000/api/auth/reset-password';

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
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
