<template>
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Header -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle class="text-2xl">My Profile</CardTitle>
            <CardDescription>Manage your profile information.</CardDescription>
          </CardHeader>
        </Card>
  
        <!-- Profile Information -->
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="isLoading" class="text-center">Loading...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else class="space-y-4">
              <div>
                <Label for="name">Name</Label>
                <p class="text-gray-900">{{ client.name }}</p>
              </div>
              <div>
                <Label for="email">Email</Label>
                <!-- <p class="text-gray-900">{{ client.email }}</p> -->
              </div>
              <div>
                <Label for="phone">Phone</Label>
                <!-- <p class="text-gray-900">{{ client.phone || 'Not provided' }}</p> -->
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="openEditModal">Edit Profile</Button>
          </CardFooter>
        </Card>
      </div>
  
      <!-- Edit Profile Modal -->
      <Dialog v-model:open="isEditModalOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information.</DialogDescription>
          </DialogHeader>
          <form @submit.prevent="saveProfile">
            <div class="space-y-4">
              <div>
                <Label for="name">Name</Label>
                <Input id="name" v-model="editForm.name" />
              </div>
              <div>
                <Label for="email">Email</Label>
                <Input id="email" v-model="editForm.email" type="email" />
              </div>
              <div>
                <Label for="phone">Phone</Label>
                <Input id="phone" v-model="editForm.phone" />
              </div>
            </div>
            <DialogFooter class="mt-6">
              <Button type="button" variant="outline" @click="closeEditModal">Cancel</Button>
              <Button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Saving...' : 'Save' }}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useClientProfileStore } from '@/stores/ClientProfileStore';
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from '@/components/ui/dialog';
  
  // Pinia Store
  const clientProfileStore = useClientProfileStore();
  const { client, isLoading, error, fetchClientProfile, updateClientProfile } = clientProfileStore;
  console.log(client.name);
  // Edit modal state
  const isEditModalOpen = ref(false);
  
  // Edit form data
  const editForm = ref({
    name: '',
    email: '',
    phone: '',
  });
  
  // Open edit modal
  const openEditModal = () => {
    editForm.value = { ...client };
    isEditModalOpen.value = true;
  };
  
  // Close edit modal
  const closeEditModal = () => {
    isEditModalOpen.value = false;
  };
  
  // Save profile changes
  const saveProfile = async () => {
    try {
      await updateClientProfile(editForm.value);
      closeEditModal();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };
  
  // Fetch client profile on component mount
  onMounted(() => {
    fetchClientProfile();
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>