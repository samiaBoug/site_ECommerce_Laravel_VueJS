import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/admin/Home.vue";
import Products from "./Pages/admin/Product.vue";
import Order from "./Pages/admin/Order.vue";
import Users from "./Pages/admin/Users.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./Pages/public/HomeRoute.vue"),
    },
    {
        path: "/dashboard",
        component: Home,
        redirect: "/dashboard/products",
        children: [
            { path: "products", component: Products },
            { path: "users", component: Users },
            { path: "orders", component: Order },
        ],
    },
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("./Pages/user/userProfile.vue"),
    },
    {
        path: "/regiser",
        name: "register",
        component: () => import("./Pages/auth/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./Pages/auth/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
