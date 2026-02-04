export const VERIFY_RESET_OTP_URL = "http://192.168.1.13:5000/api/auth/verify-reset-otp";

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
