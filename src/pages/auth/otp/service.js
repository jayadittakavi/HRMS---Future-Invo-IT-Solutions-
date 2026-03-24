const BASE_URL = "/api/auth";
export const VERIFY_RESET_OTP_URL = `${BASE_URL}/verify-reset-otp`;

export const otpService = {
    verifyResetOtp: async (email, otp) => {
        try {
            const response = await fetch(VERIFY_RESET_OTP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
