import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EditScenario from "@/components/EditScenario.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "EditScenario",
    component: EditScenario,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
