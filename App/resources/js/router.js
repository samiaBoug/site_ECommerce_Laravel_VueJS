import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/admin/Home.vue"; // Le layout principal
import Products from "./Pages/admin/Product.vue";
import Users from "./Pages/admin/Users.vue"; // Import the Users component


const routes = [
    {
        path: "/",
        component: Home, 
        redirect: "/products",
        children: [
            { path: "products", component: Products },


        ]
    },
    {
        path : "/user/profile", name: "user.profile", component : ()=> import("./Pages/user/userProfile.vue")

            { path: "users", component: Users },
        ],

    },
    
    {
        path : "/regiser", name: "register", component : ()=> import("./Pages/auth/Register.vue")
    },
    {
        path : "/login", name: "login", component : ()=> import("./Pages/auth/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
