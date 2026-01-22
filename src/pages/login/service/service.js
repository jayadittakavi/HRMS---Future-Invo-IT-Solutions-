const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export const loginService = {
    login: async (email, password) => {
        console.log("Mock Login API called with:", email);
        let role = 'employee';
        // Simple logic to test different roles based on email content
        if (email.includes('super')) role = 'superadmin';
        else if (email.includes('admin')) role = 'admin';
        else if (email.includes('manager')) role = 'manager';
        else if (email.includes('hr')) role = 'hr';
        else if (email.includes('accountant')) role = 'accountant';
        else if (email.includes('new')) role = 'newuser';

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true,
                    json: async () => ({
                        message: "Login successful (Mock)",
                        token: `mock-jwt-token-${role}`,
                        user: {
                            role: role,
                            email: email,
                            name: "Mock User"
                        }
                    })
                });
            }, 1000);
        });
    }
};
