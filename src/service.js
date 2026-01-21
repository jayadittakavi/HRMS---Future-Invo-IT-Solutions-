const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return response;
    },

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
    },

    verifyResetOtp: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/verify-reset-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response;
    },

    forgotPassword: async (email) => {
        const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return response;
    },

    resetPassword: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response;
    }
};
