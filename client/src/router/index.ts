import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EditScenario from "@/components/EditScenario.vue";
import Register from "@/components/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "EditScenario",
    component: EditScenario,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
