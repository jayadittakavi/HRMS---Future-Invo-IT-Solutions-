const BASE_URL = "/api/auth";
export const LOGIN_URL = `${BASE_URL}/login`;

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
