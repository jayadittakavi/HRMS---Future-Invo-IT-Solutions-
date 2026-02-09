const BASE_URL = import.meta.env.VITE_API_BASE || "http://192.168.1.5:5000/api";

export const SIGNUP_URL = "http://192.168.1.5:5000/api/auth/super-admin/signup";
export const VERIFY_OTP_URL = "http://192.168.1.5:5000/api/auth/verify-signup-otp";

export const signupService = {
    signupSuperAdmin: async (userData) => {
        try {
            const response = await fetch("http://192.168.1.5:5000/api/auth/super-admin/signup", {
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
            const response = await fetch("http://192.168.1.5:5000/api/auth/verify-signup-otp", {
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
