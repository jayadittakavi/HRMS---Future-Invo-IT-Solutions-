const BASE_URL = import.meta.env.VITE_API_BASE || "http://192.168.1.4:5000/api";

export const SIGNUP_URL = `${BASE_URL}/auth/super-admin/signup`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/verify-signup-otp`;

export const signupService = {
    signupSuperAdmin: async (userData) => {
        console.log("Mock Signup API called with:", userData);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true,
                    json: async () => ({ message: "Signup successful (Mock)" })
                });
            }, 1000);
        });
    },

    verifySignupOtp: async (data) => {
        console.log("Mock Verify OTP API called with:", data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true,
                    json: async () => ({
                        message: "Verification successful (Mock)",
                        token: "mock-jwt-token-superadmin",
                        user: {
                            role: "superadmin",
                            email: data.email,
                            name: "Super Admin"
                        }
                    })
                });
            }, 1000);
        });
    }
};
