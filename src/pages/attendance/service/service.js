import { API_BASE, getAuthHeader } from '../../../config';

// Role-based auth header helper. Defaults to the current user's role in the session.
const authHeader = (role = '') => ({ headers: getAuthHeader(role) });

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
        const url = `${API_BASE}/attendance/dashboard-stats`;

        try {
            const response = await fetch(url, {
                method: "GET",
                ...authHeader()
            });
            if (response.ok) return await response.json();
            
            // Fallback for different API suites if the primary fails
            const altResponse = await fetch(`${API_BASE}/superadmin/attendance/dashboard-stats`, {
                method: "GET",
                ...authHeader()
            });
            if (altResponse.ok) return await altResponse.json();

        } catch (err) {
            console.error("API Error (getDashboardStats): Fetch failed.", err);
        }
        
        // Return a mock object if everything fails to prevent UI hang
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
    getShiftAssignments: async () => {
        const response = await fetch(`${API_BASE}/attendance/shift-assignments`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) return [];
        return response.json();
    },

    // 🔸 ID Card View - Manager/Admin
    getIDCards: async () => {
        const response = await fetch(`${API_BASE}/id-card/list`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    createIDCard: async (data) => {
        const response = await fetch(`${API_BASE}/id-card/create`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    reissueIDCard: async (data) => {
        const response = await fetch(`${API_BASE}/id-card/reissue`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
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

    // 🔸 Regularization - Management APIs
    getRegularizationStats: async () => {
        const response = await fetch(`${API_BASE}/attendance/regularization/stats`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) return { total: 0, pending: 0, approved: 0, rejected: 0 };
        return response.json();
    },
    getRegularizationRequests: async (status = 'PENDING') => {
        const response = await fetch(`${API_BASE}/attendance/regularization/pending?status=${status}`, {
            method: "GET",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    submitRegularization: async (data) => {
        const response = await fetch(`${API_BASE}/attendance/regularization/request`, {
            method: "POST",
            body: JSON.stringify(data),
            ...authHeader('employee')
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    approveRegularization: async (id) => {
        const response = await fetch(`${API_BASE}/attendance/regularization/${id}/approve`, {
            method: "POST",
            ...authHeader()
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    rejectRegularization: async (id, reason) => {
        const response = await fetch(`${API_BASE}/attendance/regularization/${id}/reject`, {
            method: "POST",
            body: JSON.stringify({ reason }),
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

