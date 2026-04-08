import { API_BASE, getAuthHeader } from '../config';

export const payrollService = {
    // 🔹 Payslips
    getPayslips: async () => {
        try {
            const response = await fetch(`${API_BASE}/employee/payslips`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getPayslips):", error);
            return [];
        }
    },
    downloadPayslip: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/employee/payslips/${id}/pdf`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to download payslip");
            return await response.blob();
        } catch (error) {
            console.error("API Error (downloadPayslip):", error);
            throw error;
        }
    },

    // 🔹 Form-16
    getForm16: async () => {
        try {
            const response = await fetch(`${API_BASE}/employee/form16`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getForm16):", error);
            return [];
        }
    },
    downloadForm16: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/employee/form16/${id}/pdf`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to download Form-16");
            return await response.blob();
        } catch (error) {
            console.error("API Error (downloadForm16):", error);
            throw error;
        }
    },

    // 🔹 Full & Final Settlement
    getFnF: async () => {
        try {
            const response = await fetch(`${API_BASE}/employee/fnf`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) return [];
            const data = await response.json();
            return data?.data || (Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("API Error (getFnF):", error);
            return [];
        }
    },
    downloadFnF: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/employee/fnf/${id}/pdf`, {
                headers: getAuthHeader('employee')
            });
            if (!response.ok) throw new Error("Failed to download F&F statement");
            return await response.blob();
        } catch (error) {
            console.error("API Error (downloadFnF):", error);
            throw error;
        }
    }
};
