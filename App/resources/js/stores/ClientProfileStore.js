import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useClientProfileStore = defineStore('clientProfile', () => {
    // State
    const client = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    // Actions
    const fetchClientProfile = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axios.get('/api/client/profile');
            client.value = response.data.user;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch profile';
        } finally {
            isLoading.value = false;
        }
    };

    const updateClientProfile = async (profileData) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await axios.put('/api/client/profile', profileData);
            client.value = response.data.user;
            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to update profile';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // Getters
    const getClientProfile = () => client.value;

    return {
        client,
        isLoading,
        error,
        fetchClientProfile,
        updateClientProfile,
        getClientProfile,
    };
});