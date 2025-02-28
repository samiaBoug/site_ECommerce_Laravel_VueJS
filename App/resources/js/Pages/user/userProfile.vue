<template>
    <div class="p-6 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold mb-4">User Profile</h1>
        
        <Card>
            <CardContent>
                <form @submit.prevent="updateUser">
                    <div class="mb-4">
                        <Label for="name">Name</Label>
                        <Input v-model="form.name" id="name" required />
                    </div>

                    <div class="mb-4">
                        <Label for="email">Email</Label>
                        <Input v-model="form.email" id="email" type="email" required />
                    </div>

                    <div class="mb-4">
                        <Label for="password">New Password (optional)</Label>
                        <Input v-model="form.password" id="password" type="password" />
                    </div>

                    <Button type="submit">Update Profile</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const authStore = useAuthStore();
const form = ref({
    name: "",
    email: "",
    password: "",
});

onMounted(() => {
    if (authStore.user) {
        form.value.name = authStore.user.name;
        form.value.email = authStore.user.email;
    }
});

const updateUser = async () => {
    try {
        await authStore.updateProfile(form.value.name, form.value.email, form.value.password);
        alert("Profile updated successfully!");
    } catch (error) {
        alert("Failed to update profile.");
    }
};
</script>
