const BASE_URL = "/auth";
export const LOGIN_URL = `/auth/login`;

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
