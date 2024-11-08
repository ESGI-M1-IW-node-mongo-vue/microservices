import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PlatView from "@/views/PlatView.vue";
import Livraison from "@/views/Livraison.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/livraison",
            name: "livraison",
            component: Livraison,
        },
        {
            path: "/plats",
            name: "plats",
            component: PlatView,
        },
        {
            path: "/client",
            name: "client",
            component: () => import("@/views/ClientView.vue")
        }
    ],
});

export default router;
