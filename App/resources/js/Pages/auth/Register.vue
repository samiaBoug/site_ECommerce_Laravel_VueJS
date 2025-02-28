<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore/auth";

import NavBar from "@/components/ui/NavBar/NavBar.vue";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleRegister = async () => {
  try {
    await authStore.register(name.value, email.value, password.value, passwordConfirmation.value);
    alert('Registered successfully!');
    router.push('/home');
  } catch (error) {
    alert('Registration failed. Please try again.');
  }
};
</script>

<template>
    <div class="h-full bg-slate-100">
        <NavBar />
        <Card class="mx-auto max-w-md shadow-md  mt-10">
            <CardHeader>
                <CardTitle class="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleRegister" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="name" placeholder="Your Name" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" v-model="password" type="password" placeholder="********" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password_confirmation">
                            Confirm Password
                        </Label>
                        <Input id="password_confirmation" v-model="passwordConfirmation" type="password"
                            placeholder="********" required />
                    </div>
                    <Button type="submit" class="w-full"> Register </Button>
                </form>
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <a href="#" class="underline">Sign in</a>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
