import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import(/* webpackChunkName: "about" */ "../views/Create"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "about" */ "../views"),
    children: [
      {
        name: "home",
        path: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Detail/home.vue"),
      },
      {
        name: "reservation",
        path: "reservation",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Detail/reservation.vue"
          ),
      },
      {
        name: "check",
        path: "check",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Detail/check.vue"),
      },
      {
        name: "personal",
        path: "personal",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Detail/personal.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
