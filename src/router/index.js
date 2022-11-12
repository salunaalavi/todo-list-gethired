import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Dashboard.vue"),
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: () => import("../views/ItemList.vue"),
        },
    ],
});

export default router