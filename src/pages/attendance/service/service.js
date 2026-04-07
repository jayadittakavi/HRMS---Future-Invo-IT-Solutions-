import { API_BASE, getAuthHeader } from '../../../config';

// Role-based auth header helper. Defaults to superadmin for management, employee for personal space.
const authHeader = (role = 'superadmin') => ({ headers: getAuthHeader(role) });

export const attendanceService = {
    // 🔹 Employee – view own attendance
    getMyAttendance: async () => {
        const response = await fetch(`${API_BASE}/attendance/me`, {
            method: "GET",
            ...authHeader('employee')
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Admin / HR – view all attendance
    getAllAttendance: async (query = '') => {
        const url = query ? `${API_BASE}/attendance?${query}` : `${API_BASE}/attendance`;
        const response = await fetch(url, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Manual attendance (SuperAdmin, Admin, HR, Manager)
    addManualAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/manual`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Update attendance
    updateAttendance: async (id, data) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Delete attendance
    deleteAttendance: async (id) => {
        const response = await fetch(`${API_BASE}/attendance/${id}`, {
            method: "DELETE",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Import Attendance CSV
    importAttendance: async (formData) => {
        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(`${API_BASE}/attendance/import`, {
            method: "POST",
            headers: headers,
            body: formData
        });

        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    getAllEmployees: async () => {
        const response = await fetch(`${API_BASE}/employees`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Manual Attendance
    addBulkAttendance: async (attendanceList) => {
        const promises = attendanceList.map(data =>
            fetch(`${API_BASE}/attendance/manual`, {
                method: "POST",
                body: JSON.stringify(data),
                ...authHeader()
            }).then(res => {
                if (!res.ok) throw new Error(`Failed for ${data.employee_id}`);
                return res.json();
            })
        );
        return Promise.all(promises);
    },

    // 🔹 Get Employee Details for Attendance
    getEmployeeDetails: async (employeeId) => {
        const response = await fetch(`${API_BASE}/attendance/employee-details/${employeeId}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Submit Single Attendance Record
    submitAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Attendance List
    getBulkAttendanceList: async (date) => {
        const response = await fetch(`${API_BASE}/attendance/bulk-list?date=${date}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Bulk Save Attendance
    saveBulkAttendance: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/bulk-save`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔹 Attendance Dashboard Stats
    getDashboardStats: async () => {
        const endpoints = [
            `${API_BASE}/attendance/dashboard-stats`,
            `${API_BASE}/admin/attendance/dashboard-stats`,
            `${API_BASE}/superadmin/attendance/dashboard-stats`,
            `${API_BASE}/management/attendance/stats`
        ];

        let lastErr = null;
        for (const url of endpoints) {
            try {
                // Try with current user token first, then fallback to superadmin token for system data
                const response = await fetch(url, {
                    method: "GET",
                    headers: getAuthHeader('superadmin') // System-wide stats often require SA privilege
                });
                if (response.ok) return await response.json();
            } catch (err) {
                lastErr = err;
            }
        }
        
        console.error("API Error (getDashboardStats): All endpoints failed.", lastErr);
        // Return a mock object if everything fails so the UI doesn't crash
        return {
            summary: { PRESENT: 0, ABSENT: 0, 'HALF DAY': 0, LATE: 0, WFH: 0 },
            shift_dist: { labels: ['General', 'Night', 'Morning'], data: [0,0,0] },
            trend: { labels: ['M', 'T', 'W', 'T', 'F'], present: [0,0,0,0,0], absent: [0,0,0,0,0] },
            overview: []
        };
    },

    // 🔹 Shift Details/List
    getShifts: async () => {
        const response = await fetch(`${API_BASE}/attendance/shifts`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) return [];
        return response.json();
    },

    // 🔸 Devices
    getDeviceList: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/device/list`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    registerDevice: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/features/device/register`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔸 Regularization
    getRegularizationRequests: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/regularization/request`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    submitRegularization: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/features/regularization/request`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader('employee')
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    reviewRegularization: async (id, data) => {
        const response = await fetch(`${API_BASE}/attendance/features/regularization/request/${id}/review`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔸 Sync & Sync Logs
    getSyncStatus: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/sync/status`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    triggerSync: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/sync/trigger`, {
            method: "POST",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    getSyncLogs: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/sync/logs`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔸 Mobile Attendance
    getMobilePunches: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/punch/mobile`, {
            method: "GET",
            ...authHeader('employee')
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    mobilePunch: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/features/punch/mobile`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader('employee')
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    // 🔸 Attendance Policy
    getAttendancePolicy: async () => {
        const response = await fetch(`${API_BASE}/attendance/features/policy`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    updateAttendancePolicy: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/features/policy`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
};

