import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = (role = 'superadmin') => ({ 
    headers: {
        ...getAuthHeader(role),
        "Content-Type": "application/json"
    }
});

export const onboardingService = {
    // 1. Get Onboarding Statistics
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/stats`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { total_hires: 0, pending_docs: 0, in_progress: 0, verified: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getStats):", error);
            return { total_hires: 0, pending_docs: 0, in_progress: 0, verified: 0 };
        }
    },

    // 2. Get Candidate List
    getCandidates: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/candidates`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getCandidates):", error);
            return [];
        }
    },

    // 3. Get Document Checklist
    getChecklist: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/checklist`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { educational: [], identity: [] };
            return await response.json();
        } catch (error) {
            console.error(`API Error (getChecklist ${employeeId}):`, error);
            return { educational: [], identity: [] };
        }
    },

    // 4. Verify Single Document
    verifyDocument: async (employeeId, documentId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/verify-document/${documentId}`, {
                method: "POST",
                headers: authHeader('superadmin').headers
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (verifyDocument):", error);
            return false;
        }
    },

    // 5. Verify All Documents
    verifyAll: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/verify-all`, {
                method: "POST",
                headers: authHeader('superadmin').headers
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (verifyAll):", error);
            return false;
        }
    },

    // 6. Get Form Options
    getFormOptions: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/form-options`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { departments: [], designations: [], employmentTypes: [] };
            return await response.json();
        } catch (error) {
            console.error("API Error (getFormOptions):", error);
            return { departments: [], designations: [], employmentTypes: [] };
        }
    },

    // 7. Add New Candidate
    addCandidate: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/add-candidate`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (addCandidate):", error);
            throw error;
        }
    },

    // 8. Get Letter Options
    getLetterOptions: async (employeeId) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/letter-options`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { letter_types: [], templates: [] };
            return await response.json();
        } catch (error) {
            console.error("API Error (getLetterOptions):", error);
            return { letter_types: [], templates: [] };
        }
    },

    // 9. Generate Letter
    generateLetter: async (employeeId, data) => {
        try {
            const response = await fetch(`${API_BASE}/hr/onboarding/${employeeId}/generate-letter`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (generateLetter):", error);
            throw error;
        }
    },
    
    // ... rest of template methods (unchanged for now or keep standardizing if needed)
    getTemplateStats: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/stats`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { total: 0, active: 0, draft: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getTemplateStats):", error);
            return { total: 0, active: 0, draft: 0 };
        }
    },
    getTemplates: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/list`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            return [];
        }
    },
    addTemplate: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/add`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    updateTemplate: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/${id}`, {
                method: "PUT",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    deleteTemplate: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/${id}`, {
                method: "DELETE",
                headers: getAuthHeader('superadmin')
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    },
    getTemplateCategories: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/templates/categories`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            return [];
        }
    },

    // 16. Letter Approvals
    getApprovalSummary: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/approval/summary`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { pending_approvals: 0, active_workflows: 0, approved_this_month: 0, rejected: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getApprovalSummary):", error);
            return { pending_approvals: 0, active_workflows: 0, approved_this_month: 0, rejected: 0 };
        }
    },

    getPendingApprovals: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/approval/pending`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getPendingApprovals):", error);
            return [];
        }
    },

    processApprovalAction: async (stepId, action) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/approval/${stepId}/action`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify({ action }),
            });
            return response.ok;
        } catch (error) {
            console.error("API Error (processApprovalAction):", error);
            return false;
        }
    },

    getWorkflows: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/approval/workflows`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getWorkflows):", error);
            return [];
        }
    },

    saveWorkflow: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/letters/approval/workflows`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (saveWorkflow):", error);
            throw error;
        }
    },

    // 17. Certificates
    getCertificateHistory: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/certificates/history`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getCertificateHistory):", error);
            return [];
        }
    },

    issueCertificate: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/certificates/issue`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (issueCertificate):", error);
            throw error;
        }
    },

    viewCertificate: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/certificates/${id}/view`, { headers: getAuthHeader('superadmin') });
            return await response.json();
        } catch (error) {
            console.error("API Error (viewCertificate):", error);
            return null;
        }
    },

    downloadCertificate: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/certificates/${id}/download`, { headers: getAuthHeader('superadmin') });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Certificate_${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (error) {
            console.error("API Error (downloadCertificate):", error);
        }
    },

    // 18. E-Signing
    getESignSummary: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/esign/summary`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return { total_sent: 0, signed: 0, pending: 0, overdue: 0 };
            return await response.json();
        } catch (error) {
            console.error("API Error (getESignSummary):", error);
            return { total_sent: 0, signed: 0, pending: 0, overdue: 0 };
        }
    },

    getESignRequests: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/esign/requests`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getESignRequests):", error);
            return [];
        }
    },

    sendESignRequest: async (data) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/esign/requests`, {
                method: "POST",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (sendESignRequest):", error);
            throw error;
        }
    },

    getESignSettings: async () => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/esign/settings`, { headers: getAuthHeader('superadmin') });
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("API Error (getESignSettings):", error);
            return [];
        }
    },

    updateESignSettings: async (settings) => {
        try {
            const response = await fetch(`${API_BASE}/hr-docs/esign/settings`, {
                method: "PUT",
                headers: authHeader('superadmin').headers,
                body: JSON.stringify(settings)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (updateESignSettings):", error);
            throw error;
        }
    }
};
