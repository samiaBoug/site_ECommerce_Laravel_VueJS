import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./Pages/HomeRoute.vue"),
    },
   {
    path: '/products',
    component: ()=>import('./Pages/Product.vue')
   }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
