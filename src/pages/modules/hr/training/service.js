const API_BASE = "/api";

const getAuthHeader = (role = 'hr') => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Role': role,
            'Content-Type': 'application/json'
        }
    };
};

export const trainingService = {
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/training/stats`, getAuthHeader());
            if (!response.ok) return { active_courses: 0, completion_rate: 0, training_hours: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { active_courses: 0, completion_rate: 0, training_hours: 0 };
        }
    },

    getPrograms: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/training/programs`, getAuthHeader());
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getPrograms):", error);
            return [];
        }
    },

    createProgram: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr/training/programs`, {
                method: "POST",
                headers: getAuthHeader().headers,
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (createProgram):", error);
            throw error;
        }
    },

    getProgramDetails: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/hr/training/programs/${id}`, getAuthHeader());
            return await response.json();
        } catch (error) {
            console.error("API Error (getProgramDetails):", error);
            return null;
        }
    },

    assignEmployees: async (id, employeeIds) => {
        try {
            const response = await fetch(`${API_BASE}/hr/training/programs/${id}/assign`, {
                method: "POST",
                headers: getAuthHeader().headers,
                body: JSON.stringify({ employee_ids: employeeIds })
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (assignEmployees):", error);
            throw error;
        }
    },

    uploadMaterials: async (id, formData) => {
        try {
            // Remove Content-Type for FormData
            const auth = getAuthHeader();
            const headers = { ...auth.headers };
            delete headers['Content-Type'];

            const response = await fetch(`${API_BASE}/hr/training/programs/${id}/materials`, {
                method: "POST",
                headers: headers,
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (uploadMaterials):", error);
            throw error;
        }
    }
};
