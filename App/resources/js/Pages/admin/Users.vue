<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "../../stores/UserStore"; // Assume you have a store for users import
import { useForm, Field, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle,File  } from "lucide-vue-next"; // Icon components

const users = useUsersStore();

const formSchema = toTypedSchema(
    z.object({
        name: z.string().min(2).max(50, "Le nom d'utilisateur doit contenir entre 2 et 50 caractères"),
        email: z.string().email("L'email doit être valide"),
        role: z.string().min(2).max(30, "Le rôle doit être valide"),
    })
);

const { handleSubmit, reset } = useForm({ validationSchema: formSchema });
const isDialogOpen = ref(false);

// Nouveaux états pour le dialogue de modification et de suppression
const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const userToEdit = ref(null);
const userToDelete = ref(null);

onMounted(async () => {
    await users.fetchUsers();
});

const onSubmit = async (values) => {
    try {
        await users.addUser(values);
        // Close the dialog after successfully adding the user
        isDialogOpen.value = false;
        // Reset the form after submission
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
};

const editUser = (user) => {
    userToEdit.value = { ...user }; // création d'une copie
    isEditDialogOpen.value = true;
};

const onUpdateSubmit = async (values) => {
    try {
        await users.updateUser(userToEdit.value.id, values);
        isEditDialogOpen.value = false;
        await users.fetchUsers();
    } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur:", error);
    }
};

const confirmDelete = (user) => {
    userToDelete.value = user;
    isDeleteDialogOpen.value = true;
};

const deleteUser = async (userId) => {
    try {
        await users.deleteUser(userId);
        await users.fetchUsers();
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
};

const deleteConfirmed = async () => {
    await deleteUser(userToDelete.value.id);
    isDeleteDialogOpen.value = false;
};
</script>


<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Utilisateurs</CardTitle>
                        <div class="flex items-center">
                            <div class="ml-auto flex items-center gap-2">
                                <Button size="sm" variant="outline" class="h-7 gap-1">
                                    <File class="h-3.5 w-3.5" />
                                    <span class="sr-only sm:not-sr-only">Exporter</span>
                                </Button>
                                <Dialog v-model:open="isDialogOpen">
                                    <DialogTrigger as-child>
                                        <Button size="sm" class="h-7 gap-1">
                                            <PlusCircle class="h-3.5 w-3.5" />
                                            <span class="sr-only sm:not-sr-only">Ajouter un utilisateur</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ajouter un utilisateur</DialogTitle>
                                            <DialogDescription>Remplissez les détails de l'utilisateur.</DialogDescription>
                                        </DialogHeader>
                                        <Form @submit="onSubmit" class="space-y-2">
                                            <Field name="name" v-slot="{ field, meta }">
                                                <FormLabel for="name">Nom d'utilisateur</FormLabel>
                                                <Input v-bind="field" type="text" placeholder="Nom d'utilisateur" id="name" />
                                                <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                                            </Field>
                                            <Field name="email" v-slot="{ field, meta }">
                                                <FormLabel>Email</FormLabel>
                                                <Input v-bind="field" type="email" placeholder="Email de l'utilisateur" />
                                                <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                                            </Field>
                                            <Field name="password" v-slot="{ field, meta }">
                                                <FormLabel>Mot de passe</FormLabel>
                                                <Input v-bind="field" type="password" placeholder="Mot de passe de l'utilisateur" />
                                                <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                                            </Field>
                                            <Field name="role" v-slot="{ field, meta }">
                                                <FormLabel for="role">Rôle :</FormLabel>
                                                <select v-bind="field" id="role" class="border rounded p-2 w-full">
                                                    <option value="" disabled selected>Selectionner un rôle</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="client">Client</option>
                                                </select>
                                                <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                                            </Field>
                                            <Button type="submit" class="mt-4">Ajouter</Button>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rôle</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="user in users.data" :key="user.id">
                                <TableCell>{{ user.name }}</TableCell>
                                <TableCell>{{ user.email }}</TableCell>
                                <TableCell>{{ user.role }}</TableCell>
                                <TableCell class="flex gap-2">
                                    <Button
                                        variant="outline"
                                        @click="editUser(user)"
                                        class="bg-gray-500 hover:bg-gray-600 text-white border border-gray-600 rounded px-4 py-2 transition duration-200"
                                    >
                                        Modifier
                                    </Button>
                                    <Button variant="outline" @click="confirmDelete(user)" class="bg-red-500 hover:bg-red-600 text-white">
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </main>
        </div>
        <!-- Dialogue de modification -->
        <Dialog v-model:open="isEditDialogOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier un utilisateur</DialogTitle>
                    <DialogDescription>Modifiez les informations du utilisateur.</DialogDescription>
                </DialogHeader>
                <!-- Utilisation d'un formulaire pour la modification -->
                <Form @submit="onUpdateSubmit" :initial-values="userToEdit" class="space-y-2">
                    <Field name="name" v-slot="{ field, meta }">
                        <FormLabel for="edit-name">Nom d'utilisateur</FormLabel>
                        <Input v-bind="field" type="text" v-model="userToEdit.name" id="edit-name" />
                        <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                    </Field>
                    <Field name="email" v-slot="{ field, meta }">
                        <FormLabel>Email</FormLabel>
                        <Input v-bind="field" type="email" v-model="userToEdit.email" />
                        <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                    </Field>
                    <Field name="role" v-slot="{ field, meta }">
                        <FormLabel for="role">Rôle :</FormLabel>
                        <select v-bind="field" id="role" class="border rounded p-2 w-full">
                            <option value="" disabled selected>Selectionner un rôle</option>
                            <option value="admin">Admin</option>
                            <option value="client">Client</option>
                        </select>
                        <span v-if="meta.touched && meta.error" class="text-red-500">{{ meta.error }}</span>
                    </Field>
                    <Button type="submit" class="mt-4">Modifier</Button>
                </Form>
            </DialogContent>
        </Dialog>

        <!-- Dialogue de confirmation pour suppression -->
        <Dialog v-model:open="isDeleteDialogOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                    </DialogDescription>
                </DialogHeader>
                <div class="flex justify-end gap-2 mt-4">
                    <Button variant="outline" @click="isDeleteDialogOpen = false">Annuler</Button>
                    <Button variant="destructive" @click="deleteConfirmed">Supprimer</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>
