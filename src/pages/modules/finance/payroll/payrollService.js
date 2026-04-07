const BASE_URL = "/api/payroll";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const payrollService = {
    // 🔸 1. Dashboard & Overview
    getDashboardStats: async () => {
        const response = await fetch(`${BASE_URL}/admin/payroll/dashboard`, {
            method: "GET",
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },

    // 🔸 2. Configuration (Admin/Super Admin/Accounts)
    // Pay Grades & Roles
    getPayGrades: async () => {
        const response = await fetch(`${BASE_URL}/account/paygrades`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    createPayGrade: async (data) => {
        const response = await fetch(`${BASE_URL}/account/paygrades`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getPayRoles: async () => {
        const response = await fetch(`${BASE_URL}/account/payroles`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    createPayRole: async (data) => {
        const response = await fetch(`${BASE_URL}/account/payroles`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    // Salary Components & Structures
    getSalaryComponents: async () => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/components`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    createSalaryComponent: async (data) => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/components`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getSalaryStructures: async () => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/structures`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    createSalaryStructure: async (data) => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/structures`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    // Statutory Settings
    getStatutorySettings: async () => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/statutory`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    updateStatutorySettings: async (data) => {
        const response = await fetch(`${BASE_URL}/superadmin/payroll/statutory`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    // 🔸 3. Payroll Processing (Admin/HR)
    // Salary Assignment
    assignSalaryStructure: async (data) => {
        const response = await fetch(`${BASE_URL}/superadmin/salary-assignments`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getSalaryAssignments: async () => {
        const response = await fetch(`${BASE_URL}/superadmin/salary-assignments`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },

    // Payslip Management
    generatePayslips: async (data) => {
        const response = await fetch(`${BASE_URL}/admin/payslips/generate`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getPayslips: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${BASE_URL}/admin/payslips?${query}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    updatePayslip: async (id, data) => {
        const response = await fetch(`${BASE_URL}/admin/payslips/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getPayslipPdf: async (id) => {
        const response = await fetch(`${BASE_URL}/admin/payslips/${id}/pdf`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        return await response.blob();
    },

    // 🔸 4. Reports (Financial & Compliance)
    getSalaryRegisterReport: async () => {
        const response = await fetch(`${BASE_URL}/payroll/reports/salary-register`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getIncomeTaxReport: async () => {
        const response = await fetch(`${BASE_URL}/payroll/reports/income-tax`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getProfessionalTaxReport: async () => {
        const response = await fetch(`${BASE_URL}/payroll/reports/professional-tax`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getGeneralLedgerReport: async () => {
        const response = await fetch(`${BASE_URL}/payroll/reports/general-ledger`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getAccountsPayableReport: async () => {
        const response = await fetch(`${BASE_URL}/payroll/reports/accounts-payable`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },

    // 🔸 5. Employee Self-Service
    getEmployeePayslips: async () => {
        const response = await fetch(`${BASE_URL}/employee/payslips`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getEmployeePayslipPdf: async (id) => {
        const response = await fetch(`${BASE_URL}/employee/payslips/${id}/pdf`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        return await response.blob();
    },

    // 🔸 6. Taxes & Settlements
    getForm16: async (year) => {
        const response = await fetch(`${BASE_URL}/payroll/form16?year=${year}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    saveForm16: async (data) => {
        const response = await fetch(`${BASE_URL}/payroll/form16`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    getFullAndFinal: async (employeeId) => {
        const response = await fetch(`${BASE_URL}/payroll/fnf?employeeId=${employeeId}`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    getSettlements: async () => {
        const response = await fetch(`${BASE_URL}/payroll/fnf`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    saveFullAndFinal: async (data) => {
        const response = await fetch(`${BASE_URL}/payroll/fnf`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },
    initiateSettlement: async (data) => {
        const response = await fetch(`${BASE_URL}/payroll/fnf/initiate`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    // 🔸 7. Payroll Letters
    getPayoutLetters: async () => {
        const response = await fetch(`${BASE_URL}/payroll/letters`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data?.data || data;
    },
    createPayoutLetter: async (data) => {
        const response = await fetch(`${BASE_URL}/payroll/letters`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    }
};

