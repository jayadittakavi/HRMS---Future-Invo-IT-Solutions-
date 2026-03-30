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
            const response = await fetch(`${API_BASE}/recruitment/stats`, authHeader());
            if (!response.ok) return { open_positions: 0, total_applicants: 0, in_interview: 0, offers_made: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { open_positions: 0, total_applicants: 0, in_interview: 0, offers_made: 0 };
        }
    },

    // 2. Get Job Openings
    getJobs: async (status = 'Open') => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs?status=${status}`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getJobs):", error);
            return [];
        }
    },

    // 3. Post/Update New Job
    saveJob: async (jobData) => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jobData)
            });
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
            return response.ok;
        } catch (error) {
            console.error("API Error (deleteJob):", error);
            return false;
        }
    },

    // 5. Get All Applicants
    getApplicants: async () => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/applicants`, authHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getApplicants):", error);
            return [];
        }
    },

    // 6. Job Form Options
    getFormOptions: async () => {
        try {
            const response = await fetch(`${API_BASE}/recruitment/jobs/form-options`, authHeader());
            if (!response.ok) return { departments: [], jobTypes: [] };
            return await response.json();
        } catch (error) {
            console.error("API Error (getFormOptions):", error);
            return { departments: [], jobTypes: [] };
        }
    }
};
