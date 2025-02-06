import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/Home.vue"; // Le layout principal
import Products from "./Pages/Product.vue";

const routes = [
    {
        path: "/",
        component: Home, // Layout principal
        redirect: "/products", // Redirection vers Produits par défaut
        children: [
            { path: "products", component: Products },
           
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
