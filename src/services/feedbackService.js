const API_BASE = "/api";

const authHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");

    // Standard hardcoded token for development fallback
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzQ0MjI2OTF9.M_u5L0lGqNRh3dvcBXWcv5wQD68AGQVY4UP7JJULs4k";

    const finalToken = token || testToken;

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${finalToken}`
        },
    };
};

export const feedbackService = {
    // 🔹 Submit Feedback
    submitFeedback: async (feedbackData) => {
        try {
            const response = await fetch(`${API_BASE}/feedback`, {
                method: "POST",
                body: JSON.stringify(feedbackData),
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            return await response.json();
        } catch (error) {
            console.error("API Error (submitFeedback):", error);
            throw error;
        }
    },

    // 🔹 Get Feedback List (Admins/HR)
    getFeedbackList: async () => {
        try {
            const response = await fetch(`${API_BASE}/feedback/list`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error(await response.text());
            const result = await response.json();
            return Array.isArray(result) ? result : (result.data || result.feedback || []);
        } catch (error) {
            console.error("API Error (getFeedbackList):", error);
            throw error;
        }
    }
};
