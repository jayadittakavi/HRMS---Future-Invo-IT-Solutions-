const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export const signupService = {
    signupSuperAdmin: async (userData) => {
        const response = await fetch(`${BASE_URL}/auth/super-admin/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response;
    },

    verifySignupOtp: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/verify-signup-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response;
    }
};
