import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/admin/Home.vue"; // Le layout principal
import Products from "./Pages/admin/Product.vue";
import Users from "./Pages/admin/Users.vue"; // Import the Users component

const routes = [
    {
        path: "/",
        component: Home, // Layout principal
        redirect: "/products", // Redirection vers Produits par défaut
        children: [
            { path: "products", component: Products },
            { path: "users", component: Users },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
