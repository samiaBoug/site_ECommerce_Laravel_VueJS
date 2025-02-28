<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Importation des composants UI et icônes
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Home,
    Package,
    Users,
    ShoppingCart,
    CircleUser,
    PanelLeft,
} from "lucide-vue-next";

const isSidebarOpen = ref(false);

</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        

        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="hidden sm:flex w-64 flex-col border-r p-4">
                <nav class="space-y-4">
                    <router-link
                        to="/admin/products"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Package class="h-5 w-5" /> Produits
                    </router-link>
                    <router-link
                        to="/admin/users"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Users class="h-5 w-5" /> Utilisateurs
                    </router-link>
                    <router-link
                        to="/admin/orders"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <ShoppingCart class="h-5 w-5" /> Commandes
                    </router-link>
                </nav>
            </aside>

            <!-- Contenu principal -->
            <main class="flex-1 p-4">
                <router-view />
            </main>
        </div>
    </div>
</template>
