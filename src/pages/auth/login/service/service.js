const BASE_URL = import.meta.env.VITE_API_BASE || "http://192.168.1.66:5000/api";
export const LOGIN_URL = "http://192.168.1.66:5000/api/auth/login";

export const loginService = {
    login: async (email, password) => {
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
