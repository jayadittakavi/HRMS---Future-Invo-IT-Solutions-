import { API_BASE, getAuthHeader } from '../../../../config';

const authHeader = () => {
    return {
        headers: getAuthHeader('superadmin'),
    };
};

export const permissionService = {
    // 1. GET /api/superadmin/permissions/modules
    getModules: async () => {
        try {
            const response = await fetch(`${API_BASE}/superadmin/permissions/modules`, {
                method: "GET",
                ...authHeader()
            });
            if (!response.ok) throw new Error("Failed to fetch permissions modules");
            return await response.json();
        } catch (error) {
            console.error("API Error (getModules):", error);
            throw error;
        }
    },

    // 2. POST /api/superadmin/invite-member-with-permissions
    inviteMemberWithPermissions: async (data, initialRole = 'admin') => {
        const endpoints = [
            `${API_BASE}/admin/access-control/invite`,
            `${API_BASE}/admin/access-control/assign-role`,
            `${API_BASE}/admin/invite-member-with-permissions`,
            `${API_BASE}/superadmin/invite-member-with-permissions`,
            `${API_BASE}/superadmin/users/assign-role`,
            `${API_BASE}/superadmin/users/invite`
        ];

        // Roles to try in order
        const rolesToTry = [initialRole];
        if (initialRole !== 'superadmin') rolesToTry.push('superadmin');

        let lastError = null;
        let priorityError = null;
        
        for (const role of rolesToTry) {
            for (const url of endpoints) {
                try {
                    console.log(`Trying invite at: ${url} with role: ${role}`);
                    const response = await fetch(url, {
                        method: "POST",
                        headers: getAuthHeader(role),
                        body: JSON.stringify(data)
                    });
                    
                    if (response.ok) {
                        return await response.json();
                    }
                    
                    const text = await response.text();
                    let errorData = { message: text };
                    try { errorData = JSON.parse(text); } catch(e) {}
                    
                    const errorInstance = new Error(errorData.message || text || `Status ${response.status} for ${url}`);
                    
                    // Track 403 as a priority error to report back if all fail
                    if (response.status === 403 || response.status === 401) {
                        priorityError = errorInstance;
                        // If it's 403 with current role, try next role or next URL
                        continue; 
                    }
                    
                    lastError = errorInstance;
                    
                    if (response.status === 404 || response.status === 405) {
                        continue;
                    }
                    
                    if (response.status === 400) {
                        throw errorInstance;
                    }
                } catch (error) {
                    lastError = error;
                    if (error.message.includes('404') || error.message.includes('405') || error.message.includes('Failed to fetch')) {
                        continue;
                    }
                }
            }
        }
        
        // If all POST endpoints failed and we have a user_id, try a direct PUT update (common for existing members)
        if (data.user_id) {
            try {
                const putUrl = `${API_BASE}/admin/access-control/users/${data.user_id}`;
                console.log(`Fallback: Trying direct PUT to: ${putUrl}`);
                const putRes = await fetch(putUrl, {
                    method: "PUT",
                    headers: getAuthHeader('superadmin'),
                    body: JSON.stringify(data)
                });
                if (putRes.ok) return await putRes.json();
            } catch (err) {
                console.warn("Fallback PUT failed:", err);
            }
        }
        
        const finalError = priorityError || lastError || new Error("Failed to invite or update member permissions after trying all available endpoints");
        console.error("API Error (inviteMemberWithPermissions):", finalError);
        throw finalError;
    },

    // 3. GET /api/access-control/user-permissions/<user_id>
    getUserPermissions: async (user_id) => {
        const endpoints = [
            `${API_BASE}/admin/access-control/users/${user_id}`,
            `${API_BASE}/superadmin/user-permissions/${user_id}`,
            `${API_BASE}/admin/user-permissions/${user_id}`,
            `${API_BASE}/management/permissions/users/${user_id}`
        ];

        let lastError = null;
        
        for (const url of endpoints) {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: getAuthHeader('superadmin')
                });
                
                if (response.ok) {
                    return await response.json();
                }
                
                if (response.status === 404 || response.status === 405) {
                    continue; // Path issues, try next one
                }
                
                const text = await response.text();
                throw new Error(`Status ${response.status}: ${text || "Failed to fetch"}`);
            } catch (error) {
                lastError = error;
                continue;
            }
        }
        
        console.error("API Error (getUserPermissions):", lastError);
        throw lastError || new Error("Failed to load user's existing permissions from any known endpoint");
    }
};
