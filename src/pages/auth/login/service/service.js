const BASE_URL = "http://100.67.241.99:5000/api/auth";
export const LOGIN_URL = `http://100.67.241.99:5000/api/auth/login`;

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
