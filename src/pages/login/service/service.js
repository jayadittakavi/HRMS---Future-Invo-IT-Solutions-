const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export const loginService = {
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return response;
    }
};
