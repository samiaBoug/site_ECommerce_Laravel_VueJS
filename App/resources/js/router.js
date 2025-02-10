import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/admin/Layout.vue"; // Le layout principal
import Products from "./Pages/admin/Product.vue";
import Users from "./Pages/admin/Users.vue";

const routes = [
    {
        path: "/admin",
        component: Home,
        redirect: "/admin/products",
        children: [
            { path: "products", component: Products },
            { path: "users", component: Users }, 
        ]
    },
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("./Pages/user/userProfile.vue")
    },
    {
        path: "/register", // Correction de la faute de frappe
        name: "register",
        component: () => import("./Pages/auth/Register.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./Pages/auth/Login.vue")
    },
    {
        path: "/",
        name: "home",
        component: () => import("./Pages/public/HomeRoute.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
