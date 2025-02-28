import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const token = ref(localStorage.getItem("token") || null);
    const isAuthenticated = ref(!!token.value);

    const login = async (email, password) => {
        try {
            const response = await axios.post("api/login", { email, password });
    
            user.value = response.data.user;
            token.value = response.data.token;
            isAuthenticated.value = true;
    
            localStorage.setItem("token", token.value);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
    
            console.log("Logged in successfully!");
    
            // Ensure the role is returned correctly
            return user.value?.role; // Access role safely
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            throw error;
        }
    };

    const register = async (name, email, password, passwordConfirmation) => {
        try {
            const response = await axios.post("api/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            user.value = response.data.user;
            token.value = response.data.token;
            isAuthenticated.value = true;

            localStorage.setItem("token", token.value);

            axios.defaults.headers.common["Authorization"] =
                `Bearer ${token.value}`;

            console.log("Registered successfully!");
        } catch (error) {
            console.error(
                "Registration failed:",
                error.response?.data || error.message,
            );
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("api/logout", null, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            user.value = null;
            token.value = null;
            isAuthenticated.value = false;

            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];

            console.log("Logged out successfully!");
        } catch (error) {
            console.error(
                "Logout failed:",
                error.response?.data || error.message,
            );
            throw error;
        }
    };
    const updateProfile = async (name, email, password) => {
        try {
            const response = await axios.put("/api/user/update", { name, email, password });
            user.value = response.data.user;
            console.log("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update failed:", error.response?.data || error.message);
            throw error;
        }
    };
    const fetchUser = async () => {
        try {
            if (!token.value) {
                throw new Error("No token found");
            }

            apiClient.defaults.headers.common["Authorization"] =
                `Bearer ${token.value}`;

            const response = await axios.get("api/user");
            user.value = response.data;
            isAuthenticated.value = true;
        } catch (error) {
            console.error(
                "Failed to fetch user:",
                error.response?.data || error.message,
            );
            user.value = null;
            isAuthenticated.value = false;
            localStorage.removeItem("token"); 
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        updateProfile,
        logout,
        fetchUser,
    };
});
