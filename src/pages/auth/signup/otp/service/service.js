const BASE_URL = "/api";

export const verifySignupOtpService = {
    verify: async (email, otp) => {
        const response = await fetch(`${BASE_URL}/auth/verify-signup-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        return response;
    },
    resend: async (email) => {
        const response = await fetch(`${BASE_URL}/auth/resend-signup-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return response;
    }
};
