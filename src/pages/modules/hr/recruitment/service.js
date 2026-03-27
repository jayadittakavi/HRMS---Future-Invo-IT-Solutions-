import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'),
    };
};

export const recruitmentService = {
    // 1. Recruitment Dashboard Stats
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/stats`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch recruitment stats");
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            throw error;
        }
    },

    // 2. Get Job Openings
    getJobs: async (status = 'Open') => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs?status=${status}`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch job openings");
            return await response.json();
        } catch (error) {
            console.error("API Error (getJobs):", error);
            throw error;
        }
    },

    // 3. Post/Update New Job
    saveJob: async (jobData) => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs`, {
                method: "POST",
                ...authHeader(),
                body: JSON.stringify(jobData)
            });
            if (!response.ok) throw new Error("Failed to save job");
            return await response.json();
        } catch (error) {
            console.error("API Error (saveJob):", error);
            throw error;
        }
    },

    // 4. Delete Job
    deleteJob: async (jobId) => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs/${jobId}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to delete job");
            return await response.json();
        } catch (error) {
            console.error("API Error (deleteJob):", error);
            throw error;
        }
    },

    // 5. Get All Applicants
    getApplicants: async () => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/applicants`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch applicants");
            return await response.json();
        } catch (error) {
            console.error("API Error (getApplicants):", error);
            throw error;
        }
    },

    // 6. Job Form Options
    getFormOptions: async () => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs/form-options`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch job form options");
            return await response.json();
        } catch (error) {
            console.error("API Error (getFormOptions):", error);
            throw error;
        }
    }
};
