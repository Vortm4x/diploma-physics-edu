import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EditScenario from "@/components/EditScenario.vue";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import GroupsBrowser from "@/components/GroupsBrowser.vue";
import Group from "@/components/Group.vue";
import ScenariosBrowser from "@/components/ScenariosBrowser.vue";
import SharedScenarioResults from "@/components/SharedScenarioResults.vue";
import SolveScenario from "@/components/SolveScenario.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Register,
  },
  {
    path: "/EditScenario:id",
    name: "EditScenario",
    component: EditScenario,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/groups",
    name: "groups",
    component: GroupsBrowser,
  },
  {
    path: "/group:groupName",
    name: "group",
    component: Group,
    props: true,
  },
  {
    path: "/scenarios",
    name: "scenarios",
    component: ScenariosBrowser,
  },
  {
    path: "/sharedScenarioResults:id",
    name: "sharedScenarioResults",
    component: SharedScenarioResults,
  },
  {
    path: "/solveScenario:id",
    name: "solveScenario",
    component: SolveScenario,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
