import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/customize",
    name: "Customize",
    component: () =>
      import(/* webpackChunkName: "customize" */ "../views/Customize.vue")
  },
  {
    path: "/why",
    name: "Why",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Why.vue")
  },
  { path: '/:pathMatch(.*)', redirect: '/home' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
