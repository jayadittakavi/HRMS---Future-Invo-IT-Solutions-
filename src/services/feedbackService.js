import { API_BASE, getAuthHeader } from '../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // Feedback is typically HR or Employee related
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
