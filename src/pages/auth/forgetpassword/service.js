const BASE_URL = "/api/auth";
export const FORGOT_PASSWORD_URL = `${BASE_URL}/forgot-password`;

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
