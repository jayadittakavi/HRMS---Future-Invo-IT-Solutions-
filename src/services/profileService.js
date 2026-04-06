import { API_BASE, getAuthHeader } from '../config';

export const profileService = {
    getMyProfile: async () => {
        try {
            const response = await fetch(`${API_BASE}/me/profile`, {
                headers: getAuthHeader()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile: ' + response.statusText);
            }
            const data = await response.json();
            return data.success ? data.data : data;
        } catch (error) {
            console.error('API Error (getMyProfile):', error);
            throw error;
        }
    },

    updateProfile: async (profileData) => {
        try {
            // Enhanced payload with fallback field names to prevent backend 500 errors
            const enhancedPayload = {
                name: profileData.name,
                full_name: profileData.name, // Fallback for name
                phone: profileData.phone,
                phone_number: profileData.phone, // Fallback for phone
                address: profileData.address,
                address_location: profileData.address, // Fallback for address
                bio: profileData.bio,
                about_bio: profileData.bio, // Fallback for bio
                profile_picture: profileData.profilePic,
                profilePic: profileData.profilePic,
                emergency_contact: profileData.emergency_contact,
                reason: profileData.reason
            };

            const response = await fetch(`${API_BASE}/me/profile`, {
                method: 'PATCH',
                headers: getAuthHeader(),
                body: JSON.stringify(enhancedPayload)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile: ' + response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error (updateProfile):', error);
            throw error;
        }
    },

    // 2. Approval Dashboard APIs
    getProfileChangesRequests: async () => {
        try {
            const response = await fetch(`${API_BASE}/approvals/profile-changes`, {
                method: 'GET',
                headers: getAuthHeader()
            });
            if (!response.ok) throw new Error('Failed to fetch profile correction requests');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error (getProfileChangesRequests):', error);
            throw error;
        }
    },

    approveProfileChange: async (reqId) => {
        try {
            const response = await fetch(`${API_BASE}/approvals/profile-changes/${reqId}/approve`, {
                method: 'POST',
                headers: getAuthHeader()
            });
            if (!response.ok) throw new Error('Failed to approve profile correction request');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error (approveProfileChange):', error);
            throw error;
        }
    },

    rejectProfileChange: async (reqId) => {
        try {
            const response = await fetch(`${API_BASE}/approvals/profile-changes/${reqId}/reject`, {
                method: 'POST',
                headers: getAuthHeader()
            });
            if (!response.ok) throw new Error('Failed to reject profile correction request');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error (rejectProfileChange):', error);
            throw error;
        }
    }
};
