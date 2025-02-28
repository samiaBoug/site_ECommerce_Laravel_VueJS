import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUsersStore = defineStore("users", () => {
    const data = ref([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/users");
            data.value = response.data.users;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async (user) => {
        try {
            const response = await axios.post("/users", user);
            data.value.push(response.data);
            await fetchUsers(); 
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`);
            data.value = data.value.filter((user) => user.id !== userId); 
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

  const updateProfile = async (name, email, password) => {
    try {
        const response = await axios.put("api/user/update", { name, email, password });
        user.value = response.data.user;
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Profile update failed:", error.response?.data || error.message);
        throw error;
    }
};

    return { data, fetchUsers, addUser, deleteUser, updateUser };
});
