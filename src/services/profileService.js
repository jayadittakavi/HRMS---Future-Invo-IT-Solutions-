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
                profilePic: profileData.profilePic
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
            return data.success ? data.data : data;
        } catch (error) {
            console.error('API Error (updateProfile):', error);
            throw error;
        }
    }
};
