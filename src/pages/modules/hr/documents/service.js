import { API_BASE, getAuthHeader } from '../../../../config';

export const documentService = {
    getPolicies: async () => {
        try {
            const response = await fetch(`${API_BASE}/document-center/policies`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to fetch policies");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getPolicies):", error);
            throw error;
        }
    },

    getMyDocuments: async () => {
        try {
            const response = await fetch(`${API_BASE}/document-center/my-documents`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to fetch personal documents");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getMyDocuments):", error);
            throw error;
        }
    },

    getAdminList: async () => {
        try {
            const response = await fetch(`${API_BASE}/document-center/admin/list`, {
                headers: getAuthHeader('hr')
            });
            if (!response.ok) throw new Error("Failed to fetch employee documents for management");
            const data = await response.json();
            return data?.data || data;
        } catch (error) {
            console.error("API Error (getAdminList):", error);
            throw error;
        }
    },

    uploadDocument: async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/document-center/upload`, {
                method: "POST",
                headers: getAuthHeader('employee'),
                body: formData
            });
            if (!response.ok) throw new Error("Document upload failed");
            return await response.json();
        } catch (error) {
            console.error("API Error (uploadDocument):", error);
            throw error;
        }
    },

    verifyDocument: async (id, action, reason = "") => {
        try {
            const response = await fetch(`${API_BASE}/document-center/admin/verify/${id}`, {
                method: "POST",
                headers: {
                    ...getAuthHeader('hr'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action, reason })
            });
            if (!response.ok) throw new Error("Document verification failed");
            return await response.json();
        } catch (error) {
            console.error("API Error (verifyDocument):", error);
            throw error;
        }
    },

    downloadDocument: async (id, filename) => {
        try {
            const response = await fetch(`${API_BASE}/document-center/download/${id}`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to download document");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename || `doc_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("API Error (downloadDocument):", error);
            throw error;
        }
    }
};
