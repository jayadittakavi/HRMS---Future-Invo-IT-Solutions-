const BASE_URL = import.meta.env.VITE_API_BASE || "http://192.168.1.13:5000/api";
export const FORGOT_PASSWORD_URL = "http://192.168.1.13:5000/api/auth/forgot-password";

export const forgotPasswordService = {
    forgotPassword: async (email) => {
        try {
            const response = await fetch(FORGOT_PASSWORD_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
};
