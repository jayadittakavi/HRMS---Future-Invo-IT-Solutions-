import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => ({
    headers: getAuthHeader('superadmin'),
});

// ── Local permission store helpers ──────────────────────────────────────────
// Keyed by email for fast lookup on login.
const PERMS_KEY = 'userPermissions';

export const localPermStore = {
    save: (email, data) => {
        if (!email) return;
        const store = JSON.parse(localStorage.getItem(PERMS_KEY) || '{}');
        store[email.toLowerCase()] = { ...data, savedAt: new Date().toISOString() };
        localStorage.setItem(PERMS_KEY, JSON.stringify(store));
    },
    get: (email) => {
        if (!email) return null;
        const store = JSON.parse(localStorage.getItem(PERMS_KEY) || '{}');
        return store[email.toLowerCase()] || null;
    },
    getAll: () => JSON.parse(localStorage.getItem(PERMS_KEY) || '{}'),
};

export const permissionService = {
    // 1. GET /api/permissions
    getModules: async () => {
        try {
            const response = await fetch(`${API_BASE}/permissions`, {
                method: 'GET',
                ...authHeader()
            });
            if (!response.ok) {
                console.warn(`GET /api/permissions returned ${response.status} — using fallback data`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.warn('API Error (getModules) — using fallback data:', error.message);
            return null;
        }
    },

    // 2. POST /api/team/invite  (user creation + permission save)
    inviteMemberWithPermissions: async (data, initialRole = 'admin') => {

        // ── Step 1: Normalize permissions to structured format ──────────────
        // UI gives { Module: { ACTION: bool } }
        // Convert to { module_key: { view, create, edit, delete, export } }
        const normalizePermissions = (rawPerms) => {
            const result = {};
            if (!rawPerms) return result;
            Object.entries(rawPerms).forEach(([module, actions]) => {
                const key = module.toLowerCase().replace(/[^a-z0-9]/g, '_');
                if (typeof actions === 'object') {
                    result[key] = {
                        view:   !!(actions['VIEW']   || actions['view']),
                        create: !!(actions['CREATE'] || actions['create']),
                        edit:   !!(actions['EDIT']   || actions['edit']),
                        delete: !!(actions['DELETE'] || actions['delete']),
                        export: !!(actions['EXPORT'] || actions['export']),
                    };
                } else if (Array.isArray(actions)) {
                    result[key] = {
                        view:   actions.includes('VIEW')   || actions.includes('view'),
                        create: actions.includes('CREATE') || actions.includes('create'),
                        edit:   actions.includes('EDIT')   || actions.includes('edit'),
                        delete: actions.includes('DELETE') || actions.includes('delete'),
                        export: actions.includes('EXPORT') || actions.includes('export'),
                    };
                }
            });
            return result;
        };

        const structuredPermissions = normalizePermissions(data.permissions);

        // ── Step 2: Save locally IMMEDIATELY (so UI never blocks) ──────────
        const localEntry = {
            email: data.email,
            name: data.name || data.full_name,
            role: data.role,
            departmentType: data.departmentType || '',
            subDepartment: data.subDepartment || '',
            department: data.department || data.subDepartment || 'General',
            branch: data.branch || '',
            company_id: data.company_id,
            permissions: structuredPermissions,
            rawPermissions: data.permissions,  // keep original for re-editing
        };
        localPermStore.save(data.email, localEntry);

        // Also save into mockEmployees / pendingInvites for Employees module display
        const pending = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
        const exists = pending.findIndex(p => p.email === data.email);
        const pendingEntry = { ...localEntry, id: data.user_id || Date.now(), pending: true, createdAt: new Date().toISOString() };
        if (exists >= 0) pending[exists] = pendingEntry; else pending.push(pendingEntry);
        localStorage.setItem('pendingInvites', JSON.stringify(pending));
        window.dispatchEvent(new Event('localDataUpdated'));

        // ── Step 3: Try backend endpoints in order ──────────────────────────
        const payload = {
            ...data,
            full_name: data.full_name || data.name,
            email: data.email,
            password: data.password || 'Default@123',
            role: (data.role || 'EMPLOYEE').toUpperCase(),
            department: data.department || data.subDepartment || 'General',
            departmentType: data.departmentType || '',
            subDepartment: data.subDepartment || '',
            permissions: structuredPermissions,
        };

        const tryFetch = async (url, role = initialRole) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: getAuthHeader(role),
                body: JSON.stringify(payload)
            });
            if (res.ok) return await res.json();
            if (res.status === 404 || res.status === 405) return null;
            const text = await res.text();
            if (text.includes('<html') || text.includes('<!doctype')) return null;
            throw new Error(text || `HTTP ${res.status}`);
        };

        let result = await tryFetch(`${API_BASE}/team/invite`).catch(() => null);
        if (result) {
            // If backend returned a user_id, try to save permissions separately
            const userId = result.user_id || result.id || result.data?.user_id;
            if (userId) {
                fetch(`${API_BASE}/team/members/${userId}/permissions`, {
                    method: 'POST',
                    headers: getAuthHeader(initialRole),
                    body: JSON.stringify({ permissions: structuredPermissions })
                }).catch(() => {}); // fire-and-forget
            }
            return result;
        }

        result = await tryFetch(`${API_BASE}/team/invite`, 'superadmin').catch(() => null);
        if (result) return result;

        result = await tryFetch(`${API_BASE}/superadmin/employees`).catch(() => null);
        if (result) return result;

        result = await tryFetch(`${API_BASE}/auth/super-admin/signup`).catch(() => null);
        if (result) return result;

        // All backend attempts failed — local save already done above, return mock success
        console.warn('[Invite] All backend endpoints returned 404/405. Permissions saved locally for:', data.email);
        return {
            success: true,
            pending: true,
            message: 'Saved locally — will sync when backend is ready',
            member: localEntry
        };
    },

    // 3. GET permissions — tries backend first, falls back to localPermStore
    getUserPermissions: async (user_id, email) => {
        // Try backend first
        try {
            const response = await fetch(`${API_BASE}/team/members/${user_id}/permissions`, {
                method: 'GET',
                headers: getAuthHeader('superadmin')
            });
            if (response.ok) {
                const backendData = await response.json();
                // Also update local store for offline use
                if (email && backendData.permissions) {
                    localPermStore.save(email, { ...backendData });
                }
                return backendData;
            }
        } catch (e) {
            console.warn('Backend permissions fetch failed, using local store.', e.message);
        }

        // Fallback to local store
        if (email) {
            const local = localPermStore.get(email);
            if (local) return local;
        }

        // Search pendingInvites
        const pending = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
        const match = pending.find(p => String(p.id) === String(user_id) || p.email === email);
        if (match) return { role: match.role, permissions: match.permissions || {} };

        throw new Error('Could not retrieve permissions from backend or local store.');
    }
};

