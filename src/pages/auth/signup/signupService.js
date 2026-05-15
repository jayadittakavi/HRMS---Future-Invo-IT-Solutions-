const BASE_URL = '';


export const signupService = {
    signupSuperAdmin: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/super-admin/signup`, {
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
            const response = await fetch(`${BASE_URL}/api/auth/verify-signup-otp`, {
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
    },

    verifySuperAdminOtp: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/super-admin/verify-otp`, {
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