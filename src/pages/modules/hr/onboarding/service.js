import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('hr'), // These APIs are specifically for the HR role
    };
};

export const onboardingService = {
    // 1. Get Onboarding Statistics
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/stats`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch onboarding stats");
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            throw error;
        }
    },

    // 2. Get Candidate List
    getCandidates: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/candidates`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch candidate list");
            return await response.json();
        } catch (error) {
            console.error("API Error (getCandidates):", error);
            throw error;
        }
    },

    // 3. Get Document Checklist
    getChecklist: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/checklist`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch document checklist");
            return await response.json();
        } catch (error) {
            console.error(`API Error (getChecklist ${employeeId}):`, error);
            throw error;
        }
    },

    // 4. Verify Single Document
    verifyDocument: async (employeeId, documentId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/verify-document/${documentId}`, {
                method: "POST",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to verify document");
            return await response.json();
        } catch (error) {
            console.error("API Error (verifyDocument):", error);
            throw error;
        }
    },

    // 5. Verify All Documents
    verifyAll: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/verify-all`, {
                method: "POST",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to verify all documents");
            return await response.json();
        } catch (error) {
            console.error("API Error (verifyAll):", error);
            throw error;
        }
    },

    // 6. Get Form Options
    getFormOptions: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/form-options`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch form options");
            return await response.json();
        } catch (error) {
            console.error("API Error (getFormOptions):", error);
            throw error;
        }
    },

    // 7. Add New Candidate
    addCandidate: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/add-candidate`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add candidate");
            }
            return await response.json();
        } catch (error) {
            console.error("API Error (addCandidate):", error);
            throw error;
        }
    },

    // 8. Get Letter Options
    getLetterOptions: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/letter-options`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch letter options");
            return await response.json();
        } catch (error) {
            console.error("API Error (getLetterOptions):", error);
            throw error;
        }
    },

    // 9. Generate Letter
    generateLetter: async (employeeId, data) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/generate-letter`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to generate letter");
            return await response.json();
        } catch (error) {
            console.error("API Error (generateLetter):", error);
            throw error;
        }
    },

    // 10. Letter Template Stats
    getTemplateStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/stats`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch template stats");
            return await response.json();
        } catch (error) {
            console.error("API Error (getTemplateStats):", error);
            throw error;
        }
    },

    // 11. Letter Template List
    getTemplates: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/list`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch templates");
            return await response.json();
        } catch (error) {
            console.error("API Error (getTemplates):", error);
            throw error;
        }
    },

    // 12. Add Template
    addTemplate: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/add`, {
                method: "POST",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to add template");
            return await response.json();
        } catch (error) {
            console.error("API Error (addTemplate):", error);
            throw error;
        }
    },

    // 13. Update Template
    updateTemplate: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/${id}`, {
                method: "PUT",
                headers: {
                    ...authHeader().headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to update template");
            return await response.json();
        } catch (error) {
            console.error("API Error (updateTemplate):", error);
            throw error;
        }
    },

    // 14. Delete Template
    deleteTemplate: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/${id}`, {
                method: "DELETE",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to delete template");
            return await response.json();
        } catch (error) {
            console.error("API Error (deleteTemplate):", error);
            throw error;
        }
    },

    // 15. Get Template Categories
    getTemplateCategories: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/categories`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch categories");
            return await response.json();
        } catch (error) {
            console.error("API Error (getTemplateCategories):", error);
            throw error;
        }
    }
};
