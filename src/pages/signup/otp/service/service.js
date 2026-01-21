const BASE_URL = import.meta.env.VITE_API_BASE || "http://192.168.1.4:5000/api/auth/verify-signup-otp"

export const verifySignupOtpService = {
    verify: async (email, otp) => {
        const response = await fetch(`${BASE_URL}/auth/verify-signup-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        return response;
    }
};
