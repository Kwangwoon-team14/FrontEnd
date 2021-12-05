import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views"),
    children: [
      {
        name: "home",
        path: "home",
        component: () => import("../views/Detail/home.vue"),
      },
      {
        name: "reservation",
        path: "reservation",
        component: () => import("../views/Detail/reservation.vue"),
      },
      {
        name: "check",
        path: "check",
        component: () => import("../views/Detail/check.vue"),
      },
      {
        name: "personal",
        path: "personal",
        component: () => import("../views/Detail/personal.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  history: true,
  base: process.env.BASE_URL,
  routes,
});

export default router;
