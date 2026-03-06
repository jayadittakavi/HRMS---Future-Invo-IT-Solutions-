const BASE_URL = "/api";

export const signupService = {
    signupSuperAdmin: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/super-admin/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    verifySignupOtp: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-signup-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};