const BASE_URL = "/api";
export const LOGIN_URL = `${BASE_URL}/auth/login`;

export const loginService = {
    login: async (email, password) => {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    },
};
